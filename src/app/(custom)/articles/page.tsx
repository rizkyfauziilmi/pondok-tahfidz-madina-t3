"use client";

import { ArrowDownAZ, ArrowUpAZ, Newspaper, ServerCrash } from "lucide-react";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import { ArticleCard } from "./_components/article-card";
import { ArticleCardSkeleton } from "./_components/article-card-skeleton";
import { ArticlesError } from "./_components/articles-error";
import { useDebounceCallback } from "usehooks-ts";
import { useState, type ChangeEvent } from "react";
import { useSession } from "next-auth/react";

// TODO : add infinite scroll
export default function Articles() {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "");

    const debouncedSearchChange = useDebounceCallback((value: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (!value) {
            current.delete("search");
        } else {
            current.set("search", value);
        }

        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`);
    }, 500);

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        debouncedSearchChange(value);
    };

    const onSelectChange = (key: string, value: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (!value) {
            current.delete(key);
        } else {
            current.set(key, value);
        }

        const search = current.toString();
        const query = search ? `?${search}` : "";
        router.push(`${pathname}${query}`);
    };

    const { data: articles, isPending, isRefetching, error, refetch } = api.articleRouter.getArticles.useQuery({
        search: searchParams.get("search") ?? "",
        orderBy: searchParams.get("orderBy") as "updatedAt" | "publishedAt" | "title" | "views" | "likes" ?? "publishedAt",
        orderDirection: searchParams.get("orderDirection") as "asc" | "desc" | undefined ?? "desc",
    }, {
        retry: false,
    });

    if (error) {
        const mustCreateArticle = error.data?.code === "NOT_FOUND" && session?.user.isAdmin;

        return <ArticlesError
            title="Terjadi Kesalahan"
            message={mustCreateArticle ? "Anda belum memiliki artikel, silahkan buat artikel atau kelola artikel Anda" : error.message}
            onReset={mustCreateArticle ? () => router.push("/dashboard/articles") : refetch}
            buttonText={mustCreateArticle ? "Kelola Artikel" : "Coba Lagi"}
            icon={<ServerCrash className="h-16 w-16 text-muted-foreground" />}
            iconButton={mustCreateArticle ? <Newspaper className="h-4 w-4 mr-2" /> : null}
        />
    }

    const onReset = () => {
        router.push(pathname);
        setSearchValue("");
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Artikel Pondok</h1>
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <Input
                        value={searchValue}
                        onChange={onSearchChange}
                        type="text"
                        placeholder="Cari artikel..."
                        className="max-w-sm"
                    />
                    <div className="flex items-center gap-4">
                        <Select
                            value={searchParams.get("orderBy") ?? "publishedAt"}
                            onValueChange={(value) => onSelectChange("orderBy", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih berdasarkan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="publishedAt">Tanggal Terbit</SelectItem>
                                <SelectItem value="updatedAt">Tanggal Diperbarui</SelectItem>
                                <SelectItem value="title">Judul</SelectItem>
                                <SelectItem value="views">Jumlah Dilihat</SelectItem>
                                <SelectItem value="likes">Jumlah Disukai</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select
                            value={searchParams.get("orderDirection") ?? "desc"}
                            onValueChange={(value) => onSelectChange("orderDirection", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Pilih urutan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">
                                    <div className="flex items-center">
                                        <ArrowUpAZ className="size-4 mr-2" />
                                        Naik
                                    </div>
                                </SelectItem>
                                <SelectItem value="desc">
                                    <div className="flex items-center">
                                        <ArrowDownAZ className="size-4 mr-2" />
                                        Menurun
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            {
                isPending || isRefetching ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <ArticleCardSkeleton key={index} />
                        ))}
                    </div>
                ) : articles.length === 0 ? <ArticlesError
                    onReset={onReset}
                    buttonText="Reset Pencarian"
                    title="Tidak Ada Hasil"
                    message="Tidak ada artikel yang cocok dengan kriteria pencarian Anda"
                /> : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <ArticleCard key={article.id} article={article} />
                        ))}
                    </div>
                )
            }
        </div>
    )
}