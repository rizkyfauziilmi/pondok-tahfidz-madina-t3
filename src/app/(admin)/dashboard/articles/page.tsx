"use client";

import { ArticleDataTable } from "./_components/article-data-table";
import { articleColumns } from "./_components/article-columns";
import {api} from "~/trpc/react";

export default function ArticlesPage() {
    const {
        data: articles,
        isPending,
        error,
    } = api.articleRouter.getDashboardArticles.useQuery();

    if (isPending) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className="h-screen overflow-y-auto flex flex-col items-center">
            {/* TODO : finish implment the table */}
            <ArticleDataTable columns={articleColumns} data={articles} />
        </div>
    )
}