"use client";

import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import dayjs from "dayjs";
import { ThumbsUp, Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { type Control } from "react-hook-form";
import { type z } from "zod";
import { MinimalTiptapEditor } from "~/components/minimal-tiptap";
import { Badge } from "~/components/ui/badge";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "~/components/ui/form";
import { isValidUrl } from "~/lib/cheker";
import { nameToFallback } from "~/lib/string";
import { type createArticleSchema } from "~/server/api/schemas/article.schema";

interface CreateArticlePreviewProps {
    control: Control<z.infer<typeof createArticleSchema>, unknown>,
    data: {
        title: string;
        content: string;
        thumbnail: string | undefined;
        views: number;
        isPublished: boolean | undefined;
        likes: number;
    }
}

export const CreateArticlePreview = ({
    control,
    data,
}: CreateArticlePreviewProps) => {
    const { data: session } = useSession();
    const {
        title,
        content,
        thumbnail,
        views,
        isPublished,
        likes,
    } = data;

    return (
        <div className="p-4 flex flex-col gap-4 items-center">
            {isPublished ? (
                <Badge className="bg-green-500 text-white">Published</Badge>
            ) : (
                <Badge className="bg-red-500 text-white">Draft</Badge>
            )}
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {title.trim() === "" ? "Judul artikel" : title}
            </h1>
            <p className="text-sm text-muted-foreground">
                {dayjs().locale('id').format("DD MMMM YYYY • HH:mm")}
            </p>
            {thumbnail && isValidUrl(thumbnail) ? (
                <Image src={thumbnail} alt="thumbnail" width={1920} height={1080} className="w-full rounded-lg" />
            ) : (
                <Image src="https://picsum.photos/1920/1080" alt="thumbnail" width={1920} height={1080} className="w-full rounded-lg" />
            )}
            <div className="flex justify-between w-full">
                {session && (
                    <div className="flex gap-2 items-center">
                        <Avatar className="size-6">
                            <AvatarImage src={session.user.image ?? "https://avatar.iran.liara.run/public"} />
                            <AvatarFallback>
                                {nameToFallback(session.user.name ?? 'Anonymous')}
                            </AvatarFallback>
                        </Avatar>
                        <small className="text-sm font-medium leading-none">{session.user.name}</small>
                    </div>
                )}
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
            <FormField
                control={control}

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
                            />
                        </FormControl>
                        <FormDescription>
                            Konten artikel harus informatif dan mudah dipahami oleh pengguna
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )

}