"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArticleComponent } from "~/components/article";
import { api } from "~/trpc/react";
import { ArticleSkeleton } from "./_components/article-skeleton";

// TODO : add delete and update button for admin
export default function ArticlePage() {
    const params = useParams<{
        id: string;
    }>()
    const router = useRouter();

    const utils = api.useUtils();
    const {
        data: article,
        isPending,
        error,
    } = api.articleRouter.getArticle.useQuery({ id: params.id });
    const { mutate: incrementView, isPending: incrementViewPending } = api.articleRouter.incrementView.useMutation({
        async onSuccess() {
            await utils.articleRouter.invalidate();
        },
    });

    useEffect(() => {
        if (params.id) {
            void incrementView({ id: params.id });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    if (isPending || incrementViewPending) {
        return <ArticleSkeleton />
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    // Redirect to articles page if article not found
    if (!article) {
        router.push("/articles");
        return null;
    }

    return <ArticleComponent article={article} />
}