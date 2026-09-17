"use client";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { FALLBACK_IMAGE, sanitizeImages } from "@/lib/utils";

type SafeImageProps = {
    src: string;
    alt: string;
    sizes?: string;
    className?: string;
    preload?: boolean;
    fallback?: ReactNode
};

const SafeImage = ({ src, alt, sizes, className, preload, fallback }: SafeImageProps) => {
    const [failedSrc, setFailedSrc] = useState<string | null>(null);

    const isLocalSrc = typeof src === "string" && src.startsWith("/");
    const safeSrc = isLocalSrc
        ? src
        : sanitizeImages(src ? [src] : undefined)[0];

    const isRejectedRemote = !isLocalSrc && safeSrc === FALLBACK_IMAGE;
    const shouldFallback = !src || isRejectedRemote || safeSrc === failedSrc;

    if (shouldFallback && fallback !== undefined) {
        return <>{fallback}</>;
    }

    const imgSrc = shouldFallback ? FALLBACK_IMAGE : safeSrc;

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill
            preload={preload}
            sizes={sizes}
            className={className}
            onError={() => setFailedSrc(safeSrc)}
        />
    );
};

export default SafeImage;