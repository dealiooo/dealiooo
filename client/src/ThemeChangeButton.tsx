import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sun as SunIcon } from 'styled-icons/feather/Sun';
import { Moon as MoonIcon } from 'styled-icons/feather/Moon';

import { ThemeColor } from './styles';
import { IconButton } from './components';
import { setThemeColor, selectThemeColor } from './store/Settings';
import { useTheme } from './utils';

const ThemeChangeButton = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const themeColor = useSelector(selectThemeColor);
  const changeTheme = setThemeColor(themeColor === ThemeColor.light ? ThemeColor.dark : ThemeColor.light);

  const handleThemeColorClick = event => {
    dispatch(changeTheme);
  };

  return (
    <IconButton onClick={handleThemeColorClick}>
      {themeColor === ThemeColor.light ? (
        <SunIcon size={20} color={theme.palette.orange} />
      ) : (
        <MoonIcon size={20} color={theme.palette.purple} />
      )}
    </IconButton>
  );
};

export default ThemeChangeButton;
