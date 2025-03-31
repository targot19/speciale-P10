import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const ConditionQuestionBox = ({ question, options }) => {
  return (
    <FormControl>
      <FormLabel className="text-xl font-bold mb-4">{question}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="condition-question-label"
        name="condition-question"
        className="flex flex-col items-center"
      >
        {options.map((option, index) => (
          <div key={index} className="flex flex-col items-center mx-2">
            <FormControlLabel
              value={option.value}
              control={<Radio />}
              label=""
              className="mb-2"
            />
            <span className="text-sm">{option.label}</span>
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default ConditionQuestionBox;