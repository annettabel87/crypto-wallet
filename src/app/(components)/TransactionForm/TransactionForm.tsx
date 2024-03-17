import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import s from './TransactionForm.module.css';

interface ITransactionForm {
  sendHandler: (e: FormEvent<HTMLFormElement>) => void;
  symbol: string;
  sendingSum: number;
  setSendingSum: Dispatch<SetStateAction<number>>;
  recipientAddress: string;
  setRecipientAddress: Dispatch<SetStateAction<string>>;
}

const TransactionForm = ({
  sendHandler,
  symbol,
  sendingSum,
  setSendingSum,
  recipientAddress,
  setRecipientAddress,
}: ITransactionForm) => {
  return (
    <form onSubmit={(e) => sendHandler(e)} className={s.form}>
      <div className={s.inputsBlock}>
        <FormControl sx={{ m: 1, flex: '1' }} variant="filled">
          <FormHelperText style={{ color: '#fff' }}>Amount</FormHelperText>
          <OutlinedInput
            style={{ backgroundColor: '#31353F', color: '#fff' }}
            color="primary"
            type="number"
            value={sendingSum}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setSendingSum(+event.target.value);
            }}
            endAdornment={
              <InputAdornment position="end" style={{ color: '#fff' }}>
                <span>{symbol}</span>
              </InputAdornment>
            }
            aria-describedby="outlined-balance-helper-text"
            inputProps={{
              'aria-label': 'balance',
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, flex: '1' }} variant="filled">
          <FormHelperText style={{ color: '#fff' }}>To</FormHelperText>
          <OutlinedInput
            required
            style={{ backgroundColor: '#31353F', color: '#fff' }}
            color="primary"
            value={recipientAddress}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setRecipientAddress(event.target.value);
            }}
            aria-describedby="outlined-address-helper-text"
            inputProps={{
              'aria-label': 'address',
            }}
          />
        </FormControl>
      </div>
      <Button
        variant="contained"
        type="submit"
        size="medium"
        style={{ padding: '10px 40px' }}
      >
        Send
      </Button>
    </form>
  );
};

export default TransactionForm;
