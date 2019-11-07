import React from 'react';

import { FormGroup, Label, Error } from './style';

type FormGroupProps = {
  children: React.ReactNode;
  label?: string;
  error?: string;
};

export default function({ label, error, children, ...props }: FormGroupProps) {
  return (
    <FormGroup {...props}>
      {label && <Label>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </FormGroup>
  );
}
