import React, { useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface SkewImageProps {
  src: string;
  alt: string;
  className?: string;
  maxRotation?: number;
  maxScale?: number;
  transitionSpeed?: number;
}

const SkewImage: React.FC<SkewImageProps> = ({
  src,
  alt,
  className = "",
  maxRotation = 10,
  maxScale = 1.1,
  transitionSpeed = 0.1,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLImageElement>) => {
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } =
        currentTarget.getBoundingClientRect();
      const x = ((clientX - left) / width) * 2 - 1;
      const y = ((clientY - top) / height) * 2 - 1;
      setRotateX(y * maxRotation);
      setRotateY(-x * maxRotation);
      setScale(maxScale);
    },
    [maxRotation, maxScale],
  );

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  }, []);

  return (
    <div className="relative inline-block" style={{ perspective: "1000px" }}>
      {!isLoaded && (
        <Skeleton className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onLoad={() => setIsLoaded(true)}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
          transition: `transform ${transitionSpeed}s ease-out`,
          alignContent: "center",
        }}
      />
    </div>
  );
};

export default SkewImage;
