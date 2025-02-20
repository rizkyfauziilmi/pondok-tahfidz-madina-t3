"use client";

import { Skeleton } from "~/components/ui/skeleton";

export const ArticleSkeleton = () => {
    return (
        <div className="p-4 flex flex-col gap-4 mt-12 items-center max-w-4xl mx-auto">
            <Skeleton className="w-3/4 h-8 rounded" />
            <Skeleton className="w-2/4 h-4 rounded" />
            <Skeleton className="w-full h-96 rounded my-6" />
            <div className="flex justify-between w-full">
                <div className="flex gap-2 items-center">
                    <Skeleton className="size-6 rounded-full" />
                    <Skeleton className="w-24 h-4 rounded" />
                </div>
                <div className="flex gap-4 items-center">
                    <Skeleton className="w-6 h-6 rounded" />
                    <Skeleton className="w-6 h-6 rounded" />
                </div>
            </div>
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="w-full flex flex-col gap-2">
                    <Skeleton className="w-[60%] h-6 rounded" />
                    <Skeleton className="w-[90%] h-4 rounded" />
                    <Skeleton className="w-[85%] h-4 rounded" />
                    <Skeleton className="w-[95%] h-4 rounded" />
                </div>
            ))}
        </div>
    )
}