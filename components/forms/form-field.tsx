import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
    id:         string;
    label:      string;
    error?:     string;
    className?: string;
    children:   React.ReactNode;
};

const FormField = ({ id, label, error, className, children }: FormFieldProps) => {
    return (
        <div className={cn("space-y-2", className)}>
            <Label htmlFor={id}>{label}</Label>
            {children}
            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
};

export default FormField;