import React from 'react';

import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { LinkStyle } from '../../BaseStyles';

import LinkStyles from '../../css/Link.module.css';

const Link = styled(RouterLink)`
  ${LinkStyle}
`;

type LinkProps = {
  className?: string;
  to: string;
  children: React.ReactNode;
  onClick?;
  disabled?;
  newTab?: boolean;
  underlineOnHover?: boolean;
};

export default ({
  className,
  to,
  children,
  disabled,
  onClick,
  newTab = false,
  underlineOnHover = false,
}: LinkProps) => {
  return (
    <Link
      className={className + `${underlineOnHover ? ` ${LinkStyles.underline}` : ''}`}
      to={to}
      disabled={disabled}
      onClick={onClick}
      target={newTab ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};
