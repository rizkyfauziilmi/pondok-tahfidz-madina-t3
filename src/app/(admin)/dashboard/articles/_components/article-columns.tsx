"use client"

import { type ColumnDef } from "@tanstack/react-table"
import {ArrowUpDown, BookLock, Eye, SquarePen, Trash, BookKey, LoaderCircle} from "lucide-react"
import moment from "moment"
import Image from "next/image"
import { IsPublishedBadge } from "~/components/is-published-badge"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { nameToFallback } from "~/lib/string"
import { type ArticleWithUser } from "~/types/article.type"
import { MoreHorizontal } from "lucide-react"

import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {Badge} from "~/components/ui/badge";
import {api} from "~/trpc/react";
import {toast} from "sonner";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export const articleColumns: ColumnDef<ArticleWithUser>[] = [
    {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        cell: ({ row }) => {
            const link = row.original.thumbnail

            return <Image
                src={link}
                alt={link}
                height={200}
                width={200}
                className="rounded-md"
            />
        }
    },
    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Judul
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground line-clamp-2 text-xs">
                    {row.original.title}
                </div>
            )
        },
    },
    {
        accessorKey: "author",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Penulis
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({ row }) => {
            const author = row.original.author
            return (
                <Badge className="flex items-center gap-2 rounded-full whitespace-nowrap py-1" variant="secondary">
                    <Avatar className="size-4">
                        <AvatarImage src={author.image ?? ""} alt={author.name ?? ""} />
                        <AvatarFallback>
                            {nameToFallback(author.name ?? "Anonymous")}
                        </AvatarFallback>
                    </Avatar>
                    <small className="text-xs">{author.name}</small>
                </Badge>
            )
        }
    },
    {
        accessorKey: "isPublished",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-center">
                    <IsPublishedBadge isPublished={row.original.isPublished} />
                </div>
            )
        }
    },
    {
        accessorKey: "views",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Dilihat
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Eye className="mr-2 size-4" />
                    {row.original.views}
                </div>
            )
        }
    },
    {
        accessorKey: "likes",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Disukai
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Eye className="mr-2 size-4" />
                    {row.original.likes}
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Dibuat pada
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground text-center">
                    {moment(row.original.createdAt as moment.MomentInput).locale("id").fromNow()}
                </div>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Diperbarui pada
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground text-center">
                    {moment(row.original.updatedAt).locale("id").fromNow()}
                </div>
            )
        }
    },
    {
        accessorKey: "publishedAt",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Dipublikasikan pada
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground text-center">
                    {row.original.publishedAt ? moment(row.original.publishedAt).locale("id").fromNow() : "-"}
                </div>
            )
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const id = row.original.id
            const isPublished = row.original.isPublished

            const utils = api.useUtils();
            const {
                mutate: togglePublishArticle,
                isPending: isTogglePublishLoading,
            } = api.articleRouter.togglePublishArticle.useMutation({
                async onSuccess(data) {
                    await utils.articleRouter.invalidate();

                    toast.success("Berhasil memperbarui status artikel", {
                        description: data.isPublished ? "Artikel berhasil dipublikasikan" : "Artikel batal dipublikasikan"
                    });
                },
                onError(error) {
                  toast.error("Gagal memperbarui status artikel", {
                        description: error.message
                  });
                }
            })
            const {
                mutate: deleteArticle,
                isPending: isDeleteLoading,
            } = api.articleRouter.deleteArticle.useMutation({
                async onSuccess() {
                    await utils.articleRouter.invalidate();
                    toast.success("Artikel berhasil dihapus");
                },
                onError(error) {
                    toast.error("Gagal menghapus artikel", {
                        description: error.message
                    });
                }
            })

            const isLoading = isTogglePublishLoading || isDeleteLoading;

            // TODO : implement edit article
            return (
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" disabled={isLoading}>
                                {isLoading ? (
                                    <LoaderCircle className="size-4 animate-spin" />
                                    ) : (
                                    <>
                                        <span className="sr-only">
                                            Aksi
                                        </span>
                                        <MoreHorizontal className="h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <SquarePen className="size-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <AlertDialogTrigger asChild disabled={isDeleteLoading}>
                                <DropdownMenuItem>
                                    <Trash className="size-4 mr-2" />
                                    Hapus
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <DropdownMenuItem onSelect={() => togglePublishArticle({ id, isPublished: !isPublished })} disabled={isTogglePublishLoading}>
                                {isPublished ? <BookLock className="size-4 mr-2" /> : <BookKey className="size-4 mr-2" />}
                                {isPublished ? "Batal Publikasikan" : "Publikasikan"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Hapus Artikel
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Apakah Anda yakin ingin menghapus artikel ini? Artikel yang dihapus tidak dapat dikembalikan.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel disabled={isDeleteLoading}>
                                    Batal
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteArticle({ id })} disabled={isDeleteLoading}>
                                    Hapus
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                </AlertDialog>
            )
        },
    },
]
