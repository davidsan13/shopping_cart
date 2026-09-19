import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { routes } from "./router";
import { ShopContextProvider } from "./components/ShopContextProvider";

function renderApp(path = "/") {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return render(
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  );
}

const addButton = (title) =>
  screen.getByRole("button", { name: new RegExp(`add to cart ${title}`, "i") });

beforeEach(() => localStorage.clear());

test("home page lists the three lowest prices and links to each platform", () => {
  renderApp("/");
  const cards = screen.getAllByRole("article");
  expect(cards).toHaveLength(3);
  expect(within(cards[0]).getByText("$14.99")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /playstation 5/i })).toHaveAttribute(
    "href",
    "/products/PS5"
  );
});

test("a platform URL filters the catalog", () => {
  renderApp("/products/XboxX");
  expect(screen.getByRole("heading", { level: 1, name: "Xbox Series X" })).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(5);
  expect(screen.getByRole("link", { name: "Xbox Series X" })).toHaveAttribute(
    "aria-current",
    "page"
  );
});

test("an unknown platform shows the not-found page", () => {
  renderApp("/products/Dreamcast");
  expect(screen.getByRole("heading", { name: /page not found/i })).toBeInTheDocument();
});

test("sorting by price puts the cheapest game first", () => {
  renderApp("/products");
  userEvent.selectOptions(screen.getByLabelText(/sort by/i), "price-asc");
  const firstCard = screen.getAllByRole("article")[0];
  expect(within(firstCard).getByRole("heading", { name: /halo infinite/i })).toBeInTheDocument();
});

test("adding a game updates the nav count and the cart totals", () => {
  renderApp("/products");
  userEvent.click(addButton("Halo Infinite"));
  expect(screen.getByRole("link", { name: /cart \(1 item\)/i })).toBeInTheDocument();

  userEvent.click(screen.getByRole("link", { name: /cart/i }));
  expect(screen.getByRole("heading", { name: /your cart/i })).toBeInTheDocument();
  const summary = screen.getByRole("complementary", { name: /order summary/i });
  expect(within(summary).getByText("$14.99")).toBeInTheDocument(); // subtotal
  expect(within(summary).getByText("$1.20")).toBeInTheDocument(); // 8% tax
  expect(within(summary).getByText("$16.19")).toBeInTheDocument(); // total
});

test("decreasing the last copy removes the game and shows the empty state", () => {
  renderApp("/products");
  userEvent.click(addButton("Halo Infinite"));
  userEvent.click(screen.getByRole("link", { name: /cart/i }));
  userEvent.click(screen.getByRole("button", { name: /decrease quantity of halo infinite/i }));
  expect(screen.getByRole("heading", { name: /your cart is empty/i })).toBeInTheDocument();
});

test("the cart survives a reload", () => {
  const first = renderApp("/products");
  userEvent.click(addButton("Elden Ring"));
  first.unmount();

  renderApp("/cart");
  expect(screen.getByRole("heading", { name: "Elden Ring" })).toBeInTheDocument();
});

test("a corrupt saved cart doesn't crash the app", () => {
  localStorage.setItem("game-central-cart", "{not json");
  renderApp("/cart");
  expect(screen.getByRole("heading", { name: /your cart is empty/i })).toBeInTheDocument();
});
