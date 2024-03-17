import { useSDK } from '@metamask/sdk-react';
import { METAMASK_METHODS, NETWORKS } from '../(constants)/constants';
import { convertNumberToHexadecimal } from '../(utils)/utils';
import { useState } from 'react';

export interface MetamaskError {
  code: number;
  message: string;
  stack: string;
}

export const useWallet = () => {
  const { connected, account, balance, chainId, provider } = useSDK();
  const [usersError, setUsersError] = useState('');
  const [txhash, setTxhash] = useState('');

  const clearError = () => {
    setTimeout(() => setUsersError(''), 3000);
  };

  const changeNetwork = async (hexChainId: string) => {
    setUsersError('');
    try {
      await provider?.request({
        method: METAMASK_METHODS.SWITCH_CHAIN,
        params: [{ chainId: hexChainId }],
      });
    } catch (err) {
      const error = err as MetamaskError;
      console.error(err);
      setUsersError('Not change network! Try again!');
      clearError();
      if (error.code === 4902) {
        try {
          const id = (+hexChainId).toString(10);
          await provider?.request({
            method: METAMASK_METHODS.SWITCH_CHAIN,
            params: [
              {
                chainId: hexChainId,
                chainName: NETWORKS[id].name,
                nativeCurrency: NETWORKS[id].currency,
                blockExplorerUrls: NETWORKS[id].rpcURL,
                rpcUrls: [NETWORKS[id].blockExplorerURL],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
          setUsersError('Not change network! Try again!');
          clearError();
        }
      }
    }
  };

  const getGasPrice = () => {
    return provider
      ?.request({
        method: METAMASK_METHODS.ETH_GAS_PRICE,
        params: [],
      })
      .catch(() => {
        return 10000000000;
      });
  };

  const sendTransaction = async (value: number, to: string) => {
    setUsersError('');
    const currentValue = convertNumberToHexadecimal(value);
    try {
      const gasPrice = await getGasPrice();
      const response = await provider?.request({
        method: METAMASK_METHODS.ETH_SEND_TRANSACTION,
        params: [
          {
            from: account,
            to,
            value: currentValue,
            gas: '0x5208',
            gasPrice,
          },
        ],
      });
      if (response) {
        setTxhash(response as string);
      }
      console.debug(`response`, response);
    } catch (err) {
      setUsersError('Something went wrong while sending transaction!');
      clearError();
    }
  };
  return {
    connected,
    account,
    balance,
    chainId,
    error: usersError,
    changeNetwork,
    getGasPrice,
    sendTransaction,
    txhash,
  };
};
