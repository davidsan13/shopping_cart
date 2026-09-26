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
<img width="1172" height="1252" alt="Screenshot 2026-09-19 160406" src="https://github.com/user-attachments/assets/0207409c-c5a6-4a8a-9360-baffcea488d8" />
<img width="1240" height="1252" alt="Screenshot 2026-09-19 160445" src="https://github.com/user-attachments/assets/0deef233-b70a-471b-95e1-77e695ef2cb8" />
<img width="1240" height="1250" alt="Screenshot 2026-09-19 160433" src="https://github.com/user-attachments/assets/846be9f4-c8c4-4a3d-b289-dbdcf94b189c" />


