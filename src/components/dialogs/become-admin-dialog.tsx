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
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { becomeAdminSchema } from "~/server/api/schemas/admin-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";

interface BecomeAdminDialogProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

export const BecomeAdminDialog = ({
  open,
  setOpen,
}: BecomeAdminDialogProps) => {
  const isShowPassword = useBoolean(false);
  const { update: updateSession } = useSession();

  const { mutate: becomeAdminMutation, isPending: isBecomeAdminPending } =
    api.adminPasswordRouter.becomeAdmin.useMutation({
      async onSuccess() {
        await updateSession();

        toast.success("Berhasil menjadi admin", {
          description: "Anda sekarang memiliki akses admin",
        });
        form.reset();
        setOpen(false);
      },
      onError(error) {
        toast.error("Gagal menjadi admin", {
          description: error.message,
        });
      },
    });

  const form = useForm<z.infer<typeof becomeAdminSchema>>({
    resolver: zodResolver(becomeAdminSchema),
    defaultValues: {
      password: "",
    }
  });

  function onSubmit(values: z.infer<typeof becomeAdminSchema>) {
    try {
      becomeAdminMutation(values);
    } catch (error) {
      console.error("Gagal Submit", error);
      toast.error("Gagal Submit form, silahkan coba lagi.");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
        setOpen(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Masuk sebagai Admin</DialogTitle>
          <DialogDescription>
            Masukkan password admin untuk mengakses fitur admin
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
                        placeholder="password-admin"
                        type={isShowPassword.value ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        size="icon"
                        onClick={isShowPassword.toggle}
                        variant="ghost"
                        className="absolute right-2 top-0"
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
              <DialogClose asChild disabled={isBecomeAdminPending}>
                <Button type="button" variant="secondary">
                  Batal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isBecomeAdminPending}
              >
                {isBecomeAdminPending && (
                  <LoaderCircle className="size-4 animate-spin" />
                )}
                {isBecomeAdminPending ? "Memproses..." : "Jadi Admin"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
