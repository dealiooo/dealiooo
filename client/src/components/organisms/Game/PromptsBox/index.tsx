import React from 'react';
import styled from 'styled-components';

import { PromptsInfo, EventMessage } from '../../../../types/dealiooo';
import { Input } from '../../../atoms';
import { Flex } from '../../../layouts';
import { CardColorsMap, rem, space } from '../../../../styles';

type Props = {
  promptsInfo: PromptsInfo;
  onOptionClick;
  promptsHeight?: number;
};

const PromptInput = styled(Input).attrs(({ optionIndex, ...props }) => ({
  'data-option-index': optionIndex,
  ...props,
}))`
  cursor: pointer;
  border: none;
  width: auto;
  min-width: ${rem('200px')};
`;

const PromptsContainer = styled(Flex)`
  height: ${({ promptsHeight }) => promptsHeight}px;
  padding: ${space.small};

  > ${PromptInput} {
    margin: ${space.small};
  }
`;

const PromptsBox = ({ promptsInfo, onOptionClick, promptsHeight }: Props) => {
  const { promptMessage, options } = promptsInfo;

  console.log(promptsInfo);

  const pickingColor = promptMessage === EventMessage['picking a color'];

  return (
    <PromptsContainer column={options.length <= 3} justifyCenter alignCenter flexWrap promptsHeight={promptsHeight}>
      {options.map((option, i) => (
        <PromptInput
          key={option}
          name="prompt-option"
          type="button"
          onClick={onOptionClick}
          value={option}
          optionIndex={i}
          style={{ backgroundColor: pickingColor && CardColorsMap[option] }}
        />
      ))}
    </PromptsContainer>
  );
};

export default PromptsBox;
