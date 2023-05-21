import { useState } from 'react';

import { ModalContext } from './modal-context';
import { useEsc, useScrollLock } from '../../hooks';

type ModalProviderProps = {
  children: JSX.Element[] | JSX.Element;
};

export function ModalProvider({ children }: ModalProviderProps) {
  const [opened, setOpened] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element | null>(null);

  const listenEscDown = useEsc(close);

  const lockScroll = useScrollLock();

  const open = (content: JSX.Element) => {
    listenEscDown(true);
    setOpened(true);
    setContent(content);
    lockScroll(true);
  };

  function close() {
    listenEscDown(false);
    setOpened(false);
    lockScroll(false);
  }

  return (
    <ModalContext.Provider value={{ open, close }}>
      <>
        {children}
        {opened && content}
      </>
    </ModalContext.Provider>
  );
}
