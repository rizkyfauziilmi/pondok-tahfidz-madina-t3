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
import { useSession } from "next-auth/react";

interface BecomeAdminDialogProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const BecomeAdminDialog = ({
    open,
    setOpen,
}: BecomeAdminDialogProps) => {
    const isShowPassword = useBoolean(false);
    const [password, setPassword] = useState<string>("");
    const { update: updateSession } = useSession();

    const {
        mutate: becomeAdminMutation,
        isPending: isBecomeAdminPending,
    } = api.adminPasswordRouter.becomeAdmin.useMutation({
        async onSuccess() {
            await updateSession();

            toast("Berhasil menjadi admin", {
                description: "Anda sekarang memiliki akses admin",
                icon: <CircleCheck className="text-green-500 mr-2 size-4" />,
            });
            setPassword("");
            setOpen(false);
        },
        onError(e) {
            const errorMessage = e?.data?.zodError?.fieldErrors?.password?.[0]
                ?? e.message

            toast("Gagal menjadi admin", {
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
                        Masuk sebagai Admin
                    </DialogTitle>
                    <DialogDescription>
                        Masukkan password admin untuk mengakses fitur admin
                    </DialogDescription>
                </DialogHeader>
                <div className="relative">
                    <Input
                        placeholder="password-admin"
                        type={isShowPassword.value ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button size="icon" onClick={isShowPassword.toggle} variant="ghost" className="absolute top-0 right-2">
                        {isShowPassword.value ? <EyeOff /> : <Eye />}
                    </Button>
                </div>
                <DialogFooter>
                    <DialogClose asChild disabled={isBecomeAdminPending}>
                        <Button type="button" variant="secondary">
                            Batal
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={() => becomeAdminMutation({ password })}
                        disabled={isBecomeAdminPending}
                        type="button"
                    >
                        {isBecomeAdminPending && <LoaderCircle className="size-4 animate-spin" />}
                        {isBecomeAdminPending ? "Memproses..." : "Jadi Admin"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}