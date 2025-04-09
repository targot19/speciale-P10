/** https://mui.com/material-ui/react-slider/?srsltid=AfmBOorSI4KZcYzVqHilUH9sg6QegYuNVrWeYpV-uwnkBLnkcHcSWgPi#system-SliderSizes.js */

import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

export default function Sliders() {
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        //size="small"
        defaultValue={50}
        aria-label="Default"
        valueLabelDisplay="auto"
      />
    </Box>
  );
}