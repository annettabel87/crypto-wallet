'use client';
import { ReactNode } from 'react';
import { MetaMaskProvider } from '@metamask/sdk-react';

export type ChildrenPropsType = {
  children: ReactNode;
};

export const MetamaskProviders = ({ children }: ChildrenPropsType) => {
  return (
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: 'Metamask',
          url: window?.location.href,
        },
      }}
    >
      {children}
    </MetaMaskProvider>
  );
};
