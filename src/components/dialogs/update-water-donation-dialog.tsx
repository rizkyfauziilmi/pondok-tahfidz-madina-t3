"use client";

import { type z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { LoaderCircle } from "lucide-react";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { updateWaterDonationSchema } from "~/server/api/schemas/water-donation.schema";
import { type WaterDonation } from "@prisma/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect } from "react";

interface UpdateWaterDonationDialogProps {
  open: boolean;
  setOpenAction: (isOpen: boolean) => void;
  donation: WaterDonation;
}

const formatToIDR = (value: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const parseFromIDR = (value: string): number => {
  const cleanValue = value.replace(/[^\d]/g, "");
  return Number.parseInt(cleanValue, 10) || 0;
};

export const UpdateWaterDonationDialog = ({
  open,
  setOpenAction,
  donation,
}: UpdateWaterDonationDialogProps) => {
  const utils = api.useUtils();
  const {
    mutate: updateWaterDonationMutate,
    isPending: isUpdatingWaterDonation,
  } = api.waterDonationRouter.updateWaterDonation.useMutation({
    async onSuccess() {
      setOpenAction(false);
      form.reset();
      await utils.waterDonationRouter.invalidate();
      toast.success("Berhasil memperbarui donasi");
    },
    onError(error) {
      toast.error("Gagal memperbarui donasi", {
        description: error.message,
      });
    },
  });

  const form = useForm<z.infer<typeof updateWaterDonationSchema>>({
    resolver: zodResolver(updateWaterDonationSchema),
    defaultValues: {
      id: donation.id,
      amount: donation.amount,
      targetAmount: donation.targetAmount,
    },
  });

  function onSubmit(values: z.infer<typeof updateWaterDonationSchema>) {
    try {
      updateWaterDonationMutate(values);
    } catch (error) {
      console.error("Gagal Submit", error);
      toast.error("Gagal Submit form, silahkan coba lagi.");
    }
  }

  useEffect(() => {
    form.reset({
      id: donation.id,
      amount: donation.amount,
      targetAmount: donation.targetAmount,
    });
  }, [donation, form]);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          form.reset();
        }
        setOpenAction(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perbarui Donasi Air</DialogTitle>
          <DialogDescription>
            Perbarui detail donasi air Anda, termasuk jumlah dan target donasi.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Donasi Saat Ini</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="IDR 0"
                      value={field.value ? formatToIDR(field.value) : ""}
                      onChange={(e) => {
                        field.onChange(parseFromIDR(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="targetAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah Target Donasi</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="IDR 0"
                      value={field.value ? formatToIDR(field.value) : ""}
                      onChange={(e) => {
                        field.onChange(parseFromIDR(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild disabled={isUpdatingWaterDonation}>
                <Button type="button" variant="secondary">
                  Batal
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isUpdatingWaterDonation}>
                {isUpdatingWaterDonation && (
                  <LoaderCircle className="size-4 animate-spin" />
                )}
                {isUpdatingWaterDonation ? "Memproses..." : "Perbarui"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
