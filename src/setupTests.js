import "@testing-library/jest-dom";

// jsdom doesn't implement scrolling; <ScrollRestoration> calls it on navigation.
window.scrollTo = jest.fn();
