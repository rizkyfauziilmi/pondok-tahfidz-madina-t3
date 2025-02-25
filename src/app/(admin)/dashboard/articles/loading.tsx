import { ArticleTableSkeleton } from "~/components/skeletons/article-table-skeleton";

export default function ArticleTableLoadingPage() {
    return (
        <div className="h-screen overflow-y-auto flex flex-col items-center">
            <ArticleTableSkeleton />
        </div>
    )
}