'use client';
import React, { useState } from 'react';
import { Button, IconButton, Snackbar } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import s from './Header.module.css';

interface IHeaderProps {
  account: string | undefined;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  error: string;
}

const Header = ({ account, connect, connecting, disconnect, error }: IHeaderProps) => {
  const [isShowSnackbar, setIsShowSnackbar] = useState(false);

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      setIsShowSnackbar(true);
      setTimeout(() => {
        setIsShowSnackbar(false);
      }, 1000);
    }
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.title}>Testnet</div>
        {error && <p className={s.error}>{error}</p>}
        {account && (
          <div className={s.primaryText}>
            {account.slice(0, 10)}
            {'... '}
            <IconButton aria-label="copy" onClick={copyAddress}>
              <ContentCopyRoundedIcon sx={{ color: '#3A6FF8' }} />
            </IconButton>
          </div>
        )}
        {!account ? (
          <Button variant="contained" onClick={connect} disabled={connecting}>
            {connecting ? 'connecting...' : 'Connect'}
          </Button>
        ) : (
          <Button variant="outlined" onClick={disconnect}>
            disconnect
          </Button>
        )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isShowSnackbar}
        message="Copied"
      />
    </header>
  );
};

export default Header;
