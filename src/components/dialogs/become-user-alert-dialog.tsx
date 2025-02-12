import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "~/components/ui/alert-dialog"
import { api } from "~/trpc/react";

interface BecomeUserAlertDialogProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const BecomeUserAlertDialog = ({
    open,
    setOpen,
}: BecomeUserAlertDialogProps) => {
    const { update: updateSession } = useSession();

    const {
        mutate: becomeUserMutation,
        isPending: isBecomeUserPending,
    } = api.adminPasswordRouter.becomeUser.useMutation({
        async onSuccess() {
            await updateSession();

            toast.success("Sukses keluar dari mode admin", {
                description: "Anda sekarang tidak lagi memiliki akses admin",
            });
            setOpen(false);
        },
        onError(e) {
            const errorMessage = e?.data?.zodError?.fieldErrors?.password?.[0]
                ?? e.message
                ?? "Terjadi kesalahan, silahkan coba lagi";

            toast.error("Gagal keluar dari mode admin", {
                description: errorMessage,

            });
        }
    })
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apakah Anda yakin ingin keluar dari mode admin?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Anda akan kehilangan akses ke fitur admin, dan harus memasukkan password admin lagi untuk masuk sebagai admin.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isBecomeUserPending}
                    >
                        Batal
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => becomeUserMutation()}
                        disabled={isBecomeUserPending}
                    >
                        {isBecomeUserPending && <LoaderCircle className="size-4 animate-spin" />}
                        {isBecomeUserPending ? "Memproses..." : "Ya, keluar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}