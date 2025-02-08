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
} from "~/components/ui/drawer";
import { Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Instagram } from "~/components/svgs/instagram-svg";
import { Facebook } from "~/components/svgs/facebook-svg";
import { WhatsappIcon } from "~/components/svgs/whatsapp-svg";

interface MediaSocialDrawerProps {
    title: string;
}

export const MediaSocialDrawer = ({ title }: MediaSocialDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="flex flex-col h-28 md:h-fit hover:shadow-2xl shadow-primary group transition-all duration-300 cursor-pointer border-[#f7af2e] justify-center items-center border-[1px] rounded-xl p-4"
            >
                <Share2 className="md:size-14 size-10" />
                <p className="md:text-sm text-xs font-semibold group-hover:text-[#f7af2e]">
                    {title}
                </p>
            </div>
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>Lebih dekat dengan kami di media sosial</DrawerTitle>
                            <DrawerDescription>
                                Ikuti kami di media sosial untuk mendapatkan informasi terbaru
                                seputar program kami.
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex flex-col items-start space-y-4">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link
                                        href="https://www.facebook.com/kang.saepudin.75"
                                        target="_blank"
                                    >
                                        <Facebook className="size-4 mr-2" />
                                        Facebook
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link href="https://wa.link/rcd0jf" target="_blank">
                                        <WhatsappIcon className="size-4 mr-2" />
                                        WhatsApp
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    asChild
                                >
                                    <Link
                                        href="https://www.instagram.com/tahfidzmadinabdg"
                                        target="_blank"
                                    >
                                        <Instagram className="size-4 mr-2" />
                                        Instagram
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                                <Button variant="outline">Tutup</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </>
    );
};
