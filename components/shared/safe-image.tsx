"use client";
import Image from "next/image";
import { useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/utils";

type SafeImageProps = {
    src: string;
    alt: string;
    sizes?: string;
    className?: string;
    preload?: boolean;
};

const SafeImage = ({ src, alt, sizes, className, preload }: SafeImageProps) => {
    const [failedSrc, setFailedSrc] = useState<string | null>(null);

    const imgSrc = !src || src === failedSrc ? FALLBACK_IMAGE : src;

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill
            preload={preload}
            sizes={sizes}
            className={className}
            onError={() => setFailedSrc(src)}
        />
    );
};

export default SafeImage;