import styled from 'styled-components';

export const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  transition: opacity 0.3s;
  z-index: 2147483647;
`;

export const TooltipArrow = styled.div`
  position: absolute;
  width: 1rem;
  height: 1rem;
`;

export const TriggerWrapper = styled.span`
  height: 100%;
`;
