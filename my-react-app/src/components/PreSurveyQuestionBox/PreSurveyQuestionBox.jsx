import React, { useState } from 'react';

function PreSurveyQuestionBox() {
    const [
        selectedValue,
        setSelectedValue,
    ] = useState(null);

    const handleRadioChange = (
        value
    ) => {
        setSelectedValue(value);
    };

const styles = {
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "left",
        flexDirection: "column",
        alignItems: "left",
    },
    heading: {
        color: "black",
        textAlign: "center",
    },
    radioGroup: {
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        justifyContent: "space-around",
        marginTop: "20px",
        borderRadius: "8px",
        backgroundColor: "white",
        padding: "30px",
        boxShadow: "0px 2px 3.84px rgba(0, 0, 0, 0.25)",
    },
    radioButton: {
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        cursor: "pointer",
        transition: "all 0.3s",
    },
    radioLabel: {
        marginLeft: "8px",
        fontSize: "17px",
        color: "333",
    },
    selected: {
        background: "#007BFF",
        color: "#fff",
        borderColor: "#007BFF",
    },
    list: {
        listStyleType: "none",
        padding: 0,
        textAlign: "left",
    },
};

/**
const RadioButton = ({
    label,
    selected,
    onSelect,
}) => (
    <li>
        <button
            style={{
                ...styles.radioButton,
                ...(selected ? styles.selected : {}),
            }}
            onClick={onSelect}
        >
            {label}
        </button>
    </li>
); */

return (
    <div>
        <h1 style={styles.heading}>
            Question here?
        </h1>

        <div
            style={styles.container}
        >
            <div
                style={styles.radioGroup}
            >
                <div
                    style={styles.radioButton}
                >
                    <input
                        type="radio"
                        id="option1"
                        value={selectedValue}
                        checked={
                            selectedValue ===
                            "Import later"
                        }
                        onChange={() =>
                            handleRadioChange(
                                "option1"
                            )
                        }
                    />
                    <input
                        type="radio"
                        id="option2"
                        value={selectedValue}
                        checked={
                            selectedValue ===
                            "See ya"
                        }
                        onChange={() =>
                            handleRadioChange(
                                "option2"
                            )
                        }
                    />
                    <input
                        type="radio"
                        id="option3"
                        value={selectedValue}
                        checked={
                            selectedValue ===
                            "Import later"
                        }
                        onChange={() =>
                            handleRadioChange(
                                "option3"
                            )
                        }
                    />
                    <input
                        type="radio"
                        id="option4"
                        value={selectedValue}
                        checked={
                            selectedValue ===
                            "Import later"
                        }
                        onChange={() =>
                            handleRadioChange(
                                "option4"
                            )
                        }
                    />
                    <input
                        type="radio"
                        id="option5"
                        value={selectedValue}
                        checked={
                            selectedValue ===
                            "Import later"
                        }
                        onChange={() =>
                            handleRadioChange(
                                "option5"
                            )
                        }
                    />
                    <label
                        htmlFor="option1"
                        style={styles.radioLabel}
                    >
                        option2
                    </label>
                </div>
            </div>
        </div>
    </div>
);}

export default PreSurveyQuestionBox;