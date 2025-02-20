import { Card, CardHeader, CardContent, CardFooter } from "../../../../components/ui/card"
import { Skeleton } from "../../../../components/ui/skeleton"

export const ArticleCardSkeleton = () => {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="p-0 pb-4">
                <Skeleton className="w-full h-48 rounded-t-lg" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                    <div className="space-y-2 text-muted-foreground text-sm">
                        <Skeleton className="h-4 w-6" />
                        <Skeleton className="h-4 w-6" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Skeleton className="h-9 w-full" />
            </CardFooter>
        </Card>
    )
}