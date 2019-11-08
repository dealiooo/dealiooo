import styled from 'styled-components';

export const FlexRowCenter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: ${({ fullHeight }) => (fullHeight ? '100%' : 'auto')};
`;

export const FlexColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

type FlexProps = {
  column?: boolean;
  wrap?: boolean;
  justifyCenter?: boolean;
  justifyAround?: boolean;
  justifyBetween?: boolean;
  justifyEvenly?: boolean;
  justifyEnd?: boolean;
  alignStretch?: boolean;
  alignEnd?: boolean;
  alignCenter?: boolean;
  alignBaseline?: boolean;
  contentStart?: boolean;
  contentEnd?: boolean;
  contentCenter?: boolean;
  contentBetween?: boolean;
  contentAround?: boolean;
};

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${props => {
    if (props.column) return 'column';
    return 'row';
  }};
  flex-wrap: ${props => {
    if (props.wrap) return 'wrap';
    return 'nowrap';
  }};
  justify-content: ${props => {
    if (props.justifyCenter) return 'center';
    else if (props.justifyAround) return 'space-around';
    else if (props.justifyBetween) return 'space-between';
    else if (props.justifyEvenly) return 'space-evenly';
    else if (props.justifyEnd) return 'flex-end';
    return 'flex-start';
  }};
  align-items: ${props => {
    if (props.alignStretch) return 'stretch';
    else if (props.alignEnd) return 'flex-end';
    else if (props.alignCenter) return 'center';
    else if (props.alignBaseline) return 'baseline';
    return 'flex-start';
  }};
  align-content: ${props => {
    if (props.contentStart) return 'flex-start';
    else if (props.contentEnd) return 'flex-end';
    else if (props.contentCenter) return 'center';
    else if (props.contentBetween) return 'space-between';
    else if (props.contentAround) return 'contentAround';
    return 'stretch';
  }};
`;
