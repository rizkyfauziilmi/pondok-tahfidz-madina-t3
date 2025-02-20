"use client";

import { Skeleton } from "~/components/ui/skeleton";

export const ArticleTableSkeleton = () => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-8 w-24" />
            </div>
            <div className="rounded-md border max-w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <th key={index} className="p-4">
                                    <Skeleton className="h-4 w-full" />
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: 5 }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: 5 }).map((_, cellIndex) => (
                                    <td key={cellIndex} className="p-4">
                                        <Skeleton className="h-4 w-full" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between px-2 mt-2">
                <Skeleton className="h-8 w-32" />
                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-8 w-14" />
                    </div>
                    <Skeleton className="h-4 w-28" />
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                        <Skeleton className="h-8 w-8" />
                    </div>
                </div>
            </div>
        </div>
    );
};