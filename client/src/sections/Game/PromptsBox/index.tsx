import React from 'react';

import * as S from './style';
import { PromptsInfo, EventMessage } from '../../../types';
import { CardColorsMap } from '../utils';

type PromptsBoxProps = {
  promptsInfo: PromptsInfo;
  onOptionClick: (event) => void;
  promptsHeight: number;
};

const PromptsBox: React.FC<PromptsBoxProps> = ({ promptsInfo, onOptionClick, promptsHeight }) => {
  const { promptMessage, options } = promptsInfo;
  const pickingColor = promptMessage === EventMessage['picking a color'];

  return (
    <S.Container column={options.length <= 3} height={promptsHeight}>
      {options.map((option, index) => (
        <S.Option
          key={option}
          name="prompt-option"
          type="button"
          onClick={onOptionClick}
          value={option}
          optionIndex={index}
          color={pickingColor ? CardColorsMap[option] : undefined}
        />
      ))}
    </S.Container>
  );
};

export default PromptsBox;
