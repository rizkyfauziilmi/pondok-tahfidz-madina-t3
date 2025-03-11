"use client";

import { Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { extractArticleDescription } from "~/lib/string";
import { type ArticleWithUser } from "~/types/article.type";

interface PreviewArticleProps {
  articles: ArticleWithUser[];
}

export const PreviewArticle = ({ articles }: PreviewArticleProps) => {
  const router = useRouter();

  if (articles.length < 3) return null;

  return (
    <div
      id="preview-article"
      className="flex flex-col items-center justify-center px-6 md:my-0 md:min-h-screen md:px-40"
    >
      <h1 className="text-lg font-bold md:text-2xl">Artikel Terkini</h1>
      <div className="relative my-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="flex h-full flex-col">
            <CardHeader className="p-0 pb-4">
              <div className="relative h-48">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  quality={100}
                  className="rounded-t-lg object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <h4 className="line-clamp-1 scroll-m-20 break-words text-xl font-semibold tracking-tight">
                {article.title}
              </h4>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {extractArticleDescription(article.content)}
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="link"
                className="p-0"
                onClick={() => router.push(`/articles/${article.id}`)}
              >
                Baca Selengkapnya
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button asChild>
        <Link href="/articles">
          <Newspaper />
          Lihat lebih banyak artikel
        </Link>
      </Button>
    </div>
  );
};
