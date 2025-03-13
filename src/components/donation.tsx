import WaterWaqfDonation from "~/app/_components/water-waqf-donation";
import { UpdateWaterDonationDialog } from "./dialogs/update-water-donation-dialog";
import { api } from "~/trpc/react";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import { Button } from "./ui/button";
import { Edit } from "lucide-react";
import { Progress } from "./ui/progress";

export const Donation = () => {
  const [open, setOpen] = useState(false);

  const {
    data: donation,
    isLoading,
    isRefetching,
    isError,
  } = api.waterDonationRouter.getWaterDonation.useQuery(undefined, {
    retry: false,
  });

  const isSkeletonOn = isLoading || isError || !donation || isRefetching;

  return (
    <>
      <div className="px-6">
        <h1 className="mb-6 text-2xl font-bold">Manajemen Donasi Air</h1>

        <div className="rounded-lg bg-card p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Donasi Saat Ini</h2>
            <Button variant="outline" size="icon" onClick={() => setOpen(true)}>
              <Edit />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Jumlah Saat Ini</p>
              {isSkeletonOn ? (
                <span className="flex items-center gap-2">
                  <span>Rp </span>
                  <Skeleton className="h-6 w-20" />
                </span>
              ) : (
                <p className="text-lg font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(donation.amount)}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jumlah Target</p>
              {isSkeletonOn ? (
                <span className="flex items-center gap-2">
                  <span>Rp </span>
                  <Skeleton className="h-6 w-20" />
                </span>
              ) : (
                <p className="text-lg font-medium">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(donation.targetAmount)}
                </p>
              )}
            </div>
          </div>

          {isSkeletonOn ? (
            <>
              <div className="my-4 space-y-2">
                <Skeleton className="h-2 w-full rounded-full" />
                <Skeleton className="h-2 w-24 rounded-full" />
              </div>
              <Skeleton className="h-9 w-full rounded-md" />
            </>
          ) : (
            <>
              <div className="my-4">
                <Progress
                  value={(donation.amount / donation.targetAmount) * 100}
                />
                <p className="mt-1 text-sm text-muted-foreground">
                  {isNaN((donation.amount / donation.targetAmount) * 100)
                    ? 0
                    : Math.min(
                        100,
                        Math.round(
                          (donation.amount / donation.targetAmount) * 100,
                        ),
                      )}
                  % dari target
                </p>
              </div>
              <WaterWaqfDonation isCompleted={donation.isCompleted} />
            </>
          )}
        </div>
      </div>
      {donation && (
        <UpdateWaterDonationDialog
          open={open}
          setOpenAction={setOpen}
          donation={donation}
        />
      )}
    </>
  );
};
