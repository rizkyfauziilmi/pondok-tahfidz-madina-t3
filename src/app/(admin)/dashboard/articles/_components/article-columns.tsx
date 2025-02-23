"use client"

import { type ColumnDef } from "@tanstack/react-table"
import { BookLock, Eye, SquarePen, Trash, BookKey, LoaderCircle } from "lucide-react"
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
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import Link from "next/link"
import { Checkbox } from "~/components/ui/checkbox"
import { DataTableColumnHeader } from "~/components/table/data-table-column-header"

export const articleColumns: ColumnDef<ArticleWithUser>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "thumbnail",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Thumbnail" />
        ),
        cell: ({ row }) => {
            const link = row.original.thumbnail

            return <div className="relative w-40 h-24">
                <Image
                    src={link}
                    alt={link}
                    fill
                    quality={100}
                    className="object-cover rounded-md"
                />
            </div>
        }
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Judul" />
        ),
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
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Penulis" />
        ),
        cell: ({ row }) => {
            const author = row.original.author
            return (
                <Badge className="flex items-center gap-2 rounded-full whitespace-nowrap py-1 w-fit" variant="secondary">
                    <Avatar className="size-4">
                        <AvatarImage src={author.image ?? "https://avatar.iran.liara.run/public"} alt={author.name ?? ""} />
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
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            return (
                <div>
                    <IsPublishedBadge isPublished={row.original.isPublished} />
                </div>
            )
        }
    },
    {
        accessorKey: "views",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Dilihat" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="mr-2 size-4" />
                    {row.original.views}
                </div>
            )
        }
    },
    {
        accessorKey: "likes",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Disukai" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="mr-2 size-4" />
                    {row.original.likes}
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Dibuat Pada" />
        ),
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground">
                    {moment(row.original.createdAt as moment.MomentInput).locale("id").fromNow()}
                </div>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Terakhir Diperbarui" />
        ),
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground">
                    {moment(row.original.updatedAt).locale("id").fromNow()}
                </div>
            )
        }
    },
    {
        accessorKey: "publishedAt",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Dipublikasikan Pada" />
        ),
        cell: ({ row }) => {
            return (
                <div className="text-muted-foreground">
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
                            <DropdownMenuItem asChild>
                                <Link href={`/articles/edit/${id}`}>
                                    <SquarePen className="size-4" />
                                    Edit
                                </Link>
                            </DropdownMenuItem>
                            <AlertDialogTrigger disabled={isDeleteLoading} asChild>
                                <DropdownMenuItem>
                                    <Trash className="size-4" />
                                    Hapus
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <DropdownMenuItem onSelect={() => togglePublishArticle({ id, isPublished: !isPublished })} disabled={isTogglePublishLoading}>
                                {isPublished ? <BookLock className="size-4" /> : <BookKey className="size-4" />}
                                {isPublished ? "Batal Publikasikan" : "Publikasikan"}
                            </DropdownMenuItem>
                            {isPublished && (
                                <DropdownMenuItem asChild>
                                    <Link href={`/articles/${id}`}>
                                        <Eye className="size-4" />
                                        Lihat Artikel
                                    </Link>
                                </DropdownMenuItem>
                            )}
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
