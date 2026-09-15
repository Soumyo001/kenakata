"use client";

import Image from "next/image";
import { useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/utils";

type ProductImageProps = {
    src:       string;
    alt:       string;
    sizes?:    string;
    className?: string;
};

const SafeImage = ({ src, alt, sizes, className }: ProductImageProps) => {
    const [imgSrc, setImgSrc] = useState<string>(src || FALLBACK_IMAGE);

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill
            loading="lazy"
            sizes={sizes}
            className={className}
            onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
    );
};

export default SafeImage;