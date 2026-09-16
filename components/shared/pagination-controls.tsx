import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildListingHref, getPageWindow } from "@/lib/helpers/listing-helper";
import { ListingParamsSchemaType } from "@/lib/validators/schema-validators/listing-params.schema";

type PaginationControlsProps = {
    params: ListingParamsSchemaType;
    page: number;
    totalPages: number;
};

const PaginationControls = ({ params, page, totalPages }: PaginationControlsProps) => {
    if (totalPages <= 1) return null;

    const pages = getPageWindow(page, totalPages);

    return (
        <nav className="mt-10 flex items-center justify-center gap-1">
            {page > 1 ? (
                <Button variant="outline" size="icon" asChild>
                    <Link href={buildListingHref(params, page - 1)}>
                        <ChevronLeft className="h-4 w-4" />
                    </Link>
                </Button>
            ) : (
                <Button variant="outline" size="icon" disabled>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            )}

            {pages.map((n) => (
                <Button
                    key={n}
                    variant={n === page ? "default" : "ghost"}
                    size="icon"
                    asChild
                    className="hidden sm:inline-flex"
                >
                    <Link href={buildListingHref(params, n)} aria-current={n === page ? "page" : undefined}>
                        {n}
                    </Link>
                </Button>
            ))}

            <span className="px-3 text-sm text-muted-foreground sm:hidden">
                Page {page} of {totalPages}
            </span>

            {page < totalPages ? (
                <Button variant="outline" size="icon" asChild>
                    <Link href={buildListingHref(params, page + 1)}>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </Button>
            ) : (
                <Button variant="outline" size="icon" disabled>
                    <ChevronRight className="h-4 w-4" />
                </Button>
            )}
        </nav>
    );
};

export default PaginationControls;