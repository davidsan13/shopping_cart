# Shopping Cart [Live Demo](https://davidsan13.github.io/shopping_cart/)

A mock e-commerce store ("Game Central") for PS5, Xbox Series X and Nintendo Switch games. The goal of this project was to learn to manage state in React and to define routes with React Router.

# Features
- Browse all games or filter by platform, and sort by price
- Cart with quantity controls; lowering a quantity to 0 removes the game
- Cart persists across reloads (localStorage)
- Subtotal, 8% estimated tax and total, calculated in whole cents to avoid floating-point rounding errors
- Responsive layout and keyboard/screen-reader friendly (labelled controls, visible focus, skip link)

# Tech Stacks
- React JS (Context + `useReducer` for cart state)
- React Router (hash router, so deep links and refreshes work on GitHub Pages)
- Sass
- Jest + React Testing Library

# Getting Started
```
npm install
npm start        # dev server
npm test         # unit and UI tests
npm run deploy   # build and publish to GitHub Pages
```

# Lesson Learned
- I learned to manage client-side routing using the react router package library.
- Keeping cart state as a pure reducer (`src/lib/cart.js`) made it easy to test, and storing only `{ id, quantity }` means prices always come from the catalog.
- Routers that work locally can break under a subpath like `/shopping_cart/`; a hash router avoids that on GitHub Pages.

# Project Screenshots
<!-- TODO: replace with screenshots of the redesigned UI -->
