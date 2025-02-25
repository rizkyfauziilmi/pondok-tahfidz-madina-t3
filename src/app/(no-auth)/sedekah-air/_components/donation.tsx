import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { Separator } from "~/components/ui/separator";
import { HandCoins } from "lucide-react";

export const Donation = () => {
  const terkumpul = 1_000_000;
  const target = 10_000_000;

  const progress = (terkumpul / target) * 100;

  return (
    <div className="rounded-md shadow-2xl dark:border-[1px]">
      <div className="p-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Proses Donasi
        </h4>
        <p className="text-muted-foreground text-sm">
          Sedekah Air Pondok Tahfidz Madina
        </p>
      </div>
      <Separator />
      <div className="p-4 space-y-2">
        <div className="p-4 border-[1px] rounded-md space-y-4">
          <p className="text-sm">
            <strong>
              Jumlah Donasi yang sudah terkumpul:{" "}
              {Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(terkumpul)}
            </strong>{" "}
            dari target{" "}
            {Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(target)}{" "}
            <span className="text-muted-foreground">
              {`(${progress.toFixed(0)}%)`}
            </span>
          </p>
          <Progress value={progress} />
        </div>
        <Button className="w-full bg-[#009e9b] hover:bg-[#00817f]">
          <HandCoins className="size-4 mr-2" />
          Donasi Sekarang
        </Button>
      </div>
    </div>
  );
};
