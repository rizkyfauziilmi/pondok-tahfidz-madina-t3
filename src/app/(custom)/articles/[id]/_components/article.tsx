"use client";

import { useEffect } from "react";
import { ArticleComponent } from "~/components/article";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import { LoaderCircle, MoreVertical, SquarePen, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "~/components/ui/dropdown-menu";
import Link from "next/link";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "~/components/ui/alert-dialog";
import { toast } from "sonner";
import { type ArticleWithUser } from "~/types/article.type";
import { useRouter } from "next/navigation";

interface ArticleProps {
    article: ArticleWithUser;
}

export const Article = ({
    article
}: ArticleProps) => {
    const router = useRouter();
    const { data: session } = useSession();
    const isAdmin = session?.user.isAdmin;

    const utils = api.useUtils();
    const { mutate: incrementView } = api.articleRouter.incrementView.useMutation({
        async onSuccess() {
            await utils.articleRouter.invalidate();
        },
    });

    const {
        mutate: deleteArticle,
        isPending: isDeleteLoading,
    } = api.articleRouter.deleteArticle.useMutation({
        async onSuccess() {
            await utils.articleRouter.invalidate();
            toast.success("Artikel berhasil dihapus");
            void router.push("/articles");
        },
        onError(error) {
            toast.error("Gagal menghapus artikel", {
                description: error.message
            });
        }
    })

    useEffect(() => {
        void incrementView({ id: article.id });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative">
            <ArticleComponent article={article} />
            {isAdmin && (
                <AlertDialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline" className="rounded-full bottom-4 right-4 fixed" disabled={isDeleteLoading}>
                                {isDeleteLoading ? (
                                    <LoaderCircle className="animate-spin" />
                                ) :
                                    <MoreVertical />
                                }
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={`/articles/${article.id}/edit`}>
                                    <SquarePen />
                                    Edit Artikel
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <AlertDialogTrigger disabled={isDeleteLoading} asChild>
                                <DropdownMenuItem>
                                    <Trash />
                                    Hapus Artikel
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
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
                            <AlertDialogAction onClick={() => deleteArticle({ id: article.id })} disabled={isDeleteLoading}>
                                Hapus
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            )}
        </div >
    )
}