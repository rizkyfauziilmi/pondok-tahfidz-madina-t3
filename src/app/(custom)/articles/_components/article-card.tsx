"use client";

import { type ArticleWithUser } from "~/types/article.type";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import moment from "moment";
import { extractArticleDescription, nameToFallback } from "~/lib/string";
import { Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

interface ArticleCardProps {
  article: ArticleWithUser;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="p-0 pb-4">
        <div className="relative h-48 w-full">
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
        <h2 className="line-clamp-1 break-words text-lg font-semibold">
          <Link href={`/articles/${article.id}`} className="hover:underline">
            {article.title}
          </Link>
        </h2>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {extractArticleDescription(article.content)}
        </p>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={
                  article.author.image ?? "https://avatar.iran.liara.run/public"
                }
                alt={article.author.name ?? ""}
              />
              <AvatarFallback>
                {nameToFallback(article.author.name ?? "Anonymous")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium">{article.author.name}</p>
              <p className="text-xs text-muted-foreground">
                {`dibuat ${moment(article.publishedAt ?? article.createdAt)
                  .locale("id")
                  .fromNow()}`}
              </p>
              {moment(article.createdAt).isSameOrBefore(
                article.updatedAt,
              ) ? null : (
                <p className="text-xs text-muted-foreground">
                  {`Terakhir diperbarui ${moment(article.updatedAt).locale("id").fromNow()}`}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" /> {article.views}
            </span>
            <span className="flex items-center">
              <ThumbsUp className="mr-1 h-4 w-4" /> {article.likes}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/articles/${article.id}`}>Baca</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
