import React from "react";
import { FormHelperText, TextField, FormControl } from "@material-ui/core";

export default function Input(props) {
  const { name, label, value, error = null, onChange, type, ...rest } = props;
  return (
    <FormControl {...(error && { error: true })}>
      <TextField
        variant="filled"
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        {...rest}
      />
      <FormHelperText component={"div"}>{error}</FormHelperText>
    </FormControl>
  );
}
