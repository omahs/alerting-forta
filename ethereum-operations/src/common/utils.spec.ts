import { Finding, FindingSeverity, FindingType } from "forta-agent";
import { mergeFindings } from "./utils";

describe("utils", () => {
  it("should merge findings", () => {
    const ids = ["SOME-CUTE-ALERT", "SOME-FAKE-ALERT", "SOME-SOSO-ALERT"];
    const wordsList = ["🌷🌷🌷", "🍯🍯🍯", "🌸🌸🌸"];

    const findings = Array.from({ length: 51 }, (_, i) => {
      return Finding.fromObject({
        name: "🚨 Alert",
        description: wordsList[i % wordsList.length],
        alertId: ids[i % ids.length],
        severity: FindingSeverity.Low,
        type: FindingType.Degraded,
      });
    });

    const reducedFindings = mergeFindings(findings);
    expect(reducedFindings).toMatchSnapshot();
    expect(reducedFindings.length).toBe(3);
  });
});
