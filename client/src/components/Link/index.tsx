import React from 'react';
import styled from 'styled-components';

import * as S from './style';

type LinkProps = {
  element?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  className?: string;
  to: string;
  openInNewTab?: boolean;
  underline?: boolean;
};

const Link: React.FC<LinkProps> = ({ className, element, to, children, openInNewTab, underline }) => {
  const internal = /^\/(?!\/)/.test(to);
  const classes = className + ` ${underline ? 'underline' : ''}`;

  if (internal && !openInNewTab) {
    return (
      <S.Link className={classes} to={to} as={element}>
        {children}
      </S.Link>
    );
  }

  return (
    <S.Link
      as={element}
      className={classes}
      to={to}
      target={openInNewTab ? '_blank' : undefined}
      rel={openInNewTab ? 'noreferrer noopener' : undefined}
    >
      {children}
    </S.Link>
  );
};

Link.defaultProps = {
  openInNewTab: false,
  underline: undefined,
};

export default styled(Link)``;
