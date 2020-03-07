import React from 'react';
import { ArrowRight as ArrowRightIcon } from 'styled-icons/feather/ArrowRight';

import * as S from './style';
import { CenterInline, Menu } from '../../../components';
import ThemeChangeButton from '../../../ThemeChangeButton';

type SettingsMenuProps = {
  onForfeit: (event) => void;
};

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onForfeit }) => (
  <Menu>
    <ThemeChangeButton />
    <S.ForfeitButton onClick={onForfeit}>
      <CenterInline left>Forfeit</CenterInline>
      <ArrowRightIcon size={20} />
    </S.ForfeitButton>
  </Menu>
);

export default SettingsMenu;
