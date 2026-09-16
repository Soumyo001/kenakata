import { z } from "zod";
import { DEFAULT_SORT, SORT_VALUES } from "@/lib/data/constants";

export const ListingParamsSchema = z.object({
    search: z.string().trim().max(100).catch(""),
    category: z.coerce.number().int().positive().optional().catch(undefined),
    minPrice: z.coerce.number().min(0).optional().catch(undefined),
    maxPrice: z.coerce.number().min(0).optional().catch(undefined),
    sort: z.enum(SORT_VALUES).catch(DEFAULT_SORT),
    page: z.coerce.number().int().min(1).catch(1)
});

export type ListingParamsSchemaType = z.infer<typeof ListingParamsSchema>;