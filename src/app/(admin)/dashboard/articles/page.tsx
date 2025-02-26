"use client"

import { ArticleDataTable } from "./_components/article-data-table";
import { articleColumns } from "./_components/article-columns";
import { api } from "~/trpc/react";
import { ArticleTableSkeleton } from "~/components/skeletons/article-table-skeleton";
import { ErrorDisplay } from "~/components/error-display";
import { RefreshCcw } from "lucide-react";

export default function ArticlesPage() {
    const {
        data: articles,
        isPending,
        error,
        refetch,
    } = api.articleRouter.getDashboardArticles.useQuery();

    if (error) {
        return <ErrorDisplay
            title="Gagal memuat artikel"
            message={error.message}
            buttonText="Coba lagi"
            iconButton={<RefreshCcw className="h-4 w-4 mr-2" />}
            onReset={refetch}
        />
    }


    return (
        <div className="h-screen overflow-y-auto flex flex-col items-center">
            {isPending ? (
                <ArticleTableSkeleton />
            ) : (
                <ArticleDataTable columns={articleColumns} data={articles} />
            )}
        </div>
    )
}