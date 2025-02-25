import { api } from "~/trpc/server";
import { Article } from "../_components/article";
import { redirect } from "next/navigation";

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const article = await api.articleRouter.getArticle({ id });

    if (!article) {
        redirect("/articles");
    }

    return <Article article={article} />;
}