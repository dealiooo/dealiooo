import React from 'react';

import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { LinkStyle } from '../../BaseStyles';

const Link = styled(RouterLink)`
  ${LinkStyle}
`;

type LinkProps = {
  className?: string;
  to: string;
  children: React.ReactNode;
  onClick?;
  disabled?;
};

export default ({ className, to, children, disabled, onClick }: LinkProps) => {
  return (
    <Link className={className} to={to} disabled={disabled} onClick={onClick}>
      {children}
    </Link>
  );
};
