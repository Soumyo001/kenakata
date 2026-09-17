import { FieldValues, Path, UseFormSetError } from "react-hook-form";

type ServerErrorBodyType = {
    message?: string;
    errors?:  Record<string, string[]>;
};

export function applyServerErrors<T extends FieldValues>(setError: UseFormSetError<T>, body: ServerErrorBodyType): void {
    const entries = Object.entries(body.errors ?? {});

    if (entries.length === 0) {
        setError("root", { message: body.message ?? "Something went wrong. Please try again." });
        return;
    }
    entries.forEach(([field, messages]) => setError(field as Path<T>, { message: messages[0] }));
}