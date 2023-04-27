import { useEffect, useState } from 'react';

export function useScrollLock() {
  const bodyStyle = document.body.style;

  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    bodyStyle.overflowY = isLocked ? 'hidden' : 'auto';
  }, [isLocked, bodyStyle]);

  // const lockScroll = (value: boolean) => setIsLocked(value)

  return setIsLocked;
}
