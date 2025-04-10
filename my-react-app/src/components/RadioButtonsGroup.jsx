/** SRC from https://codesandbox.io/embed/4hp6wr?module=/src/Demo.tsx&fontsize=12 */

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({ question, options, value, onChange }) {
  
  return (
    <FormControl className="flex flex-col justify-center w-full">
      <FormLabel id="demo-radio-buttons-group-label">{question}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          className="flex flex-col items-start"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option, index) => (
            <FormControlLabel
            key={index}
            value={option.value || option} // Handle both object and string options
            control={<Radio />}
            label={option.label || option} // Handle both object and string options
            className="mb-2"
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
}