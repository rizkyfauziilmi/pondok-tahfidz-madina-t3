"use client"

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
import { nameToFallback } from "~/lib/string";
import { Eye, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Button } from "~/components/ui/button";

interface ArticleCardProps {
    article: ArticleWithUser;
}

export const ArticleCard = ({ article }: ArticleCardProps) => {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="p-0 pb-4">
                <div className="relative w-full h-48">
                    <Image
                        src={article.thumbnail}
                        alt={article.title}
                        fill
                        quality={100}
                        className="object-cover rounded-t-lg"
                    />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold line-clamp-1">
                    <Link href={`/articles/${article.id}`} className="hover:underline">
                        {article.title}
                    </Link>
                </h2>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={article.author.image ?? "https://avatar.iran.liara.run/public"} alt={article.author.name ?? ""} />
                            <AvatarFallback>
                                {nameToFallback(article.author.name ?? "Anonymous")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col justify-center">
                            <p className="text-sm font-medium">{article.author.name}</p>
                            <p className="text-xs text-muted-foreground">
                                {`dibuat ${moment(article.publishedAt ?? article.createdAt).locale('id').fromNow()}`}
                            </p>
                            {moment(article.createdAt).isSameOrBefore(article.updatedAt) ? null : (
                                <p className="text-xs text-muted-foreground">
                                    {`Terakhir diperbarui ${moment(article.updatedAt).locale('id').fromNow()}`}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2 text-muted-foreground text-sm">
                        <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" /> {article.views}
                        </span>
                        <span className="flex items-center">
                            <ThumbsUp className="w-4 h-4 mr-1" /> {article.likes}
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
    )
}