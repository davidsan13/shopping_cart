import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router";
import { ShopContextProvider } from "./components/ShopContextProvider";
import CoverImage from "./components/CoverImage";

function renderApp(path = "/") {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  );
}

// The button reads "Added" for 1.5s after a click, so accept either label.
const addButton = (title) =>
  screen.getByRole("button", { name: new RegExp(`(add to cart|added) ${title}`, "i") });

const openCartWith = (title, copies = 1) => {
  renderApp("/products");
  for (let i = 0; i < copies; i += 1) userEvent.click(addButton(title));
  userEvent.click(screen.getByRole("link", { name: /cart/i }));
};

const haloRow = () =>
  screen.getByRole("heading", { name: "Halo Infinite Standard Edition" }).closest("li");

beforeEach(() => localStorage.clear());
afterEach(() => jest.useRealTimers());

describe("CoverImage", () => {
  test("stays hidden until the picture has loaded", () => {
    render(<CoverImage src="cover.png" alt="Cover art" />);
    const image = screen.getByAltText("Cover art");
    expect(image).toHaveAttribute("data-loaded", "false");
    fireEvent.load(image);
    expect(image).toHaveAttribute("data-loaded", "true");
  });

  test("a broken picture is revealed so its alt text shows instead of a blank frame", () => {
    render(<CoverImage src="missing.png" alt="Cover art" />);
    const image = screen.getByAltText("Cover art");
    fireEvent.error(image);
    expect(image).toHaveAttribute("data-loaded", "true");
  });
});

describe("cart row exit", () => {
  test("Remove fades the row for 200ms, then removes it", () => {
    jest.useFakeTimers();
    openCartWith("Halo Infinite");
    userEvent.click(screen.getByRole("button", { name: /^remove/i }));

    const row = haloRow();
    expect(row).toHaveClass("is-leaving");

    act(() => jest.advanceTimersByTime(199));
    expect(row).toBeInTheDocument();

    act(() => jest.advanceTimersByTime(1));
    expect(screen.getByRole("heading", { name: /your cart is empty/i })).toBeInTheDocument();
  });

  test("lowering a quantity from 2 to 1 is instant and does not trigger the exit", () => {
    openCartWith("Halo Infinite", 2);
    userEvent.click(screen.getByRole("button", { name: /decrease quantity of halo infinite/i }));
    expect(haloRow()).not.toHaveClass("is-leaving");
    expect(screen.getByRole("group", { name: /quantity of halo infinite/i })).toHaveTextContent("1");
  });

  test("clicking Remove twice quickly removes the game once", () => {
    jest.useFakeTimers();
    openCartWith("Halo Infinite");
    const remove = screen.getByRole("button", { name: /^remove/i });
    userEvent.click(remove);
    userEvent.click(remove);
    act(() => jest.advanceTimersByTime(200));
    expect(screen.getByRole("heading", { name: /your cart is empty/i })).toBeInTheDocument();
  });

  test("the game is still removed if the visitor leaves the cart before the exit ends", () => {
    jest.useFakeTimers();
    openCartWith("Halo Infinite");
    userEvent.click(screen.getByRole("button", { name: /^remove/i }));
    userEvent.click(screen.getByRole("link", { name: "Home" }));
    act(() => jest.advanceTimersByTime(200));
    userEvent.click(screen.getByRole("link", { name: /cart/i }));
    expect(screen.getByRole("heading", { name: /your cart is empty/i })).toBeInTheDocument();
  });
});
