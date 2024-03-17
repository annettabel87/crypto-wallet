'use client';
import { FormEvent, useState } from 'react';
import { useWallet } from './(hooks)/useWallet';
import { convertNumberToDecimal, getCurrencySymbol } from './(utils)/utils';
import TransactionForm from './(components)/TransactionForm/TransactionForm';
import ButtonsBlock from './(components)/ButtonsBlock/ButtonsBlock';
import { Alert } from '@mui/material';
import s from './page.module.css';

export interface MetamaskError {
  code: number;
  message: string;
  stack: string;
}

export default function Home() {
  const [sendingSum, setSendingSum] = useState<number>(0);
  const [recipientAddress, setRecipientAddress] = useState('');
  const { changeNetwork, chainId, account, sendTransaction, balance, error, txhash } =
    useWallet();

  const clearForm = () => {
    setSendingSum(0);
    setRecipientAddress('');
  };

  const sendHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendTransaction(sendingSum, recipientAddress);
    clearForm();
  };

  return (
    <div className={s.home}>
      <div className={s.container}>
        {!account || !chainId ? (
          <p>Connect to Metamask</p>
        ) : (
          <div className={s.card}>
            <ButtonsBlock chainId={chainId} changeNetwork={changeNetwork} />
            <TransactionForm
              sendHandler={sendHandler}
              symbol={getCurrencySymbol(chainId)}
              sendingSum={sendingSum}
              setSendingSum={setSendingSum}
              recipientAddress={recipientAddress}
              setRecipientAddress={setRecipientAddress}
            />
            <p className={s.error}>{error}</p>
            <div className={s.info}>
              <p className={s.text}>
                <span className={s.labelText}>Address: </span> {account}
              </p>
              <p className={s.text}>
                <span className={s.labelText}>Balance: </span>
                {balance ? convertNumberToDecimal(+balance) : 0}{' '}
                <span>{getCurrencySymbol(chainId)}</span>
              </p>
              {txhash && (
                <Alert variant="outlined" severity="success">
                  <p className={s.text}>Hash: {txhash}</p>{' '}
                </Alert>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
