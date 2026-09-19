import React from "react";
import { Link, useRouteError } from "react-router-dom";
import useDocumentTitle from "../lib/useDocumentTitle";

export function NotFound() {
  useDocumentTitle("Page not found");
  return (
    <div className="empty-state">
      <h1 className="page-title">Page not found</h1>
      <p>That page doesn't exist. Check the address or head back to the store.</p>
      <Link to="/" className="btn btn--large">
        Back to home
      </Link>
    </div>
  );
}

export default function ErrorPage() {
  const error = useRouteError();
  useDocumentTitle("Something went wrong");
  return (
    <div className="empty-state" id="error-page">
      <h1 className="page-title">Something went wrong</h1>
      <p>{error?.statusText || error?.message || "An unexpected error occurred."}</p>
      <Link to="/" className="btn btn--large">
        Back to home
      </Link>
    </div>
  );
}
