/** https://mui.com/material-ui/react-slider/?srsltid=AfmBOorSI4KZcYzVqHilUH9sg6QegYuNVrWeYpV-uwnkBLnkcHcSWgPi#system-SliderSizes.js */

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 100,
    label: '100',
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSliderMarks() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        aria-label="Custom marks"
        defaultValue={50}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        marks={marks}
      />
    </Box>
  );
}