export default {
  id: 'phoenix-1',
  name: 'Terra',
  description: 'Terra 2.0 provides a new phoenix rises from the ashes.',
  logo: `luna.png`,
  website: 'https://www.bitcanna.io',
  apiURL: 'https://phoenix-lcd.terra.dev', // https://lcd.bitcanna.io
  rpcURL: 'http://65.21.192.108:3061', // https://rpc.bitcanna.io
  explorerURL: 'https://cosmos-explorer.bitcanna.io',
  bitcannaExplorerURL: 'https://explorer.bitcanna.io',
  exchangeApiUrl: 'https://swap.bitcanna.io',
  osmosAppUrl: 'https://app.osmosis.zone',
  // minBlockHeight: 5200792, // actually 5200791, but it has the wrong block time.
  stakingDenom: 'LUNA',
  coinLookup: [
    {
      viewDenom: 'LUNA',
      chainDenom: 'uluna',
      chainToViewConversionFactor: 1e-6,
      icon: `currencies/luna.png`,
    },
  ],
  addressPrefix: 'terra',
  validatorAddressPrefix: 'terravaloper',
  validatorConsensusaddressPrefix: 'terravalcons', // needed to map validators from staking queries to the validator set
  HDPath: `m/44'/330'/0'/0/0`,
  lockUpPeriod: `21 days`,
  fees: {
    default: {
      gasEstimate: 800000,
      feeOptions: [
        {
          denom: 'LUNA',
          amount: 0.01,
        },
      ],
    },
  },
  icon: `https://lunie.fra1.digitaloceanspaces.com/network-icons/cosmos.png`,
  swapEnabled: false,
  localSigning: false, // this is only to be used as a developer tool - never deployed in production or for mainnet chains
}
