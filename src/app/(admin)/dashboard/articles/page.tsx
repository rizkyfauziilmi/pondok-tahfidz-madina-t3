"use client";

import { ArticleDataTable } from "./_components/article-data-table";
import { articleColumns } from "./_components/article-columns";
import { api } from "~/trpc/react";
import { ArticleTableSkeleton } from "./_components/article-table-skeleton";

export default function ArticlesPage() {
    const {
        data: articles,
        isPending,
        error,
    } = api.articleRouter.getDashboardArticles.useQuery();

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="h-screen overflow-y-auto flex flex-col items-center">
            {isPending ?
                <ArticleTableSkeleton /> :
                <ArticleDataTable columns={articleColumns} data={articles} />
            }
        </div>
    )
}