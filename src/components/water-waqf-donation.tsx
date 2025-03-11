"use client";

import { Button } from "~/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Copy, ExternalLink, HandCoins } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function WaterWaqfDonation() {
  const copyToClipboard = (text: string, label: string) => {
    void navigator.clipboard.writeText(text);
    toast.success("Berhasil disalin!", {
      description: `${label} telah disalin ke clipboard.`,
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="w-full bg-[#009e9b] hover:bg-[#00817f]">
            <HandCoins className="mr-2 size-4" />
            Donasi Sekarang
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-xl font-bold text-sky-700">
              Program Wakaf Sumber Air
            </DrawerTitle>
            <DrawerDescription>
              Bantu saudara kita mendapatkan akses air bersih melalui program
              wakaf sumber air
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-6 p-4">
            <Tabs defaultValue="qris" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="qris">QRIS</TabsTrigger>
                <TabsTrigger value="bank">Transfer Bank</TabsTrigger>
              </TabsList>
              <TabsContent value="qris" className="space-y-4">
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <div className="mb-4 text-center">
                    <p className="mb-1 text-sm text-muted-foreground">
                      Scan QRIS untuk membayar
                    </p>
                  </div>
                  <div className="mb-4 rounded-lg border bg-white p-2">
                    <Image
                      src="https://64ypb33esl.ufs.sh/f/aiYjKPFX5kbYtX4vUrg6gHNVdpbBf7MJiRthy4vIDP8qSF5T"
                      alt="QRIS Code"
                      className="h-48 w-48 object-contain"
                      width={200}
                      height={200}
                    />
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    QRIS dapat dibayar melalui aplikasi e-wallet dan mobile
                    banking
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="bank" className="space-y-4">
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                          <span className="font-bold text-green-600">BSI</span>
                        </div>
                        <div>
                          <p className="font-medium">Bank Syariah Indonesia</p>
                          <p className="text-sm text-muted-foreground">
                            Madina Wakaf
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          copyToClipboard(
                            "7198875966",
                            "Nomor rekening Madina Wakaf",
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded bg-muted p-2">
                      <code className="font-mono text-sm">719 887 5966</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() =>
                          copyToClipboard(
                            "7198875966",
                            "Nomor rekening Madina Wakaf",
                          )
                        }
                      >
                        Salin
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <span className="font-bold text-blue-600">BSI</span>
                        </div>
                        <div>
                          <p className="font-medium">Bank Syariah Indonesia</p>
                          <p className="text-sm text-muted-foreground">
                            Madina Sedekah
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          copyToClipboard(
                            "7198876636",
                            "Nomor rekening Madina Sedekah",
                          )
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between rounded bg-muted p-2">
                      <code className="font-mono text-sm">719 887 6636</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() =>
                          copyToClipboard(
                            "7198876636",
                            "Nomor rekening Madina Sedekah",
                          )
                        }
                      >
                        Salin
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="text-center text-sm text-muted-foreground">
              <p>Setelah melakukan pembayaran, silakan konfirmasi melalui:</p>
              <a
                href="https://wa.link/rcd0jf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center text-sky-600 hover:text-sky-700"
              >
                WhatsApp Admin <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Tutup</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
