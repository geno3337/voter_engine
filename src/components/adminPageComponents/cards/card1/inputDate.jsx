import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const DateInput = ({ control, name, label, helperText }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            label={label}
            value={field.value}
            onChange={(value) => field.onChange(value)}
            renderInput={(params) => (
              <TextField {...params} helperText={helperText} />
            )}
            required
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateInput;