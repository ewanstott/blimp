// draft test

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Login from "./Login";

test("renders login form", () => {
  const { getByLabelText, getByText } = render(<Login />);
  const emailInput = getByLabelText("Email");
  const passwordInput = getByLabelText("Password");
  const loginButton = getByText("Login");

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginButton).toBeInTheDocument();
});

test("allows user to log in with correct credentials", () => {
  const { getByLabelText, getByText } = render(<Login />);
  const emailInput = getByLabelText("Email");
  const passwordInput = getByLabelText("Password");
  const loginButton = getByText("Login");

  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(loginButton);

  // Add assertions here to check if user is logged in and redirected
});
