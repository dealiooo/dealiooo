import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const AbsoluteCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type CenterProps = {
  relativeToParent?: boolean;
  children: React.ReactNode;
};

const Center = ({ relativeToParent, children, ...props }: CenterProps) => {
  if (relativeToParent) {
    return (
      <Wrapper>
        <AbsoluteCenter {...props}>{children}</AbsoluteCenter>
      </Wrapper>
    );
  }
  return <AbsoluteCenter {...props}>{children}</AbsoluteCenter>;
};

export default Center;
