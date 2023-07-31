import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/system';

export default function SelectSmall({ value, onChange }) {
  return (
    <FormControl sx={{ minWidth: 320 }} size="small">
      <InputLabel id="demo-select-small-label">Type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={value}
        label="Type"
        onChange={onChange}
      >
        <MenuItem value="COMMANDER">COMMANDER</MenuItem>
        <MenuItem value="STANDARD">STANDARD</MenuItem>
        <MenuItem value="MODERN">MODERN</MenuItem>
        <MenuItem value="ALCHEMY">ALCHEMY</MenuItem>
        <MenuItem value="BOOSTER DRAFT">BOOSTER DRAFT</MenuItem>
        <MenuItem value="PIONEER">PIONEER</MenuItem>
        <MenuItem value="SEALED DECK">SEALED DECK</MenuItem>
        <MenuItem value="EXPLORER">EXPLORER</MenuItem>
      </Select>
    </FormControl>
  );
}
