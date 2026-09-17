import SafeImage from "@/components/shared/safe-image";
import { cn, getInitials } from "@/lib/utils";

type UserAvatarProps = {
    name: string;
    avatar?: string;
    className?: string;
};

const UserAvatar = ({
    name,
    avatar,
    className,
}: UserAvatarProps) => {
    const initials = getInitials(name);

    return (
        <span
            className={cn(
                "relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200",
                className
            )}
        >
            {avatar ? (
                <SafeImage
                    src={avatar}
                    alt={`${name}'s profile picture`}
                    sizes="56px"
                    className="object-cover"
                    fallback={initials}
                />
            ) : (
                initials
            )}
        </span>
    );
};

export default UserAvatar;