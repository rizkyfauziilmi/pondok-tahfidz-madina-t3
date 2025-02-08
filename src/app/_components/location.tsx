"use client";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { MapPin, MapPinned } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const Location = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div
            id="lokasi"
            className="min-h-screen flex flex-col items-center gap-4 py-12 px-4"
        >
            <div>
                <div className="flex items-center gap-2 justify-center mb-1">
                    <MapPin className="md:size-6 size-0" />
                    <h1 className="md:text-2xl text-lg font-bold">
                        Lokasi Pondok Tahfidz Madina
                    </h1>
                </div>
                <p className="text-center md:text-sm text-xs text-muted-foreground">
                    Jl. Bojong Hilir No.76, Mandalasari, Kec. Cikalong Wetan, Kabupaten
                    Bandung Barat, Jawa Barat 40556
                </p>
            </div>
            <div className="w-5/6 relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.0116258197904!2d107.456204!3d-6.7684356999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6903001315f57b%3A0x838f661d216b27b3!2sPondok%20Pesantren%20Madina!5e0!3m2!1sid!2sid!4v1726213113763!5m2!1sid!2sid"
                    height="450"
                    className={cn(
                        !isLoaded && "animate-pulse bg-gray-300 dark:bg-gray-800",
                        "border-0 dark:backdrop-invert rounded-lg w-full",
                    )}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    onLoad={() => setIsLoaded(true)}
                ></iframe>
                <p className="mt-2 md:text-left text-justify text-sm">
                    Kami berlokasi di Jawa Barat, Indonesia. Pondok Tahfidz Madina adalah
                    tempat yang ideal untuk belajar dan berkembang. Dengan lingkungan yang
                    tenang dan damai, kami berkomitmen untuk memberikan pendidikan terbaik
                    bagi semua santri kami.
                </p>
                <Button
                    className="mt-2 md:w-fit w-full md:absolute top-1 right-2"
                    asChild
                >
                    <Link
                        href="https://maps.app.goo.gl/pDnWMCUWvonJDmdF9?g_st=aw"
                        target="_blank"
                    >
                        <MapPinned className="size-4 mr-2" />
                        Lihat Lokasi di Google Maps
                    </Link>
                </Button>
            </div>
        </div>
    );
};
