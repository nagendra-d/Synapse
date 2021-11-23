import React from 'react';

export type GlobalActivityIndicatorState = {
  isLoading: boolean;
  content: string;
};

export type GlobalActivityIndicatorProps = GlobalActivityIndicatorState & {
  showActivityIndicator(content: string): void;
  hideActivityIndicator(): void;
};

const { Consumer, Provider } = React.createContext<
  Partial<GlobalActivityIndicatorProps>
>({
  isLoading: false,
  content: '',
});

export { Consumer, Provider };
