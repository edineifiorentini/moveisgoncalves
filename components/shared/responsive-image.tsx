import type { CSSProperties } from "react";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
};

function resizedSource(src: string, width: number) {
  const extensionIndex = src.lastIndexOf(".");
  if (extensionIndex < 0) return src;
  return `${src.slice(0, extensionIndex)}-${width}${src.slice(extensionIndex)}`;
}

export function ResponsiveImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
  style,
}: ResponsiveImageProps) {
  return (
    // The static FTP/Pages build has no image optimizer, so these pre-generated
    // candidates provide the same responsive delivery without a server runtime.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={`${resizedSource(src, 768)} 768w, ${src} 1400w`}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={`absolute inset-0 h-full w-full ${className}`}
      style={style}
    />
  );
}
