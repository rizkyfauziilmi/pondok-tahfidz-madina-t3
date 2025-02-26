"use client";

import { IsPublishedBadge } from "~/components/is-published-badge";
import moment from "moment/moment";
import { isValidUrl } from "~/lib/cheker";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { nameToFallback } from "~/lib/string";
import { Eye, ThumbsUp } from "lucide-react";
import { MinimalTiptapEditor } from "~/components/minimal-tiptap";
import { type ArticleWithUser } from "~/types/article.type";
import { type UseFormReturn } from "react-hook-form";
import { type z } from "zod";
import { type createArticleSchema } from "~/server/api/schemas/article.schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { useSession } from "next-auth/react";

interface ArticleProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form?: UseFormReturn<z.infer<typeof createArticleSchema>, any, undefined>;
    article: ArticleWithUser;
}

export const ArticleComponent = ({ article, form }: ArticleProps) => {
    const { title, content, thumbnail, views, isPublished, likes, author, createdAt, updatedAt, publishedAt } = article;
    const { data: session } = useSession();

    const isAdmin = session?.user.isAdmin;

    return (
        <div className="p-4 flex flex-col gap-4 mt-12 items-center max-w-4xl mx-auto">
            {isAdmin && (
                <IsPublishedBadge isPublished={isPublished ?? false} />
            )}
            {/* prevent h1 to overflow */}
            <div className="w-full break-words">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
                    {title.trim() === "" ? "Judul artikel" : title}
                </h1>
            </div>
            <div className="text-sm text-muted-foreground">
                {!form ? (
                    <div className="flex items-center justify-center">
                        <p>
                            {`dibuat ${moment(publishedAt ?? createdAt).locale('id').fromNow()}`}
                        </p>
                        {moment(createdAt).isSameOrBefore(updatedAt) ? null : (
                            <>
                                <span className="mx-2">•</span>
                                <p>
                                    {`Terakhir diperbarui ${moment(updatedAt).locale('id').fromNow()}`}
                                </p>
                            </>
                        )}
                    </div>
                ) : moment().locale('id').fromNow()}
            </div>
            <div className="w-full h-56 md:h-96 mb-6 relative">
                {thumbnail && isValidUrl(thumbnail) ? (
                    <Image src={thumbnail} alt="thumbnail" fill quality={100} priority className="rounded-lg my-6" />
                ) : (
                    <Image src="https://picsum.photos/1920/1080" alt="thumbnail" fill quality={100} className="rounded-lg my-6" />
                )}
            </div>
            <div className="flex justify-between w-full">
                <div className="flex gap-2 items-center">
                    <Avatar className="size-6">
                        <AvatarImage src={author.image ?? "https://avatar.iran.liara.run/public"} />
                        <AvatarFallback>
                            {nameToFallback(author.name ?? 'Anonymous')}
                        </AvatarFallback>
                    </Avatar>
                    <small className="text-sm font-medium leading-none">{author.name}</small>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex gap-4 items-center text-muted-foreground">
                        <ThumbsUp className="size-4" />
                        <span className="text-sm">{likes}</span>
                    </div>
                    <div className="flex gap-4 items-center text-muted-foreground">
                        <Eye className="size-4" />
                        <span className="text-sm">{views}</span>
                    </div>
                </div>
            </div>
            {form ? (
                <Form {...form}>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Konten Artikel
                                </FormLabel>
                                <FormControl>
                                    <MinimalTiptapEditor
                                        value={content}
                                        onChange={(value) => field.onChange(value)}
                                        className="w-full"
                                        editorContentClassName="p-5"
                                        output="html"
                                        placeholder="Tulis artikel disini..."
                                        autofocus={true}
                                        editable={true}
                                        editorClassName="focus:outline-none"
                                        immediatelyRender={false}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Konten artikel harus informatif dan mudah dipahami oleh pengguna
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Form>
            ) : (
                <MinimalTiptapEditor
                    content={content}
                    className="w-full"
                    autofocus={false}
                    editable={false}
                    immediatelyRender={false}
                />
            )}
        </div>
    );
}