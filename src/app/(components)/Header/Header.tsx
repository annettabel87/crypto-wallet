'use client';
import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import s from './Header.module.css';

interface IHeaderProps {
  account: string;
  connecting: boolean;
  connected: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  error: string;
}

const Header = ({
  account,
  connect,
  connecting,
  disconnect,
  connected,
  error,
}: IHeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={s.header}>
      <div className={s.container}>
        <div className={s.title}>Testnet</div>
        {error && <p className={s.error}>{error}</p>}
        {!account && (
          <Button variant="contained" onClick={connect}>
            Connect
          </Button>
        )}
        {connecting && (
          <Button variant="contained" disabled={connecting}>
            connecting...
          </Button>
        )}

        {connected && account && (
          <div>
            <Button variant="outlined" onClick={handleMenuClick}>
              {account.slice(0, 7)}...
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              slotProps={{
                paper: {
                  style: {
                    backgroundColor: '#4d5466',
                    color: '#fff',
                  },
                },
              }}
            >
              <MenuItem onClick={() => navigator.clipboard.writeText(account)}>
                {account}{' '}
                <IconButton aria-label="copy">
                  <ContentCopyRoundedIcon sx={{ color: 'white' }} />
                </IconButton>
              </MenuItem>
              <MenuItem onClick={disconnect}>Disconnect</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
