/** SRC from https://codesandbox.io/embed/4hp6wr?module=/src/Demo.tsx&fontsize=12 */

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({ question, options }) {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{question}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        {options.map((option, index) => (
          <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}