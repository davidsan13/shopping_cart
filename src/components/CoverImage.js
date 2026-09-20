import React, { useEffect, useRef, useState } from "react";

// A cover picture that fades in once it has loaded, so covers don't pop into their frames.
// The CSS (see .product-card__cover img and .cart-line__cover img) reads data-loaded.
const CoverImage = ({ src, alt }) => {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // A cached image can finish loading before React attaches onLoad.
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);

  // onError also reveals the image so a broken cover shows its alt text instead of nothing.
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      data-loaded={loaded}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
    />
  );
};

export default CoverImage;
