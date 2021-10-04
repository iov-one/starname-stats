import React from "react";

export const onInputChangeWrapper =
  (
    setValue: (_: string) => void,
  ): ((event: React.ChangeEvent<HTMLInputElement>) => void) =>
  (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setValue(value);
  };
