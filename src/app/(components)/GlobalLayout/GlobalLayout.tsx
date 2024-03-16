'use client';
import React, { useState } from 'react';
import Header from '../Header/Header';
import { useSDK } from '@metamask/sdk-react';
import { ChildrenPropsType } from '@/app/(providers)/MetaMaskProviders';

const GlobalLayout = ({ children }: ChildrenPropsType) => {
  const [account, setAccount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { sdk, connected, connecting } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      setError('failed to connect..');
    }
  };

  const disconnect = async () => {
    try {
      if (sdk) {
        sdk.terminate();
        setAccount('');
      }
    } catch (err) {
      setError('failed to disconnect..');
    }
  };

  return (
    <>
      <Header
        account={account}
        connecting={connecting}
        connected={connected}
        connect={connect}
        disconnect={disconnect}
        error={error}
      />
      <main>{children}</main>
    </>
  );
};

export default GlobalLayout;
