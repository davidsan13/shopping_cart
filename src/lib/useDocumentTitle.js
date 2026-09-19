import { useEffect } from "react";

const SITE = "Game Central";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE}` : SITE;
  }, [title]);
}
