import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("Dev Risk Dashboard", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    window.alert = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("renders key form controls", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /dev risk dashboard/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/code churn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/complexity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of bugs/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/has automated tests/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /calculate risk/i })).toBeInTheDocument();
  });

  test("submits data and renders risk result", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ riskScore: 80, riskLevel: "High" }),
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/code churn/i), { target: { value: "60" } });
    fireEvent.change(screen.getByLabelText(/complexity/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/number of bugs/i), { target: { value: "9" } });
    fireEvent.click(screen.getByRole("button", { name: /calculate risk/i }));

    await waitFor(() => {
      expect(screen.getByText(/risk score: 80/i)).toBeInTheDocument();
      expect(screen.getByText(/risk level: high/i)).toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  test("shows alert when backend validation fails", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "codeChurn cannot be negative" }),
    });

    render(<App />);

    fireEvent.change(screen.getByLabelText(/code churn/i), { target: { value: "-1" } });
    fireEvent.click(screen.getByRole("button", { name: /calculate risk/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("codeChurn cannot be negative");
    });
  });
});
