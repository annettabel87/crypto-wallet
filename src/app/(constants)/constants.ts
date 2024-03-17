export const NETWORKS: NetworksType = {
  1: {
    chainID: '0x1',
    name: 'Ethereum',
    chain: 'ethereum',
    rpcURL: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    currency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    testnetID: 5,
    blockExplorerURL: 'https://etherscan.io',
  },
  56: {
    chainID: '0x38',
    name: 'BNB Chain',
    chain: 'BNB Chain',
    rpcURL: ['https://bsc-dataseed.binance.org'],
    currency: {
      name: 'BNB Chain',
      symbol: 'BNB',
      decimals: 18,
    },
    testnetID: 97,
    blockExplorerURL: 'https://bscscan.com/',
  },
};

export const METAMASK_METHODS = {
  ETH_SEND_TRANSACTION: 'eth_sendTransaction',
  SWITCH_CHAIN: 'wallet_switchEthereumChain',
  ETH_GAS_PRICE: 'eth_gasPrice',
};

interface INetwork {
  chainID: string;
  name: string;
  chain: string;
  rpcURL: string[];
  currency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  testnetID?: number;
  blockExplorerURL: string;
}

type NetworksType = {
  [key: string]: INetwork;
};
