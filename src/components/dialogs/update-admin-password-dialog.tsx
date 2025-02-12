"use client";

import { useBoolean } from "usehooks-ts";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { updateAdminPasswordSchema } from "~/server/api/schemas/admin-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";

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

    const {
        mutate: updateAdminPasswordMutation,
        isPending: updateSetAdminPasswordPending,
    } = api.adminPasswordRouter.updateAdminPassword.useMutation({
        async onSuccess() {
            toast.success("Password admin berhasil diubah", {
                description: "Gunakan password baru untuk masuk sebagai admin",
            });
            form.reset();
            setOpen(false);
        },
        onError(error) {
            toast.error("Gagal mengubah password admin", {
                description: error.message,
            });
        }
    });

    const form = useForm<z.infer<typeof updateAdminPasswordSchema>>({
        resolver: zodResolver(updateAdminPasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        }
    });

    function onSubmit(values: z.infer<typeof updateAdminPasswordSchema>) {
        try {
            updateAdminPasswordMutation(values);
        } catch (error) {
            console.error("Gagal Submit", error);
            toast.error("Gagal Submit form, silahkan coba lagi.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={(open) => {
            if (!open) {
                form.reset();
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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Lama</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="password-lama"
                                                type={isShowOldPassword.value ? "text" : "password"}
                                                {...field}
                                            />
                                            <Button
                                                size="icon"
                                                onClick={isShowOldPassword.toggle}
                                                variant="ghost"
                                                className="absolute top-0 right-2"
                                                type="button"
                                            >
                                                {isShowOldPassword.value ? <EyeOff /> : <Eye />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Baru</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="password-baru"
                                                type={isShowNewPassword.value ? "text" : "password"}
                                                {...field}
                                            />
                                            <Button
                                                size="icon"
                                                onClick={isShowNewPassword.toggle}
                                                variant="ghost"
                                                className="absolute top-0 right-2"
                                                type="button"
                                            >
                                                {isShowNewPassword.value ? <EyeOff /> : <Eye />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild disabled={updateSetAdminPasswordPending}>
                                <Button type="button" variant="secondary">
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={updateSetAdminPasswordPending}
                            >
                                {updateSetAdminPasswordPending && <LoaderCircle className="size-4 animate-spin" />}
                                {updateSetAdminPasswordPending ? "Memproses..." : "Ubah Password"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};