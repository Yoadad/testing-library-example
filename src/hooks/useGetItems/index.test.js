import { renderHook } from "@testing-library/react-hooks";
import makeServer from "../../server";
import { reminders } from "../../mocks";
import { reactQueryWrapper } from "../../utils/test";

import { useGetItems } from ".";

function setup() {
  return renderHook(() => useGetItems(), {
    wrapper: reactQueryWrapper,
  });
}

describe("useGetItems", () => {
  let server;

  beforeEach(() => {
    server = makeServer("test");
    reminders.forEach((r) => {
      server.create("reminder", r);
    });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should return a list of reminders", async () => {
    const { result, waitFor } = setup();

    expect(result.current.status).toBe("loading");

    await waitFor(() => {
      expect(result.current.status).toBe("success");
    });
    expect(result.current.data).toHaveLength(3);
  });

  it("should return an error", async () => {
    const errors = ["Fail like always"];
    server.get("/reminders", { errors }, 500);

    const { result, waitFor } = setup();

    expect(result.current.status).toBe("loading");

    await waitFor(() => {
      expect(result.current.status).toBe("error");
    });

    expect(result.current.error.response.data.errors).toStrictEqual([
      "Fail like always",
    ]);
  });
});
