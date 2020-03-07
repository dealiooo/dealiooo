import { useState, useLayoutEffect } from 'react';
import { debounce } from 'lodash';

function useWindowSize(delay = 400) {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    const updateSize = debounce(() => setSize([window.innerWidth, window.innerHeight]), delay);
    window.addEventListener('resize', updateSize);

    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, [delay]);

  return size;
}

export default useWindowSize;
