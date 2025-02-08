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

interface UpdateAdminPasswordDialogProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const UpdateAdminPasswordDialog = ({
    open,
    setOpen,
}: UpdateAdminPasswordDialogProps) => {
    const isShowOldPassword = useBoolean(false);
    const isShowNewPassword = useBoolean(false);
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");

    const utils = api.useUtils();
    const {
        mutate: updateAdminPasswordMutation,
        isPending: updateSetAdminPasswordPending,
    } = api.adminPasswordRouter.updateAdminPassword.useMutation({
        async onSuccess() {
            await utils.adminPasswordRouter.invalidate();

            toast("Password admin berhasil diubah", {
                description: "Gunakan password baru untuk masuk sebagai admin",
                icon: <CircleCheck className="text-green-500 mr-2 size-4" />,
            });
            setOldPassword("");
            setNewPassword("");
            setOpen(false);
        },
        onError(e) {
            const errorMessage = e?.data?.zodError?.fieldErrors?.password?.[0]
                ?? e.message

            toast("Gagal mengubah password admin", {
                description: errorMessage,
                icon: <CircleAlert className="text-red-500 mr-2 size-4" />,
            });
        }
    })

    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (!open) {
                setOldPassword("");
            }
            setOpen(open);
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Ubah Password Admin
                    </DialogTitle>
                    <DialogDescription>
                        Masukkan password lama dan password baru untuk mengubah password admin
                    </DialogDescription>
                </DialogHeader>
                <div className="relative">
                    <Input
                        placeholder="password-lama"
                        type={isShowOldPassword.value ? "text" : "password"}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <Button size="icon" onClick={isShowOldPassword.toggle} variant="ghost" className="absolute top-0 right-2">
                        {isShowOldPassword.value ? <EyeOff /> : <Eye />}
                    </Button>
                </div>
                <div className="relative">
                    <Input
                        placeholder="password-baru"
                        type={isShowNewPassword.value ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <Button size="icon" onClick={isShowNewPassword.toggle} variant="ghost" className="absolute top-0 right-2">
                        {isShowOldPassword.value ? <EyeOff /> : <Eye />}
                    </Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild disabled={updateSetAdminPasswordPending}>
                        <Button type="button" variant="secondary">
                            Batal
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={() => updateAdminPasswordMutation({ oldPassword, newPassword })}
                        disabled={updateSetAdminPasswordPending}
                        type="button"
                    >
                        {updateSetAdminPasswordPending && <LoaderCircle className="size-4 animate-spin" />}
                        {updateSetAdminPasswordPending ? "Memproses..." : "Ubah Password"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}