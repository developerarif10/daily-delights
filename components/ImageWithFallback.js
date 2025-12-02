import { useState } from "react";

/*
  Responsive image + native lazy loading + simple fallback.
  Accepts an images object:
  {
    webp: { "320": "/path-320.webp", "640": "/path-640.webp", ... },
    jpg: { "320": "/path-320.jpg", ... },
    alt: "..."
  }
*/
const ImageWithFallback = ({
  images = {},
  className = "rounded-md",
  sizes = "(max-width: 640px) 320px, 640px",
}) => {
  const [errored, setErrored] = useState(false);

  const buildSrcSet = (map) =>
    Object.entries(map || {})
      .map(([w, url]) => `${url} ${w}w`)
      .join(", ");

  const webpSrcSet = images.webp ? buildSrcSet(images.webp) : "";
  const jpgSrcSet = images.jpg ? buildSrcSet(images.jpg) : "";

  // Choose a small fallback if error occurs
  const fallback = images.jpg ? Object.values(images.jpg)[0] : "";

  return (
    <div
      className={`bg-gray-100 overflow-hidden ${className}`}
      style={{ minWidth: 72 }}
    >
      {!errored ? (
        <picture>
          {webpSrcSet && (
            <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
          )}
          {jpgSrcSet && (
            <source type="image/jpeg" srcSet={jpgSrcSet} sizes={sizes} />
          )}
          <img
            src={fallback}
            alt={images.alt || "menu image"}
            loading="lazy"
            decoding="async"
            className="w-full h-20 object-cover"
            onError={() => setErrored(true)}
            srcSet={jpgSrcSet}
            sizes={sizes}
          />
        </picture>
      ) : (
        // fallback skeleton
        <div className="w-full h-20 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
          Image not available
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
