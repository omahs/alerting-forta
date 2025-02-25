import BigNumber from "bignumber.js";

// COMMON CONSTS

// 1 ETH
export const ETH_DECIMALS = new BigNumber(10).pow(18);

export const BLOCKS_PER_HOUR = (60 * 60) / 12;

// alert if more than 5 addresses delegated their tokens to non-whitelist address
export const UNIQ_DELEGATES_THRESHOLD_EOA = 5;

// alert if more than 10 addresses delegated their tokens to non-whitelist address
export const UNIQ_DELEGATES_THRESHOLD_CONTRACT = 10;

// ADDRESSES, EVENTS, ABIs

export const MONITORED_ERC20_ADDRESSES = new Map<string, string>([
  ["0x5a98fcbea516cf06857215779fd812ca3bef1b32", "LDO"],
  ["0xae7ab96520de3a18e5e111b5eaab095312d7fe84", "stETH"],
  ["0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0", "wstETH"],
  ["0x1982b2f5814301d4e9a8b0201555376e62f82428", "astETH"],
  ["0x0b925ed163218f6662a35e0f0371ac234f9e9371", "awstETH"],
  ["0x9ee91f9f426fa633d227f7a9b000e28b9dfd8599", "stMATIC"],
]);

const WHITE_LIST_ADDRESSES_RAW: string[] = [
  // owned by Lido
  "0xdc24316b9ae028f1497c275eb9192a3ea0f67022", // curvePool
  "0x32296969ef14eb0c6d29669c550d4a0449130230", // balancerPool
  "0xc1a900ae76db21dc5aa8e418ac0f4e888a4c7431", // oneInchPool
  "0xc5578194d457dcce3f272538d1ad52c68d1ce849", // sushiPool
  "0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0", // wstETH
  "0x828b154032950c8ff7cf8085d841723db2696056", // curveStEthWEthPool
  "0x0f25c1dc2a9922304f2eac71dca9b07e310e8e5a", // L2 Arbitrum Bridge
  "0x76943c0d61395d8f2edf9060e1533529cae05de6", // L2 Optimism Bridge
  "0x889edc2edab5f40e902b864ad4d7ade8e412f9b1", // unstETH
  // externally owned
  "0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9", // aaveLandingPoolV2
  "0x1111111254fb6c44bac0bed2854e76f90643097d", // oneInchV4Router
  "0x881d40237659c251811cec9c364ef91dc08d300c", // metamaskSwapRouter
  "0x216b4b4ba9f3e719726886d34a177484278bfcae", // paraSwapV5TokenTransferProxyMainnet
  "0x135896de8421be2ec868e0b811006171d9df802a", // paraSwapLiquiditySwapAdapter
  "0xd9e1ce17f2641f24ae83637ab66a2cca9c378b9f", // sushiSwapRouter
  "0xa2f987a546d4cd1c607ee8141276876c26b72bdf", // anchorVault
  "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45", // uniswapV3Router2
  "0xe592427a0aece92de3edee1f18e0157c05861564", // uniswapV3Router
  "0x7a250d5630b4cf539739df2c5dacb4c659f2488d", // uniswapV2Router2
  "0xc36442b4a4522e871399cd717abdd847ab11fe88", // uniswapV3PositionsNFT
  "0xdef1c0ded9bec7f1a1670819833240f027b25eff", // zeroXExchangeProxy
  "0xe66b31678d6c16e9ebf358268a790b763c133750", // zeroExProxy
  "0xba12222222228d8ba445958a75a0704d566bf2c8", // balancerVault
  "0x11111112542d85b3ef69ae05771c2dccff4faa26", // oneInchV3
  "0xc92e8bdf79f0507f65a392b0ab4667716bfe0110", // coWProtocolGPv2VaultRelayer
  "0x447ddd4960d9fdbf6af9a790560d0af76795cb08", // curveRETHtoWstETH
  "0x8e52522e6a77578904ddd7f528a22521dc4154f5", // zapperZap
  "0x6d9893fa101cd2b1f8d1a12de3189ff7b80fdc10", // zapperUniswap
  "0x3ee18b2214aff97000d974cf647e7c347e8fa585", // wormholeTokenBridge
  "0x53773e034d9784153471813dacaff53dbbb78e8c", // ribbonFinanceStETHCoveredCallVault
  "0xcb859ea579b28e02b87a1fde08d087ab9dbe5149", // dODOApproveV2
  "0x1f629794b34ffb3b29ff206be5478a52678b47ae", // mooniSwap
  "0x9a8fbc2548da808e6cbc853fee7e18fb06d52f18", // sensePeriphery
  "0xbfd291da8a403daaf7e5e9dc1ec0aceacd4848b9", // dForceWstETH
  "0x6f5cc3edea92ab52b75bad50bcf4c6daa781b87e", // OlympusV2ZapIn
  "0xfa9a30350048b2bf66865ee20363067c66f67e58", // curveRouter
  "0x8a42d311d282bfcaa5133b2de0a8bcdbecea3073", // tokenlonAllowanceTarget
  "0x062bf725dc4cdf947aa79ca2aaccd4f385b13b5c", // alchemixFinanceAlETHAlchemistV2
  "0x2faf487a4414fe77e2327f0bf4ae2a264a776ad2", // ftxExchange
  "0x69a592d2129415a4a1d1b1e309c17051b7f28d57", // setProtocolDebtIssuanceModuleV2
  "0xf9234cb08edb93c0d4a4d4c70cc3ffd070e78e07", // newUniswapV2ExchangeRouter
  "0x86ba3e96be68563e41c2f5769f1af9faf758e6e0", // senseDivider
  "0x439cac149b935ae1d726569800972e1669d17094", // idolNftMain
  "0x34dcd573c5de4672c8248cd12a99f875ca112ad8", // idleLidoStETHAABBPerpTranche
  "0xc383a3833a87009fd9597f8184979af5edfad019", // instaEthStrategy
  "0x5ce9b49b7a1be9f2c3dc2b2a5bacea56fa21fbee", // curveZapInGeneralV5
  "0x119c71d3bbac22029622cbaec24854d3d32d2828", // oneInchLimitOrdersProtocolV2
  "0x40ec5b33f54e0e8a33a975908c5ba1c14e5bbbdf", // polygonERC20Bridge
  "0x4ba30fa240047c17fc557b8628799068d4396790", // aPWineController
  "0xd152f549545093347a162dce210e7293f1452150", // disperseApp
  "0xabea9132b05a70803a4e85094fd0e1800777fbef", // zkSync
  "0x5d22045daceab03b158031ecb7d9d06fad24609b", // deversiFiBridge
  "0x0cac674ebd77bbd899f6079932768f6d59da089a", // someIdleFinanceContract
  "0xb5eb8cb6ced6b6f8e13bcd502fb489db4a726c7b", // oasisMultiply
  "0x32707372b88bef099dd2ae190804e519831eedf4", // gldmGenesisRewardPool
  "0xf8b8db73db0c3f4ff0d633836e939db23847ca1e", // curveRegistryExchange
  "0x81c46feca27b31f3adc2b91ee4be9717d1cd3dd7", // curveRegistryExchange2
  "0xcd9595a4da4a0268217845d7fc8f576b75596e70", // dSProxy175787
  "0xc319bcfd24e50fcf932c98b43bf7ab10460f7ab2", // dSProxy212804
  "0x414ff9b9aaf625593c9015ffed35e2cdbf310384", // dsProxy9774
  "0xb9d5132f9bc799b3af59016aebbac8e32099ba46", // dsProxy208421
  "0xc319bcfd24e50fcf932c98b43bf7ab10460f7ab2", // deFiSaverTEProxy
  "0x1bd435f3c054b6e901b7b108a0ab7617c808677b", // paraSwapP4
  "0x80aca0c645fedabaa20fd2bf0daf57885a309fe6", // paraSwapRepayAdapter
  "0x36c744dd2916e9e04173bee9d93d554f955a999d", // senseWstETHAdapter
  "0x27182842e098f60e3d576794a5bffb0777e025d3", // euler
  "0x78106f7db3ebcee3d2cfac647f0e4c9b06683b39", // dustSweeper
  "0x95e6f48254609a6ee006f7d493c8e5fb97094cef", // 0x: ERC20 Proxy
  "0x9d3a1c83cb5ad71fb66fc7d94f11fbe7eaa3054b", // DeFi saver automated proxy
  "0x6352a56caadc4f1e25cd6c75970fa768a3304e64", // OpenOcean: Exchange V2
  "0x3e66be3e817a283c7ee01f5057d99660e7a01974", // DSProxy #212,449
  "0x362fa9d0bca5d19f743db50738345ce2b40ec99f", // LiFiDiamond
  "0xd8ef3cace8b4907117a45b0b125c68560532f94d", // Set: Basic Issuance Module
  "0xa0a33f0cc7c655015ce50ff998b95eead0fa41ca", // DSProxy #212,569
  "0x77b1e5d58247bc3300a8e646b018fcebfee5a59c", // Integral: Delay
  "0xaa8adbdd94824e5c381ca4a262762945b353359f", // 1inch Liquidity Protocol (Ethereum) ETH/STETH
  "0x9DDb2da7Dd76612e0df237B89AF2CF4413733212", // BribeVault
  "0x1ef7a557cfa8436ee08790e3f2b190b8937fda0e", // HolyHeld: Central Transfer Proxy
  "0x248ccbf4864221fc0e840f29bb042ad5bfc89b5c", // Maker(wstETH-B)
  "0xfff11417a58781d3c72083cb45ef54d79cd02437", // sense-finance periphery
  "0xb188b1cb84fb0ba13cb9ee1292769f903a9fec59", // aurafinance RewardDepositWrapper
  "0x00000000009726632680fb29d3f7a9734e3010e2", // rainbow swap aggregator
  "0xbab1e772d70300422312dff12daddcb60864bd41", // pods-yield stETH vault
  "0x6fc4843aac4786b4420e954a2271be16f225a482", // sense.finance WstETHAdapter
  "0x617dee16b86534a5d792a4d7a62fb491b544111e", // kyber.network MetaAggregationRouter
  "0x83C8F28c26bF6aaca652Df1DbBE0e1b56F8baBa2", // GemSwap
  "0xe92b586627ccA7a83dC919cc7127196d70f55a06", // paraswap.io
  "0xaBC64889601F01e7B26277Ef8756250d6ABf8c18", // vesper.finance
  "0x03f7724180AA6b939894B5Ca4314783B0b36b329", // shibaswap.com
  "0xd3E6e3646a6397144CbD0741dc3EFba93D0332f4", // DSProxy #197,122
  "0x674bdf20a0f284d710bc40872100128e2d66bd3f", // loopring.org
  "0x0e3eb2eab0e524b69c79e24910f4318db46baa9c", // rango.exchange
  "0xc9f5296eb3ac266c94568d790b6e91eba7d76a11", // CEX.IO
  "0xc2c171bd6fc3b5885b589ed8b4d135f31085e973", // YearnPartnerPortalIn app.portals.fi
  "0x29fbd00940df70cfc5dad3f2370686991e2bbf5c", // bebop.xyz
  "0xb2be281e8b11b47fec825973fc8bb95332022a54", // Zerion: DeFi SDK v1.0
  "0xc7caff035261df3d55c8c1b023642511e69172cd", // DSProxy #216,409
  "0xbb443d6740322293fcee4414d03978c7e4bf5d55", // ERC4626Gate https://www.gate.io/blog_detail/920/What-is-ERC-4626
  "0x76f4eed9fe41262669d0250b2a97db79712ad855", // app.odos.xyz
  "0xa3a7b6f88361f48403514059f1f16c8e78d60eec", // Arbitrum One: L1 ERC20 Gateway
  "0x76943C0D61395d8F2edF9060e1533529cAe05dE6", // Optimism: L1 ERC20 Token Bridge
  "0xb8cf3ed326bb0e51454361fb37e9e8df6dc5c286", // Gearbox protocol wstETH pool
  "0x5a97e3e43dcbfe620ccf7865739075f92e93f5e4", // Gearbox protocol stEthPoolWrapper
  "0xa6f222a2ea6a1cfafa48ff0014ee4fe277580aa0", // Portals Dapp CurvePortalIn
  "0x33388CF69e032C6f60A420b37E44b1F5443d3333", // RubicProxy https://rubic.exchange/
  "0x921FE3dF4F2073f0d4d0B839B6068460397a04f9", // Bank-of-Chain ExchangeAggregator
  "0x9865eebdd1ce65f45b6247aeed2fa2252eca7a08", // Transit Finance: Swap Router
  "0xEf0D72C594b28252BF7Ea2bfbF098792430815b1", // Gearbox Curve steCRV WETH Gateway
  "0x55b916ce078ea594c10a874ba67ecc3d62e29822", // CurveFi related contract
  "0x271fbe8ab7f1fb262f81c77ea5303f03da9d3d6a", // CurveFi related contract
  "0x99c9fc46f92e8a1c0dec1b1747d010903e884be1", // Optimism: Gateway
  "0xf892fef9da200d9e84c9b0647ecff0f34633abe8", // Thorswap token proxy
  "0x04e69556415604b5f4e4ebea2b5c9800967bde7b", // DSProxy #192,931
  "0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae", // LiFiDiamond https://li.fi/
  "0x628ef4a1660505d4fa43b6bfee48565607a48fb2", // DSProxy #146,747
  "0X2B1C7B41F6A8F2B2BC45C3233A5D5FB3CD6DC9A8", // KyberSwap: Anti Snipping Attack Position Manager
  "0xe46e8996a7bfd82ca059ceccbf99df153c199e64", // DSProxy #216,046
  "0xcbc72d92b2dc8187414f6734718563898740c0bc", // PendleWstEthSY
  "0x4ec8f76d7fbb59015419c074f7f1e01087a76f01", // yCRVPortalIn
  "0x41FAD93F225b5C1C95f2445A5d7fcB85bA46713f", // PendleRouter
  "0xC1e7dFE73E1598E3910EF4C7845B68A9Ab6F4c83", // KyberSwap: Elastic Router
  "0x1111111254eeb25477b68fb85ed929f73a960582", // 1inch v5: Aggregation Router
  "0x7273d1671fcd37ef5b949ebf88234aa9c3e43957", // Harpie: Transferer
  "0xaa17633AA5A3Cb56698838561161bdb16Cebb8E3", // Sense: Periphery
  "0xCE5513474E077F5336cf1B33c1347FDD8D48aE8c", // Ribbon Finance: ETH Put-Selling Vault V2
  "0x99a58482bd75cbab83b27ec03ca68ff489b5788f", // Curve Registry Exchange Contract
  "0x6131b5fae19ea4f9d964eac0408e4408b66337b5", // KyberSwap: Meta Aggregation Router v2
  "0x000000000022d473030f116ddee9f6b43ac78ba3", // Uniswap Permit2
  "0x777777c9898d384f785ee44acfe945efdff5f3e0", // ​Morpho-AaveV2 Proxy
  "0xa397a8c2086c554b531c02e29f3291c9704b00c7", // Compound's Bulker contract for Ethereum mainnet
  "0x9409280dc1e6d33ab7a8c6ec03e5763fb61772b5", // Curve pool LDOETH-f
  "0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2", // AAVE v3
  "0xb748952c7bc638f31775245964707bcc5ddfabfc", // AAVE v3 Migration Helper
  "0xd98e1c56a56a0ec5ca4bf6fdfbfa1572ee4d8a8d", // maverick-swap-alpha
  "0x8267fdabd1b8c8645138f2de5b0fe24988dc9820", // SY-wstETH-WETH BalancerLP Aura
  "0xa0d3707c569ff8c87fa923d3823ec5d81c98be78", // Instadapp ETH v2 (iETHv2)
  "0x40aa958dd87fc8305b97f2ba922cddca374bcd7f", // OKX-DEX
  "0x65582767218d8829ffb79853af7764cea34cee2b", // Mellow ERC20Vault
  "0x13c7bcc2126d6892eefd489ad215a1a09f36aa9f", // Mellow ERC20RootVault
  "0xbfafc964361f78754f523343b09b3cb7bb73bdd6", // Mellow Tamper Strategy
  "0x7f0a0c7149a46bf943ccd412da687144b49c6014", // Cat-in-a-Box Finance CDP
  "0x4a585e0f7c18e2c414221d6402652d5e0990e5f8", // maverick pools wrapper
  "0x7623e9dc0da6ff821ddb9ebaba794054e078f8c4", // etherfi
  "0x0000000001e4ef00d069e71d6ba041b0a16f7ea0", // pendle.finance Router
  "0x463f9ed5e11764eb9029762011a03643603ad879", // Pods Finance stETHvv
  "0x5937f58c2be65e95b5519f126a79a4ca4f281f10", // lsdx.finance
  "0xc3b7af1d8c3ca78f375eb125f0211164b9071cc0", // some WETH/wstETH pool implementation
  "0xf70c086618dcf2b1a461311275e00d6b722ef914", // sushi
  "0xe76ffee8722c21b390eebe71b67d95602f58237f", // unshETH lsd vault
  "0x51a80238b5738725128d3a3e06ab41c1d4c05c74", // LSDVault_v2
  "0x7461092aa5234b42a17ee8cc51cfde6ef4becbc7", // unshETHZapv2
  "0x46a15b0b27311cedf172ab29e4f4766fbe7f4364", // Pancake V3 Positions NFT-V1
  "0x7b0eff0c991f0aa880481fdfa5624cb0bc9b10e1", // lsdx.finance
  "0xefd8a0b5e0e01a95fcc15656dad61d5b5436b2b4", // agilitylsd stETH Staking Pool
  "0xa4108aa1ec4967f8b52220a4f7e94a8201f2d906", // Gravity Bridge
  "0x638a98bbb92a7582d07c52ff407d49664dc8b3ee", // V1.4 ParaSpace PoolProxy
  "0x10cd5fbe1b404b7e19ef964b63939907bdaf42e2", // MCD_JOIN_WSTETH_A MakerDAO
  "0xa17581a9e3356d9a858b789d68b4d866e593ae94", // Compound WETH (cWETHv3)
  "0x97de57ec338ab5d51557da3434828c5dbfada371", // eUSD
  "0x82d24dd5041a3eb942cca68b319f1fda9eb0c604", // Asymetrix Protocol
  "0x4d9f9d15101eec665f77210cb999639f760f831e", // Curve.fi Factory Plain Pool: stETH/frxETH (st-frxETH-f)
  "0x5fe4b38520e856921978715c8579d2d7a4d2274f", // stETH ETHoria Vault (stETHev)
  "0x02c6d994e13f71dc6d9b367e002a04f78d05a9ad", // eSLSD Staking pool
  "0xbbf1ee38152e9d8e3470dc47947eaa65dca94913", // maverick
  "0xb9e7008fa856d66680bee9e0a24da407d9d7fad5", // zenith.cash
  "0x35636b85b68c1b4a216110fb3a5fb447a99db14a", // unsheth vdAAM
  "0x2bca0300c2aa65de6f19c2d241b54a445c9990e2", // gravitaprotocol.com
  "0x39254033945aa2e4809cc2977e7087bee48bd7ab", // originprotocol.com
  "0x839d6833cee34ffab6fa9057b39f02bd3091a1d6", // tempus.finance
  "0xa7ca2c8673bcfa5a26d8ceec2887f2cc2b0db22a", // mimic.fi
  "0x21e27a5e5513d6e65c4f830167390997aa84843a", // curve.fi stETH pool
  "0x5f59b322eb3e16a0c78846195af1f588b77403fc", // raft.fi positionManager
  "0x100daa78fc509db39ef7d04de0c1abd299f4c6ce", // Crvusd controller wstETH
  "0x858646372cc42e1a627fce94aa7a7033e7cf075a", // EigenLayer StrategyManager
  "0x827179dd56d07a7eea32e3873493835da2866976", // Sushiswap stablePoolFactory
  "0xC402D13B0D04867649a632F17528c753d8f6FBD2", // PoolPositionManager
  "0x37417B2238AA52D0DD2D6252d989E728e8f706e4", // LLAMMA - crvUSD AMM
];

export const WHITE_LIST_ADDRESSES: string[] = WHITE_LIST_ADDRESSES_RAW.map(
  (address) => address.toLowerCase(),
);

export const WITHDRAWAL_QUEUE_ADDRESS =
  "0x889edc2edab5f40e902b864ad4d7ade8e412f9b1";

export const ERC_20_APPROVAL_EVENT_ABI =
  "event Approval (address indexed owner, address indexed spender, uint256 value)";
export const ERC721_APPROVAL_EVENT_ABI = `
event Approval(
  address indexed owner,
  address indexed approved,
  uint256 indexed tokenId
)`;
export const ERC721_APPROVAL_FOR_ALL_EVENT_ABI = `
event ApprovalForAll(
  address indexed owner,
  address indexed operator,
  bool approved
)`;
