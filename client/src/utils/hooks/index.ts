import { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { debounce } from 'lodash';

export function useToggle(initialState: boolean = false) {
  const [toggled, setToggled] = useState(initialState);
  const toggle = useCallback(() => setToggled(value => !value), []);

  return [toggled, toggle] as const; // use of `as const` for correct type inference
}

/**
 * Hook that alerts a component a click occurred outside of the passed ref
 *
 * Example Usage:
 * const outsideRef = useRef(null);
 * useOutsideClickListener(outsideRef, handleOutsideClick);
 * return <div ref={outsideRef}>{children}</div>;
 *
 */
export function useOutsideClick(ref, onOutsideClick) {
  const handleMouseDown = event => {
    if (ref.current && ref.current.contains(event.target)) {
      return;
    }

    onOutsideClick();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
}

export function useInputValue(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(function(event) {
    setValue(event.currentTarget.value);
  }, []);

  return {
    value,
    onChange,
  };
}

export function useWindowSize(delay = 400) {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = debounce(() => setSize([window.innerWidth, window.innerHeight]), delay);
    window.addEventListener('resize', updateSize);

    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
