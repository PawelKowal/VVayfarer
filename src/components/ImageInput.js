import React from "react";
import { Input } from "@material-ui/core";

export default function ImageInput(props) {
  const { name, label, value, error = null, onChange } = props;
  return (
    <Input
      variant="filled"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type="file"
      accept="image/*"
      {...(error && { error: true })}
    />
  );
}
