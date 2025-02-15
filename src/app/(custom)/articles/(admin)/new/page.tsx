"use client";

import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "~/components/ui/resizable";
import {
    toast
} from "sonner"
import { createArticleSchema } from "~/server/api/schemas/article.schema";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { LoaderCircle, PencilLine, X } from "lucide-react";
import { UploadDropzone } from "~/utils/uploadthing";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { type z } from "zod";
import { isValidUrl } from "~/lib/cheker";
import { CreateArticlePreview } from "./_components/creat-article-preview";

export default function NewArticle() {
    const [activeTab, setActiveTab] = useState<"upload" | "link">("upload");
    const router = useRouter();

    const {
        mutate: createArticleMutation,
        isPending: isCreateArticlePending,
    } = api.articleRouter.createArticle.useMutation({
        onSuccess(data) {
            toast.success("Artikel berhasil dibuat", {
                description: data.isPublished ? "Artikel sudah bisa diakses oleh pengguna" : "Artikel berhasil dibuat dan perlu di terbitkan terlebih dahulu",
            });
            form.reset();
            void router.push("/dashboard/articles");
        },
        onError(error) {
            toast.error("Gagal membuat artikel", {
                description: error.message,
            });
        }
    });

    const form = useForm<z.infer<typeof createArticleSchema>>({
        resolver: zodResolver(createArticleSchema),
        defaultValues: {
            title: "",
            content: "",
            isPublished: false,
            thumbnail: "",
            thumbnailKey: "",
        }
    })

    function onSubmit(values: z.infer<typeof createArticleSchema>) {
        try {
            createArticleMutation(values);
        } catch (error) {
            console.error("Gagal Submit", error);
            toast.error("Gagal Submit form, silahkan coba lagi.");
        }
    }

    const {
        mutate: deleteFilesMutation,
        isPending: isDeleteFilesPending,
    } = api.utapiRouter.deleteFiles.useMutation({
        onSuccess(data) {
            toast.success("Gambar berhasil dihapus", {
                description: `Menghapus ${data.deletedCount} gambar`,
            });
            form.setValue("thumbnail", "");
            form.setValue("thumbnailKey", "");
        },
        onError(error) {
            toast.error("Gagal menghapus gambar", {
                description: error.message,
            });
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={30} minSize={20} maxSize={60} className="space-y-6 p-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Judul artikel</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="manfaat membaca alquran"
                                            type="text"
                                            {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Judul artikel harus singkat dan jelas agar mudah dipahami oleh pengguna
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Thumbnail Artikel
                                    </FormLabel>
                                    <Tabs value={activeTab} className="w-full" onValueChange={(value) => {
                                        if (value !== "upload" && form.watch("thumbnailKey")) {
                                            deleteFilesMutation({ ids: form.getValues("thumbnailKey") });
                                            return
                                        } else {
                                            form.setValue("thumbnail", "");
                                            form.setValue("thumbnailKey", "");
                                        }

                                        setActiveTab(value as "upload" | "link");
                                    }}>
                                        <TabsList>
                                            <TabsTrigger value="upload">Upload</TabsTrigger>
                                            <TabsTrigger value="link">Link URL</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="upload">
                                            <FormControl>
                                                {form.watch("thumbnail") && isValidUrl(form.watch("thumbnail")) && form.watch("thumbnailKey") ? (
                                                    <div className="relative">
                                                        <Image src={form.watch("thumbnail")} alt="thumbnail" width={1920} height={1080} className="w-full rounded-lg" />
                                                        <Button
                                                            type="button"
                                                            size="icon"
                                                            disabled={isDeleteFilesPending}
                                                            variant={isDeleteFilesPending ? "secondary" : "destructive"}
                                                            className="absolute top-2 right-2 rounded-full"
                                                            onClick={() => deleteFilesMutation({ ids: form.getValues("thumbnailKey") })}
                                                        >
                                                            {isDeleteFilesPending ?
                                                                <LoaderCircle className="size-4 animate-spin" />
                                                                :
                                                                <X className="size-4" />
                                                            }
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <UploadDropzone
                                                        endpoint="articleUploader"
                                                        onClientUploadComplete={(res) => {
                                                            const file = res[0];

                                                            if (!file) return;

                                                            field.onChange(file.ufsUrl);
                                                            form.setValue("thumbnailKey", file.key);

                                                            toast.success("Image uploaded successfully", {
                                                                description: `${file?.name} (${file?.size})`,
                                                            });
                                                        }}
                                                        onUploadError={(error: Error) => {
                                                            toast.error("Failed to upload image", {
                                                                description: error.message,
                                                            });
                                                        }}
                                                    />
                                                )}
                                            </FormControl>
                                        </TabsContent>
                                        <TabsContent value="link">
                                            <FormControl>
                                                <Input
                                                    placeholder="https://example.com/thumbnail.jpg"
                                                    value={form.watch("thumbnail")}
                                                    onChange={(e) => field.onChange(e.target.value)}
                                                />
                                            </FormControl>
                                        </TabsContent>
                                    </Tabs>
                                    <FormDescription>
                                        Thumbnail artikel harus menarik dan sesuai dengan konten artikel
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isPublished"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel>Terbitkan Artikel</FormLabel>
                                        <FormDescription>jika kamu menerbitkan artikel, maka artikel bisa diakses oleh pengguna</FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={isCreateArticlePending}
                        >
                            {isCreateArticlePending ? <LoaderCircle className="animate-spin size-4" /> : <PencilLine className="size-4" />}
                            {isCreateArticlePending ? "Membuat artikel..." : "Buat Artikel"}
                        </Button>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={70} maxSize={80} minSize={40}>
                        <CreateArticlePreview
                            control={form.control}
                            data={{
                                title: form.watch("title"),
                                content: form.watch("content"),
                                isPublished: form.watch("isPublished"),
                                thumbnail: form.watch("thumbnail"),
                                views: 0,
                                likes: 0,
                            }}
                        />
                    </ResizablePanel>
                </ResizablePanelGroup>
            </form>
        </Form >
    );
}

