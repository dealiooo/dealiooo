import { useEffect } from 'react';

/**
 * Hook that alerts a component a click occurred outside of the passed ref
 *
 * Example Usage:
 * const outsideRef = useRef(null);
 * useOutsideClickListener(outsideRef, handleOutsideClick);
 * return <div ref={outsideRef}>{children}</div>;
 *
 */
function useOutsideClick(ref, onOutsideClick) {
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

export default useOutsideClick;
