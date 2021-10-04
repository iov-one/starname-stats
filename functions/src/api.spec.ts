import { fetchStarnameTransactions, ROOT } from "./api";
import { Entry } from "./types/entry";
import { toQueryString } from "./utils/toQueryString";

const apiUrl = "https://api.cluster-stargatenet.iov.one";

describe("Test api", (): void => {
  it("Handles empty objects as no parameters", () => {
    const query = toQueryString({});
    expect(query).toBe("");
  });

  it("Encodes query parameters correctly", () => {
    const query = toQueryString({
      [ROOT]: [{ pagination: { offset: 1 } }, { pagination: { limit: 1 } }],
      events: [
        { message: { module: "starname" } },
        { transfer: { sender: "sender" } },
      ],
    });
    expect(query).toBe(
      "?pagination.offset=1&pagination.limit=1&events=message.module='starname'&events=transfer.sender='sender'",
    );
  });

  it("First test ever", async (): Promise<void> => {
    const response: ReadonlyArray<Entry> = await fetchStarnameTransactions(
      apiUrl,
    );
    expect(response.length).toBeGreaterThan(0);
  });
});
