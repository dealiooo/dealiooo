import React from 'react';

import * as S from './style';

type FormGroupProps = {
  label?: string;
  error?: string;
};

const FormGroup: React.FC<FormGroupProps> = ({ label, error, children, ...props }) => {
  return (
    <S.FormGroup {...props}>
      {label && <S.Label>{label}</S.Label>}
      {children}
      {error && <S.Error>{error}</S.Error>}
    </S.FormGroup>
  );
};

export default FormGroup;
