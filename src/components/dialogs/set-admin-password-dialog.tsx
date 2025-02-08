"use client";

import { useState } from "react";
import { useBoolean } from "usehooks-ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog"
import { CircleAlert, CircleCheck, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner"
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface SetAdminPasswordDialogProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const SetAdminPasswordDialog = ({
    open,
    setOpen,
}: SetAdminPasswordDialogProps) => {
    const isShowPassword = useBoolean(false);
    const [password, setPassword] = useState<string>("");

    const utils = api.useUtils();
    const {
        mutate: setAdminPasswordMutation,
        isPending: isSetAdminPasswordPending,
    } = api.adminPasswordRouter.setPassword.useMutation({
        async onSuccess() {
            await utils.adminPasswordRouter.invalidate();

            toast("Password admin berhasil diatur", {
                description: "Jadi admin sekarang untuk menggunakan fitur admin",
                icon: <CircleCheck className="text-green-500 mr-2 size-4" />,
            });
            setPassword("");
            setOpen(false);
        },
        onError(e) {
            const errorMessage = e?.data?.zodError?.fieldErrors?.password?.[0]
                ?? e.message

            toast("Gagal mengatur password admin", {
                description: errorMessage,
                icon: <CircleAlert className="text-red-500 mr-2 size-4" />,
            });
        }
    })

    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (!open) {
                setPassword("");
            }
            setOpen(open);
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Setel Password Admin
                    </DialogTitle>
                    <DialogDescription>
                        Password admin belum diatur, silahkan atur password admin terlebih dahulu. Pastikan password admin minimal 8 karakter dan kombinasi huruf dan angka.
                    </DialogDescription>
                </DialogHeader>
                <div className="relative">
                    <Input
                        placeholder="sangat-rahasia"
                        type={isShowPassword.value ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button size="icon" onClick={isShowPassword.toggle} variant="ghost" className="absolute top-0 right-2">
                        {isShowPassword.value ? <EyeOff /> : <Eye />}
                    </Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild disabled={isSetAdminPasswordPending}>
                        <Button type="button" variant="secondary">
                            Batal
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={() => setAdminPasswordMutation({ password })}
                        disabled={isSetAdminPasswordPending}
                        type="button"
                    >
                        {isSetAdminPasswordPending && <LoaderCircle className="size-4 animate-spin" />}
                        {isSetAdminPasswordPending ? "Memproses..." : "Setel"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}