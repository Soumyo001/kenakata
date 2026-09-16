"use client";

import { useState } from "react";
import SafeImage from "@/components/shared/safe-image";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
    images: string[];
    title:  string;
};

const ProductGallery = ({ images, title }: ProductGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <div>
            <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                <SafeImage
                    src={images[activeIndex]}
                    alt={title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    preload={true}
                />
            </div>

            {images.length > 1 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            className={cn(
                                "relative aspect-square overflow-hidden rounded-lg border-2 bg-muted transition-opacity duration-200",
                                index === activeIndex
                                    ? "border-blue-600 dark:border-blue-400"
                                    : "border-transparent opacity-60 hover:opacity-100"
                            )}
                        >
                            <SafeImage
                                src={image}
                                alt={`${title} image ${index + 1}`}
                                sizes="(max-width: 768px) 25vw, 12vw"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGallery;