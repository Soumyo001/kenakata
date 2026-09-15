"use client";

import { useEffect } from "react";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Container className="flex flex-col items-center gap-4 py-24 text-center">
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p className="text-muted-foreground">
                We couldn&apos;t load this page. Please try again.
            </p>
            <Button onClick={() => reset()}>Try again</Button>
        </Container>
    );
};

export default Error;