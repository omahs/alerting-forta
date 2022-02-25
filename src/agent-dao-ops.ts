import BigNumber from "bignumber.js";

import {
  ethers,
  BlockEvent,
  TransactionEvent,
  Finding,
  FindingType,
  FindingSeverity,
} from "forta-agent";

import { ethersProvider } from "./ethers";

import NODE_OPERATORS_REGISTRY_ABI from "./abi/NodeOperatorsRegistry.json";
import LIDO_DAO_ABI from "./abi/LidoDAO.json";

import {
  NODE_OPERATORS_REGISTRY_ADDRESS,
  LIDO_DAO_ADDRESS,
  MIN_AVAILABLE_KEYS_COUNT,
  MAX_BUFFERED_ETH_AMOUNT,
  ETH_DECIMALS,
} from "./constants";

export const name = "DaoOps";

const REPORT_WINDOW = 60 * 60 * 24;
let lastReportedKeysShortage = 0;
let lastReportedBufferedEth = 0;

export async function initialize(
  currentBlock: number
): Promise<{ [key: string]: string }> {
  console.log(`[${name}]`);
  return {};
}

export async function handleBlock(blockEvent: BlockEvent) {
  const findings: Finding[] = [];

  await Promise.all([
    handleNodeOperatorsKeys(blockEvent, findings),
    handleBufferedEth(blockEvent, findings),
  ]);

  return findings;
}

async function handleNodeOperatorsKeys(
  blockEvent: BlockEvent,
  findings: Finding[]
) {
  const now = blockEvent.block.timestamp;
  if (lastReportedKeysShortage + REPORT_WINDOW < now) {
    const nodeOperatorsRegistry = new ethers.Contract(
      NODE_OPERATORS_REGISTRY_ADDRESS,
      NODE_OPERATORS_REGISTRY_ABI,
      ethersProvider
    );
    const nodeOperatorsCount =
      await nodeOperatorsRegistry.functions.getActiveNodeOperatorsCount();
    let availableKeys: Promise<any>[] = [];
    let availableKeysCount = 0;
    for (let i = 0; i < nodeOperatorsCount; i++) {
      availableKeys.push(
        nodeOperatorsRegistry.functions
          .getUnusedSigningKeyCount(i)
          .then((value) => (availableKeysCount += parseInt(String(value))))
      );
    }
    await Promise.all(availableKeys);
    if (availableKeysCount < MIN_AVAILABLE_KEYS_COUNT) {
      findings.push(
        Finding.fromObject({
          name: "Few available keys count",
          description: `There are only ${availableKeysCount} available keys left`,
          alertId: "LOW_OPERATORS_AVAILABLE_KEYS_NUM",
          severity: FindingSeverity.Medium,
          type: FindingType.Info,
        })
      );
      lastReportedKeysShortage = now;
    }
  }
}

async function handleBufferedEth(blockEvent: BlockEvent, findings: Finding[]) {
  const now = blockEvent.block.timestamp;
  if (lastReportedBufferedEth + REPORT_WINDOW < now) {
    const lidoDao = new ethers.Contract(
      LIDO_DAO_ADDRESS,
      LIDO_DAO_ABI,
      ethersProvider
    );
    const bufferedEthRaw = new BigNumber(
      String(await lidoDao.functions.getBufferedEther())
    );
    const bufferedEth = bufferedEthRaw.div(ETH_DECIMALS).toNumber();
    if (bufferedEth > MAX_BUFFERED_ETH_AMOUNT) {
      findings.push(
        Finding.fromObject({
          name: "High buffered ETH amount",
          description: `There are ${bufferedEth.toFixed(4)} buffered ETH in DAO`,
          alertId: "HIGH_BUFFERED_ETH",
          severity: FindingSeverity.Medium,
          type: FindingType.Info,
        })
      );
      lastReportedBufferedEth = now
    }
  }
}
