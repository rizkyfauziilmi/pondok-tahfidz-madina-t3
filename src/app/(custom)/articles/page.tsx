"use client";

import { SearchX } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react"

export default function Articles() {
    const { data, isPending, error } = api.articleRouter.getArticles.useQuery()

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    return <div>{data.length === 0 ?
        <ArticlesNotFound /> :
        data.map(article => (
            <div key={article.id}>
                <h2>{article.title}</h2>
                <p>{article.updatedAt.toString()}</p>
            </div>
        ))
    }</div>
}

const ArticlesNotFound = () => {
    const { data: session } = useSession()

    const isAdmin = session?.user.isAdmin;

    return (
        <div className="flex gap-4 justify-center items-center h-[80vh]">
            <SearchX className="size-20 text-muted-foreground" />
            <div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Tidak ada artikel yang ditemukan
                </h3>
                <p className="text-sm text-muted-foreground">
                    {isAdmin ? 'Silakan tambahkan artikel baru' : 'Silakan hubungi admin untuk menambahkan artikel baru'}
                </p>
                {isAdmin && <Button asChild className="mt-2">
                    <Link href="/articles/new">
                        Tambah Artikel
                    </Link>
                </Button>}
            </div>
        </div>
    )
}