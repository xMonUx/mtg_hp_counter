import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function CustomSelect({ id, value, onChange }) {
  let options = [];

  if (id === 1) {
    options = [
      "COMMANDER",
      "STANDARD",
      "MODERN",
      "ALCHEMY",
      "BOOSTER DRAFT",
      "PIONEER",
      "SEALED DECK",
      "EXPLORER"
    ];
  } else if (id >= 2 && id <= 6) {
    options = Array.from({ length: 5 }, (_, index) => `${index + 1}`);
  }

  const labelText = id === 1 ? 'Format' : `Players`;

  return (
    <FormControl sx={{ minWidth: 320 }} size="small">
      <InputLabel id={`demo-select-${id}-label`}>{labelText}</InputLabel>
      <Select
        labelId={`demo-select-${id}-label`}
        id={`demo-select-${id}`}
        value={value}
        label={`Type ${id}`}
        onChange={onChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
