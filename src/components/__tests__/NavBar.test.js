import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../NavBar";

test("renders NavBar", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );

  // screen.debug();
  const signInLink = screen.getByRole("link", { name: "Sign in" });
  expect(signInLink).toBeInTheDocument();
});


test("renders Sign in and Sign up buttons again on log out", async () => {
    render(
      <Router>
          <NavBar />
      </Router>
    );
  
    const signInLink = await screen.findByRole("link", { name: "Sign in" });
    const signUpLink = await screen.findByRole("link", { name: "Sign up" });
  
    expect(signInLink).toBeInTheDocument();
    expect(signUpLink).toBeInTheDocument();
});