import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AmaltasAssistant from "./AmaltasAssistant.jsx";
import { LEAD_KEY } from "../lib/chatLogger.js";

// The component uses <Link> and useLocation, so it needs a router around it.
// We use a non-home route so the 2.5 s auto-open timer doesn't fire.
function renderAssistant() {
  render(
    <MemoryRouter initialEntries={["/admissions"]}>
      <AmaltasAssistant />
    </MemoryRouter>
  );
}

const openChat = (user) => user.click(screen.getByRole("button", { name: /chat with priya/i }));

beforeEach(() => localStorage.clear());

describe("<AmaltasAssistant />", () => {
  it("shows validation errors when the lead form is submitted empty", async () => {
    const user = userEvent.setup();
    renderAssistant();
    await openChat(user);

    await user.click(screen.getByRole("button", { name: "Start chat" }));

    expect(screen.getByText("Please enter your name.")).toBeInTheDocument();
    expect(screen.getByText("Please choose a course.")).toBeInTheDocument();
    expect(screen.getByText("Please enter your mobile number.")).toBeInTheDocument();
  });

  it("filters non-digits out of the phone field as the user types", async () => {
    const user = userEvent.setup();
    renderAssistant();
    await openChat(user);

    const phone = screen.getByLabelText("Mobile number");
    await user.type(phone, "98abc765-43210");
    expect(phone).toHaveValue("9876543210");
  });

  it("starts the chat after valid details, saves the lead, and answers a question", async () => {
    const user = userEvent.setup();
    renderAssistant();
    await openChat(user);

    await user.type(screen.getByLabelText("Full name"), "Riya Sharma");
    await user.selectOptions(screen.getByLabelText("Course interested in"), "Not sure yet");
    await user.type(screen.getByLabelText("Mobile number"), "9876543210");
    await user.click(screen.getByRole("button", { name: "Start chat" }));

    // Lead form is replaced by the chat, greeting the visitor by first name.
    expect(screen.getByText(/Hi Riya!/)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(LEAD_KEY)).phone).toBe("9876543210");

    await user.type(screen.getByLabelText("Ask a question"), "hostel{Enter}");
    expect(screen.getByText("hostel")).toBeInTheDocument(); // user's bubble
    // Bot replies after a short "typing" delay.
    expect(await screen.findByText(/hostel/i, { selector: "strong" }, { timeout: 2000 })).toBeInTheDocument();
  });

  it("skips the lead form for a returning visitor", async () => {
    localStorage.setItem(LEAD_KEY, JSON.stringify({ name: "Aman Verma", course: "BAMS", phone: "9876543210" }));
    const user = userEvent.setup();
    renderAssistant();
    await openChat(user);

    expect(screen.queryByRole("button", { name: "Start chat" })).not.toBeInTheDocument();
    expect(screen.getByText(/Hi Aman!/)).toBeInTheDocument();
  });
});
