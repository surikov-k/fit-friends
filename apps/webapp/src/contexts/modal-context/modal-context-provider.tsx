import { useState } from 'react';

import { ModalContext } from './modal-context';
import { useScrollLock } from '../../hooks';

type ModalProviderProps = {
  children: JSX.Element[];
};

export function ModalProvider({ children }: ModalProviderProps) {
  const [opened, setOpened] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element | null>(null);

  const lockScroll = useScrollLock();

  const open = (content: JSX.Element) => {
    setOpened(true);
    setContent(content);
    lockScroll(true);
  };

  const close = () => {
    setOpened(false);
    lockScroll(false);
  };

  return (
    <ModalContext.Provider value={{ open, close }}>
      <>
        {children}
        {opened && content}
      </>
    </ModalContext.Provider>
  );
}
