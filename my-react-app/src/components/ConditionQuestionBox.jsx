import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ConditionQuestionBox({ question, options, onChange }) {
  const handleOptionChange = (event) => {
    const selectedAnswer = event.target.value;
    onChange(selectedAnswer); // Pass the selected answer to the parent component
  };
  
  return (
    <FormControl className="flex flex-col items-center justify-center w-full">
      <FormLabel className="text-xl font-bold mb-2 text-center">{question}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="condition-question-label"
        name={question}
        className="flex flex-row items-center justify-center gap-10"
        onChange={handleOptionChange}
      >
        {options.map((option, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <Radio value={option.value || option} />
            <span className="text-sm text-center mt-1">{option.label}</span>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};