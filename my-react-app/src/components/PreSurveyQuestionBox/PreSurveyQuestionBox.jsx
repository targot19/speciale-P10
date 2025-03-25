import React, { useState } from 'react';

function PreSurveyQuestionBox() {
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
};

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