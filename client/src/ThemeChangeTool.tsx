import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Sun as SunIcon } from 'styled-icons/feather/Sun';
import { Moon as MoonIcon } from 'styled-icons/feather/Moon';

import { space, borderRadius, ThemeColor } from './styles';
import { IconButton } from './components/molecules';
import { setThemeColor, selectThemeColor } from './store/Settings';

const ThemeChanger = styled.div`
  position: absolute;
  top: calc(100% - 80px);
  left: ${space.large};
  z-index: 1;
  padding: ${space.medium};
  border-radius: ${borderRadius.round};
  background-color: ${({ theme }) => theme.background};
`;

// Tool to easily change the app theme while debugging
const ThemeChangeTool = () => {
  const dispatch = useDispatch();
  const themeColor = useSelector(selectThemeColor);
  const handleThemeColorClick = event =>
    dispatch(setThemeColor(themeColor === ThemeColor.LIGHT ? ThemeColor.DARK : ThemeColor.LIGHT));

  return (
    <ThemeChanger>
      <IconButton onClick={handleThemeColorClick}>
        {themeColor === ThemeColor.LIGHT ? (
          <SunIcon size={25} color="orange" />
        ) : (
          <MoonIcon size={25} color="mediumpurple" />
        )}
      </IconButton>
    </ThemeChanger>
  );
};

export default ThemeChangeTool;
