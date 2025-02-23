"use client";

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
import { Cog, LoaderCircle, MoreVertical, PencilLine, X } from "lucide-react";
import { UploadDropzone } from "~/utils/uploadthing";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { api } from "~/trpc/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { type z } from "zod";
import { isValidUrl } from "~/lib/cheker";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "~/components/ui/sheet"
import { ArticleComponent } from "~/components/article";
import { useSession } from "next-auth/react";
import { useBoolean } from "usehooks-ts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import prettyBytes from 'pretty-bytes';
import { cn } from "~/lib/utils";

export const CreateArticleForm = () => {
    const [activeTab, setActiveTab] = useState<"upload" | "link">("upload");
    const router = useRouter();
    const { data: session } = useSession();
    const isSheetOpen = useBoolean(true);

    const {
        mutate: createArticleMutation,
        isPending: isCreateArticlePending,
    } = api.articleRouter.createArticle.useMutation({
        onSuccess(data) {
            toast.success("Artikel berhasil dibuat", {
                description: data.isPublished ? "Artikel sudah bisa diakses oleh pengguna" : "Artikel berhasil dibuat dan perlu di terbitkan terlebih dahulu",
            });
            form.reset();
            if (data.isPublished) {
                void router.push(`/articles/${data.id}`);
            } else {
                void router.push("/dashboard/articles");
            }
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
            thumbnailKey: undefined,
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
            form.setValue("thumbnailKey", undefined);
        },
        onError(error) {
            toast.error("Gagal menghapus gambar", {
                description: error.message,
            });
        }
    });

    const uploadSoonerId = "upload-sooner";
    const isUploading = toast.getToasts().some((toast) => toast.id === uploadSoonerId);

    return (
        <div className="relatives" id="content">
            <Sheet open={isSheetOpen.value} onOpenChange={(open) => {
                // if uploading image prevent from close sheet
                if (isUploading) return;

                isSheetOpen.setValue(open);
            }}>
                <SheetContent side="left" className="h-screen overflow-y-auto space-y-6 w-full md:w-1/2">
                    <SheetHeader>
                        <SheetTitle>
                            Buat Artikel Baru
                        </SheetTitle>
                        <SheetDescription>
                            Artikel baru akan ditambahkan ke dalam daftar artikel
                        </SheetDescription>
                    </SheetHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
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
                                                const thumbnailKey = form.getValues("thumbnailKey");
                                                if (thumbnailKey) {
                                                    deleteFilesMutation({ ids: thumbnailKey });
                                                }
                                                return
                                            } else {
                                                form.setValue("thumbnail", "");
                                                form.setValue("thumbnailKey", undefined);
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
                                                                onClick={() => {
                                                                    const thumbnailKey = form.getValues("thumbnailKey");
                                                                    if (thumbnailKey) {
                                                                        deleteFilesMutation({ ids: thumbnailKey })
                                                                    }
                                                                }}
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
                                                            className={cn(isUploading && "pointer-events-none cursor-not-allowed")}
                                                            endpoint="articleUploader"
                                                            onClientUploadComplete={(res) => {
                                                                const file = res[0];

                                                                if (!file) return;

                                                                form.setValue("thumbnail", file.ufsUrl);
                                                                form.setValue("thumbnailKey", file.key);

                                                                toast.dismiss(uploadSoonerId);
                                                                toast.success("Berhasil mengupload gambar", {
                                                                    description: `${file?.name} (${prettyBytes(file?.size, { locale: true })})`,
                                                                    dismissible: true,
                                                                    duration: 1000
                                                                });
                                                            }}
                                                            onUploadProgress={(progress) => {
                                                                toast.loading("Sedang mengupload gambar", {
                                                                    description: `Progress ${progress}%`,
                                                                    id: uploadSoonerId,
                                                                });
                                                            }}
                                                            onUploadError={(error: Error) => {
                                                                toast.error("Gagal mengupload gambar", {
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

                        </form>
                    </Form >
                </SheetContent>
            </Sheet>
            <ArticleComponent
                form={form}
                article={{
                    author: {
                        name: session?.user?.name ?? "Anonymous",
                        image: session?.user?.image ?? "https://avatar.iran.liara.run/public",
                    },
                    title: form.watch("title"),
                    content: form.watch("content"),
                    isPublished: form.watch("isPublished"),
                    thumbnail: form.watch("thumbnail"),
                    thumbnailKey: form.watch("thumbnailKey") ?? null,
                    id: "",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    views: 0,
                    likes: 0,
                    publishedAt: form.watch("isPublished") ? new Date() : null,
                    authorId: session?.user?.id ?? "",
                }}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="rounded-full bottom-4 right-4 fixed" disabled={isCreateArticlePending}>
                        {isCreateArticlePending ? (
                            <>
                                <LoaderCircle className="animate-spin size-4" />
                                Membuat artikel...
                            </>
                        )
                            : (
                                <>
                                    <MoreVertical className="size-4" />
                                    Tindakan
                                </>
                            )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onSelect={isSheetOpen.toggle}>
                        <Cog className="size-4" />
                        Konfigurasi Artikel
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        disabled={isCreateArticlePending}
                        onSelect={() => {
                            // TODO : handle when form is not valid initially
                            if (form.formState.errors.title || form.formState.errors.thumbnail) {
                                isSheetOpen.setTrue();
                                return;
                            }

                            if (form.formState.errors.content) {
                                const contentElement = document.querySelector("#content");
                                if (contentElement) {
                                    contentElement.scrollIntoView({ behavior: "smooth", block: "end" });
                                }
                                return;
                            }

                            void form.handleSubmit(onSubmit)();
                        }}
                    >
                        {isCreateArticlePending ? <LoaderCircle className="animate-spin size-4" /> : <PencilLine className="size-4" />}
                        {isCreateArticlePending ? "Membuat artikel..." : "Buat Artikel"}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    );
}

