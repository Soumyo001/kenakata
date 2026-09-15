import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const Hero = () => {
    return (
        <section className="border-b bg-linear-to-b from-blue-50 to-background dark:from-blue-950/30">
            <Container className="py-20 text-center md:py-28">
                <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                    Everything you need,{" "}
                    <span className="text-blue-600 dark:text-blue-400">in one place</span>
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground md:text-lg">
                    Browse thousands of products across every category. Fair prices, fast delivery, no hassle.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <Button size="lg" asChild>
                        <Link href="/products">
                            Shop now <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link href="#categories">Browse categories</Link>
                    </Button>
                </div>
            </Container>
        </section>
    );
};

export default Hero;