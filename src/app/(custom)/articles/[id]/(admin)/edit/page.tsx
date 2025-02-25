import { api } from "~/trpc/server";
import { EditArticleForm } from "./_components/edit-article-form";
import { redirect } from "next/navigation";

export default async function EditArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = await api.articleRouter.getEditArticle({ id });

    if (!article) {
        redirect("/dashboard/articles");
    }

    return <EditArticleForm article={article} />;
}