import { useState, useCallback } from 'react';

export function useHover() {
  const [state, setState] = useState({ hover: false, pressed: false });

  const bind = {
    onMouseEnter: useCallback(() => setState(s => ({ ...s, hover: true })), []),
    onMouseLeave: useCallback(() => setState({ hover: false, pressed: false }), []),
    onMouseDown:  useCallback(() => setState({ hover: true, pressed: true }), []),
    onMouseUp:    useCallback(() => setState(s => ({ ...s, pressed: false })), []),
  };

  return { hover: state.hover, pressed: state.pressed, bind };
}
