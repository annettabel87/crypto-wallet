import React from 'react';
import { Button } from '@mui/material';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { NETWORKS } from '@/app/(constants)/constants';
import s from './ButtonsBlock.module.css';

interface IButtonsBlock {
  chainId: string;
  changeNetwork: (hexChainId: string) => Promise<void>;
}

const ButtonsBlock = ({ chainId, changeNetwork }: IButtonsBlock) => {
  return (
    <div className={s.btnsBlock}>
      {Object.keys(NETWORKS).map((item) => {
        const data = NETWORKS[item];
        return (
          <Button
            key={item}
            variant={chainId === data.chainID ? 'outlined' : 'contained'}
            startIcon={<CurrencyBitcoinIcon />}
            onClick={() => changeNetwork(data.chainID)}
          >
            {data.currency.symbol}
          </Button>
        );
      })}
    </div>
  );
};

export default ButtonsBlock;
