import React from "react";
import { Input, Button } from "@material-ui/core";

export default function ImageInput(props) {
  const { name, label, error = null, onChange } = props;
  return (
    <Input
      variant="filled"
      label={label}
      name={name}
      onChange={onChange}
      type="file"
      accept="image/*"
      {...(error && { error: true })}
    >
      <Button>click</Button>
    </Input>
  );
}
