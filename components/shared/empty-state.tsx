import type { LucideIcon } from "lucide-react";

type EmptyStateProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    children?: React.ReactNode;
};

const EmptyState = ({ icon: Icon, title, description, children }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center rounded-xl border border-dashed px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Icon className="h-6 w-6 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">{title}</h2>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
            {children && <div className="mt-6">{children}</div>}
        </div>
    );
};

export default EmptyState;