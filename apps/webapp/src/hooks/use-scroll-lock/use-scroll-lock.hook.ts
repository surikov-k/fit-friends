import { useEffect, useState } from 'react';

export function useScrollLock() {
  const bodyStyle = document.body.style;

  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    bodyStyle.overflowY = isLocked ? 'hidden' : 'auto';
  }, [isLocked, bodyStyle]);

  return setIsLocked;
}

export function useEsc(close: () => void) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (evt: KeyboardEvent) => {
      if (evt.code === 'Escape') {
        setIsOpen(false);
        close();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close, isOpen]);

  return setIsOpen;
}
