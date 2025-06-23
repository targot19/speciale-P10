import json
import pandas as pd
import os
from datetime import datetime

# === CONFIGURATION ===

topics = ["Music", "Health", "Geography", "Physics"]

question_blocks = {
    "Music": range(1, 6),
    "Health": range(6, 11),
    "Geography": range(11, 16),
    "Physics": range(16, 21)
}

correct_answers = {
    1: "No", 2: "Yes", 3: "No", 4: "Yes", 5: "No",
    6: "No", 7: "No", 8: "No", 9: "Yes", 10: "Yes",
    11: "No", 12: "Yes", 13: "Yes", 14: "No", 15: "Yes",
    16: "Yes", 17: "No", 18: "Yes", 19: "No", 20: "No"
}

likert_map = {
    "Strongly disagree": 1,
    "Disagree": 2,
    "Neutral": 3,
    "Agree": 4,
    "Strongly agree": 5
}

gaais_pos_items = {
    "I am interested in using artificially intelligent systems in my daily life.": "Pos1",
    "Artificial Intelligence can have positive impacts on people’s wellbeing.": "Pos2",
    "Artificial Intelligence is exciting.": "Pos3",
    "Much of society will benefit from a future full of Artificial Intelligence.": "Pos4"
}

gaais_neg_items = {
    "I think artificially intelligent systems make many errors.": "Neg1",
    "I think Artificial Intelligence is dangerous.": "Neg2",
    "I shiver with discomfort when I think about future uses of Artificial Intelligence.": "Neg3",
    "People like me will suffer if Artificial Intelligence is used more and more.": "Neg4"
}

latin_squares = {
    "ABDC": 1,
    "BCAD": 2,
    "CDBA": 3,
    "DACB": 4
}

map_education = {
    "Primary and lower secondary education (Grundskole)": "Primary school",
    "Upper secondary / high school or vocational education (Gymnasiale og erhvervsfaglige uddannelser)": "High school/vocational",
    "Short-cycle higher education (Erhvervsakademi) - 1-2 years": "Short-cycle",
    "Medium-cycle higher education (Bachelor, professionsbachelor) - 3-3,5 years": "Medium-cycle",
    "Long-cycle higher education (Kandidat) - 5 years or more": "long-cycle",
    "PhD and research education": "PhD"
}

# === SCRIPT FUNCTION ===

def process_json_file_revised(file_path):
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    participant_id = data["sessionId"].replace(",", "").replace(" ", "_").replace(":", "-")
    condition_order = data["conditionOrder"]
    survey = data["surveyHistory"]
    condition_survey = data["conditionSurveyHistory"]
    qa_history = data["questionAnswerHistory"]
    chat_history = data.get("chatHistory", {})

    # Parse timestamps
    session_start = datetime.strptime(data["sessionId"], "%d/%m/%Y, %H:%M:%S")
    session_end = datetime.strptime(data["sessionEnd"], "%d/%m/%Y, %H:%M:%S")

    # Duration as timedelta
    duration = session_end - session_start

    # Format as HH:MM:SS
    duration_str = str(duration)

    # Determine Latin square
    latin_id = latin_squares.get("".join(condition_order), None)

    # GAAIS recoded
    gaais_scores = {}

    # Positive items are coded normally, negative items are reverse-coded
    # Pos: Strongly disagree = 1, strongly agree = 5
    # Neg: Strongly disagree = 5, strongly agree = 1
    for item, response in survey.items():
        if item in gaais_pos_items and response in likert_map:
            short_label = gaais_pos_items[item]
            gaais_scores[short_label] = likert_map[response]
        elif item in gaais_neg_items and response in likert_map:
            short_label = gaais_neg_items[item]
            gaais_scores[short_label] = 6 - likert_map[response]

    # Participant-level info
    participant_row = {
        "participant": participant_id,
        "session_duration": duration_str,
        "latin_square": latin_id,
        "age": survey.get("age"),
        "gender": survey.get("gender"),
        "education": map_education.get(survey.get("education")),
        "comfort": survey.get("comfort"),
        "ai_usage": survey.get("aiUsage"),
        **gaais_scores
    }

    # Task-level info
    task_rows = []
    for q_num in range(1, 21):
        q_info = qa_history.get(str(q_num), {})
        messages = chat_history.get(str(q_num), [])
        prompt_count = sum(1 for m in messages if m["role"] == "user")
        google_checked = int(q_info.get("googleChecked", False)) # No = 0, Yes = 1
        chat_wrong = int(q_info.get("chatShouldAnswerFalsely", False)) # Chat truthful = 0, Chat lying = 1
        google_wrong = int(q_info.get("googleShouldAnswerFalsely", False)) # Google truthful = 0, Google lying = 1

        answer, conf, source = None, None, None
        for k, v in q_info.items():
            if isinstance(v, dict) and "confidence" in v:
                answer = v.get("answer", "").strip().lower()
                conf = v.get("confidence")
                source = v.get("source")
                break
        
        # Participant's answer: Yes = 0, No = 1
        if answer == "yes":
            answer_code = 0
        elif answer == "no":
            answer_code = 1
        else:
            answer_code = None

        # Participant's answer: Correct = 0, Incorrect = 1
        correct = correct_answers.get(q_num)
        correct_code = 0 if correct == "Yes" else 1 if correct == "No" else None

        # Primary Source: Chatbot = 0, Google = 1, Prior knowledge = 2
        source_code = {"Chatbot": 0, "Google": 1, "Prior knowledge": 2}.get(source, None)

        task_rows.append({
            "participant": participant_id,
            "question_number": q_num,
            "prompt_count": prompt_count,
            "google_checked": google_checked,
            "chatbot_lying": chat_wrong,
            "google_lying": google_wrong,
            "answer_yesno": answer_code,
            "confidence": conf,
            "primary_source": source_code,
            "correct_answer": correct_code
        })

    # B = Benevolence, I = Integrity, C = Competetence
    question_rename_map = {
        "I believe that the chatbot would act in my best interest.": "B1",
        "If I required help, the chatbot would do its best to help me.": "B2",
        "The chatbot is interested in my well-being, not just completing tasks.": "B3",

        "The chatbot is truthful in its interactions with me.": "I1",
        "I would characterize the chatbot as honest.": "I2",
        "The chatbot would keep its commitments.": "I3",
        "The chatbot is sincere and genuine.": "I4",

        "The chatbot is competent and effective in providing information or assistance.": "C1",
        "The chatbot performs its role of assisting users very well.": "C2",
        "Overall, the chatbot is a capable and proficient digital assistant.": "C3",
        "In general, the chatbot is very knowledgeable.": "C4"
    }

    condition_rows = []
    for topic, condition_label in zip(topics, condition_order):
        trust_qas = condition_survey.get(topic, {})

        trust_answers = {
            question_rename_map.get(q, q): likert_map.get(a, None)
            for q, a in trust_qas.items()
        }

        condition_rows.append({
            "participant": participant_id,
            "condition": condition_label,
            "topic": topic,
            **trust_answers
        })

    return participant_row, task_rows, condition_rows

# === EXTENSION TO EXPORT TO CSV ===

# Folder where participant JSON files are stored
input_folder = r"C:\Users\tania\OneDrive\Skrivebord\Thesis_Experiments\JSON"  # ← Change this to your actual folder path
output_folder = r"C:\Users\tania\OneDrive\Skrivebord\Thesis_Experiments\Outputs"  # ← Change this to desired output folder

# Make sure output folder exists
os.makedirs(output_folder, exist_ok=True)

# Storage for aggregated data
all_participants = []
all_tasks = []
all_conditions = []

# Process each file
for filename in os.listdir(input_folder):
    if filename.endswith(".json"):
        file_path = os.path.join(input_folder, filename)
        try:
            participant_row, task_rows, condition_rows = process_json_file_revised(file_path)
            all_participants.append(participant_row)
            all_tasks.extend(task_rows)
            all_conditions.extend(condition_rows)
        except Exception as e:
            print(f"Error processing {filename}: {e}")

# Convert to DataFrames
df_participants = pd.DataFrame(all_participants)
df_tasks = pd.DataFrame(all_tasks)
df_conditions = pd.DataFrame(all_conditions)

# Export to CSV
df_participants.to_csv(os.path.join(output_folder, "participants.csv"), index=False, sep=";")
df_tasks.to_csv(os.path.join(output_folder, "tasks.csv"), index=False, sep=";")
df_conditions.to_csv(os.path.join(output_folder, "conditions.csv"), index=False, sep=";")

print("CSV export complete.")