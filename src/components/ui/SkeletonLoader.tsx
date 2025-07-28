import clsx from "clsx";

type SkeletonLoaderProps = {
    className?: string;
};

export function SkeletonLoader({ className }: SkeletonLoaderProps) {
    return(
        <div 
            className={clsx(
                "animate-pulse rounded-md bg-ash-700/20",
                className
            )}
        />
    );
}