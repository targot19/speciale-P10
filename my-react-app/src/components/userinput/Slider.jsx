/** https://mui.com/material-ui/react-slider/?srsltid=AfmBOorSI4KZcYzVqHilUH9sg6QegYuNVrWeYpV-uwnkBLnkcHcSWgPi#system-SliderSizes.js */

import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FormLabel from "@mui/material/FormLabel";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 100,
    label: "100",
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSliderMarks({ onChange }) {
  const handleSliderChange = (event, value) => {
    if (onChange) {
      onChange(value); // Pass the slider value to the parent component
    }
  };

  return (
    <Box sx={{ width: 500 }}>
      <FormLabel className="mb-2">How confident are you in your answer?</FormLabel>
      <Slider
        aria-label="Custom marks"
        defaultValue={50}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        step={5}
        marks={true}
        min={0}
        max={100}
        onChangeCommitted={handleSliderChange} // Trigger when the slider value is set
      />
    </Box>
  );
}