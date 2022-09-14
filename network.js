export default {
  id: 'phoenix-1',
  name: 'Terra',
  description: 'Terra 2.0 provides a new phoenix rises from the ashes.',
  logo: `banner-terra.png`,
  website: 'https://www.terra.money',
  apiURL: 'https://lcd.terrav2.ccvalidators.com/',
  rpcURL: 'https://rpc.terrav2.ccvalidators.com',
  explorerURL: 'https://finder.terra.money',
  txsExplorerURL: 'https://finder.terra.money',
  exchangeApiUrl: 'https://finder.terra.money',
  osmosAppUrl: 'https://app.osmosis.zone',
  // minBlockHeight: 5200792, // actually 5200791, but it has the wrong block time.
  stakingDenom: 'LUNA',
  coinLookup: [
    {
      viewDenom: 'LUNA',
      chainDenom: 'uluna',
      chainToViewConversionFactor: 1e-6,
      icon: `luna.png`,
    },
  ],
  addressPrefix: 'terra',
  validatorAddressPrefix: 'terravaloper',
  validatorConsensusaddressPrefix: 'terravalcons', // needed to map validators from staking queries to the validator set
  HDPath: `m/44'/118'/0'/0/0`,
  lockUpPeriod: `21 days`,
  fees: {
    default: {
      gasEstimate: 250000,
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
