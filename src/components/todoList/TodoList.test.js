import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import makeServer from "../../server";
import { reminders } from "../../mocks";
import { reactQueryWrapper } from "../../utils/test";

import TodoList from ".";

function setup() {
  const utils = render(<TodoList />, {
    wrapper: reactQueryWrapper,
  });

  const clickAddIcon = () => {
    userEvent.click(screen.getByRole("button", { name: /Add Icon/i }));
  };

  const typeNewItemText = (text) => {
    userEvent.type(screen.getByPlaceholderText(/Drink Water/i), text);
  };

  const submitNewItem = () => {
    userEvent.click(screen.getByRole("button", { name: /Add item/i }));
  };

  const getAllReminders = () => {
    return screen.queryAllByRole("button", { name: /Delete/i });
  };

  const clickDeleteIcon = (name) => {
    userEvent.click(screen.getByRole("button", { name }));
  };

  return {
    ...utils,
    clickAddIcon,
    typeNewItemText,
    submitNewItem,
    getAllReminders,
    clickDeleteIcon,
  };
}

describe("<TodoList />", () => {
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

  it("should render successfully", () => {
    setup();

    expect(screen.getByText("Reminders")).toBeInTheDocument();
  });

  it("should render a list of reminders items", async () => {
    const utils = setup();

    await waitFor(() => {
      expect(utils.getAllReminders()).toHaveLength(3);
    });
  });

  it("should not render a list of reminders items if get request failed", async () => {
    server.get("/reminders", { errors: ["Fail like always"] }, 500);

    const utils = setup();

    await waitFor(() => {
      expect(screen.getByText("Upps! items not found")).toBeInTheDocument();
    });

    expect(utils.getAllReminders()).toHaveLength(0);
  });

  it("should create a new reminder", async () => {
    const utils = setup();
    const text = "New Item";

    utils.clickAddIcon();
    utils.typeNewItemText(text);
    utils.submitNewItem();

    await waitFor(() => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });

    expect(utils.getAllReminders()).toHaveLength(4);
  });

  it("should delete a reminder", async () => {
    const utils = setup();

    await waitFor(() => {
      expect(utils.getAllReminders()).toHaveLength(3);
    });

    utils.clickDeleteIcon("Delete Reminder 3");

    await waitFor(() => {
      expect(screen.queryByText("Reminder 3")).not.toBeInTheDocument();
    });

    expect(utils.getAllReminders()).toHaveLength(2);
  });
});
