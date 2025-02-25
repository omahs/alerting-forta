import { configureContainer, Finding } from "forta-agent";
import { AwilixContainer, asFunction } from "awilix";
import {
  provideAgentPath,
  provideRunBlock,
  provideRunTransaction,
} from "./utils";

const TEST_TIMEOUT = 60_000; // ms

describe("agent-proxy-watcher e2e tests", () => {
  let runBlock: (
    blockHashOrNumber: string | number,
    initBlock?: number,
    skipInit?: boolean,
  ) => Promise<Finding[]>;
  let runTransaction: (txHash: string) => Promise<Finding[]>;
  let logSpy: jest.SpyInstance;

  beforeAll(() => {
    logSpy = jest.spyOn(console, "log");
    logSpy.mockImplementation(() => {});
  });

  beforeEach(async () => {
    const container = configureContainer() as AwilixContainer;
    container.register({
      agentPath: asFunction(
        provideAgentPath("subagents/proxy-watcher/agent-proxy-watcher"),
      ),
      runTransaction: asFunction(provideRunTransaction),
      runBlock: asFunction(provideRunBlock),
    });

    // https://docs.forta.network/en/latest/cli/#invoke-commands-programmatically
    runTransaction = container.resolve("runTransaction");
    runBlock = container.resolve("runBlock");
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it(
    "should process block with changed proxy implementation",
    async () => {
      let findings = await runBlock(15018882, 14524801);
      findings.sort((a, b) => (a.description < b.description ? -1 : 1));
      expect(findings).toMatchSnapshot();

      // no subsequent findings expected
      findings = await runBlock(15018883, undefined, true);
      expect(findings.length).toBe(0);
    },
    TEST_TIMEOUT,
  );
});
