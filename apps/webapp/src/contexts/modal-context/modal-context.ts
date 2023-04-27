import { createContext } from 'react';

type ModalContextType = {
  open: (content: JSX.Element) => void | null;
  close: () => void | null;
};

const modalContextDefault: ModalContextType = {
  open: () => null,
  close: () => null,
};

export const ModalContext = createContext(modalContextDefault);
