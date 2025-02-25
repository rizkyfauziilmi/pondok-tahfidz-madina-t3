import { ArticleDataTable } from "./_components/article-data-table";
import { articleColumns } from "./_components/article-columns";
import { api } from "~/trpc/server";

export default async function ArticlesPage() {
    const articles = await api.articleRouter.getDashboardArticles();

    return (
        <div className="h-screen overflow-y-auto flex flex-col items-center">
            <ArticleDataTable columns={articleColumns} data={articles} />
        </div>
    )
}