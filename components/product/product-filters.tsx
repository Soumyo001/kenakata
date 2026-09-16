"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { DEFAULT_SORT } from "@/lib/data/constants";
import { CategoryType, SortOptionType } from "@/lib/types";
import { ListingParamsSchemaType } from "@/lib/validators/schema-validators/listing-params.schema";

const ALL_CATEGORIES = "all";
const FILTER_KEYS = ["search", "category", "minPrice", "maxPrice", "sort"];
const SORT_LABELS: Record<SortOptionType, string> = {
    "newest":     "Newest",
    "price-asc":  "Price: Low to High",
    "price-desc": "Price: High to Low",
    "name-asc":   "Name: A to Z",
};

type ProductFiltersProps = {
    categories: CategoryType[];
    params: ListingParamsSchemaType;
};

const ProductFilters = ({ categories, params }: ProductFiltersProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [resetKey, setResetKey] = useState<number>(0);

    const updateParam = (key: string, value: string) => {
        if ((searchParams.get(key) ?? "") === value) return;
        // console.log("PARAMMSS", searchParams.toString())

        const nextParams = new URLSearchParams(searchParams.toString());
        if (value) nextParams.set(key, value);
        else nextParams.delete(key);

        nextParams.delete("page");

        const query = nextParams.toString();
        // console.log("UPDATED FILTER QUERYY", query)
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    };

    const debouncedSearch = useDebouncedCallback((value: string) => {
        updateParam("search", value.trim());
    }, 400);

    const clearFilters = () => {
        debouncedSearch.cancel();
        setResetKey((key) => key + 1);
        router.replace(pathname, { scroll: false });
    };

    const commitOnEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") e.currentTarget.blur();
    };

    const hasFilters = FILTER_KEYS.some((key) => searchParams.has(key));

    return (
        <div key={resetKey} className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-12">
            <div className="relative col-span-2 lg:col-span-4">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search products..."
                    defaultValue={params.search}
                    onChange={(e) => debouncedSearch(e.target.value)}
                    className="pl-9"
                />
            </div>

            <Select
                value={params.category ? String(params.category):ALL_CATEGORIES}
                onValueChange={(value) => updateParam("category", value === ALL_CATEGORIES ? "" : value)}
            >
                <SelectTrigger className="col-span-2 w-full sm:col-span-1 lg:col-span-3">
                    <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
                    {categories.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={params.sort}
                onValueChange={(value) => updateParam("sort", value === DEFAULT_SORT ? "" : value)}
            >
                <SelectTrigger className="col-span-2 w-full sm:col-span-1 lg:col-span-2 lg:order-last">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Object.entries(SORT_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            
            <Input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="Min $"
                defaultValue={params.minPrice ?? ""}
                onBlur={(e) => updateParam("minPrice", e.target.value)}
                onKeyDown={commitOnEnter}
                className="lg:col-span-1"
            />
            <Input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="Max $"
                defaultValue={params.maxPrice ?? ""}
                onBlur={(e) => updateParam("maxPrice", e.target.value)}
                onKeyDown={commitOnEnter}
                className="lg:col-span-1"
            />

            <Button
                variant="ghost"
                onClick={clearFilters}
                disabled={!hasFilters}
                className="col-span-2 lg:order-last lg:col-span-1"
            >
                <X className="h-4 w-4" />
                Clear
            </Button>
        </div>
    );
};

export default ProductFilters;