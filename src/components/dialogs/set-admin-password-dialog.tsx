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
import { setAdminPasswordSchema } from "~/server/api/schemas/admin-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";

interface SetAdminPasswordDialogProps {
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const SetAdminPasswordDialog = ({
    open,
    setOpen,
}: SetAdminPasswordDialogProps) => {
    const isShowPassword = useBoolean(false);
    const form = useForm<z.infer<typeof setAdminPasswordSchema>>({
        resolver: zodResolver(setAdminPasswordSchema),
        defaultValues: {
            password: "",
        }
    });

    const utils = api.useUtils();
    const {
        mutate: setAdminPasswordMutation,
        isPending: isSetAdminPasswordPending,
    } = api.adminPasswordRouter.setPassword.useMutation({
        async onSuccess() {
            await utils.adminPasswordRouter.invalidate();

            toast.success("Password admin berhasil diatur", {
                description: "Jadi admin sekarang untuk menggunakan fitur admin",
            });
            form.reset();
            setOpen(false);
        },
        onError(error) {
            toast.error("Gagal mengatur password admin", {
                description: error.message,
            });
        }
    });


    function onSubmit(values: z.infer<typeof setAdminPasswordSchema>) {
        try {
            setAdminPasswordMutation(values);
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
                        Setel Password Admin
                    </DialogTitle>
                    <DialogDescription>
                        Password admin belum diatur, silahkan atur password admin terlebih dahulu. Pastikan password admin minimal 8 karakter dan kombinasi huruf dan angka.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                placeholder="sangat-rahasia"
                                                type={isShowPassword.value ? "text" : "password"}
                                                {...field}
                                            />
                                            <Button
                                                size="icon"
                                                onClick={isShowPassword.toggle}
                                                variant="ghost"
                                                className="absolute top-0 right-2"
                                                type="button"
                                            >
                                                {isShowPassword.value ? <EyeOff /> : <Eye />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <DialogClose asChild disabled={isSetAdminPasswordPending}>
                                <Button type="button" variant="secondary">
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={isSetAdminPasswordPending}
                            >
                                {isSetAdminPasswordPending && <LoaderCircle className="size-4 animate-spin" />}
                                {isSetAdminPasswordPending ? "Memproses..." : "Setel"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};