import { useState, useCallback } from 'react';

function useToggle(initialState: boolean = false) {
  const [toggled, setToggled] = useState(initialState);
  const toggle = useCallback(() => setToggled(value => !value), []);

  return [toggled, toggle] as const; // use of `as const` for correct type inference
}

export default useToggle;
