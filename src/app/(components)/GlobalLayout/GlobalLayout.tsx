'use client';
import React, { useState } from 'react';
import Header from '../Header/Header';
import { useSDK } from '@metamask/sdk-react';
import { ChildrenPropsType } from '@/app/(providers)/MetaMaskProviders';
import s from './GlobalLayout.module.css';

const GlobalLayout = ({ children }: ChildrenPropsType) => {
  const [error, setError] = useState<string>('');
  const { sdk, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      setError('failed to connect..');
    }
  };

  const disconnect = async () => {
    try {
      if (sdk) {
        sdk.terminate();
      }
    } catch (err) {
      setError('failed to disconnect..');
    }
  };

  return (
    <div className={s.layout}>
      <Header
        account={account}
        connecting={connecting}
        connect={connect}
        disconnect={disconnect}
        error={error}
      />
      <main className={s.main}>{children}</main>
    </div>
  );
};

export default GlobalLayout;
