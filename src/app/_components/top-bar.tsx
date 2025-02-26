"use client";

import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
import { useSidebarStore } from "~/stores/sidebar-store";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "~/components/user-button";

interface dataLinkType {
    title: string;
    link?: string;
    id?: string;
}

export const TopBar = () => {
    const { isOpen, setIsOpen } = useSidebarStore();
    const router = useRouter();
    const pathname = usePathname();

    const dataLink: dataLinkType[] = [
        { title: "Beranda", link: "/" },
        { title: "Program", id: "program-pondok" },
        { title: "Lokasi", id: "lokasi" },
    ];

    const scrollToElementWithId = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const RenderLink = ({ data, isSheet = false }: { data: dataLinkType; isSheet?: boolean }) => (
        <p
            className={cn(isSheet ? "text-primary" : "text-white", "font-semibold hover:text-[#f7af2e] cursor-pointer")}
            onClick={() => {
                if (data.id) scrollToElementWithId(data.id);
                if (data.link) router.push(data.link);
                setIsOpen(false);
            }}
        >
            {data.title}
        </p>
    );

    const currentPath = (pathname?.split("/")[1]) ?? "";

    const isNotShow = ["dashboard"].includes(currentPath);

    if (isNotShow) return null;

    return (
        <div className="py-2 px-3 md:px-20 bg-[#009e9b] gap-4 md:gap-0 flex items-center justify-between">
            <Link href="/">
                <div className="flex items-center gap-2">
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        className="md:size-14 size-10 xl:bg-transparent"
                        width={100}
                        height={100}
                    />
                    <div className="flex flex-col">
                        <h3 className="md:text-2xl text-lg font-semibold tracking-tight text-white">
                            Pondok Tahfidz Madina
                        </h3>
                        <small className="md:text-sm text-xs leading-none text-[#ffd486] font-semibold">
                            Kec Cikalong Wetan, Kab Bandung Barat Jawa Barat 40556
                        </small>
                    </div>
                </div>
            </Link>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="bg-transparent shadow-none text-white flex md:hidden hover:bg-transparent hover:text-white hover:shadow-none"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <div className="flex flex-col h-full">
                        <div className="flex-1">
                            <SheetHeader>
                                <SheetTitle>
                                    Menu
                                </SheetTitle>
                                <SheetDescription>
                                    Menu navigasi untuk memudahkan Anda dalam menjelajahi website kami.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 pt-4">
                                {dataLink.map((data) => (
                                    <RenderLink data={data} key={data.id ?? data.link} isSheet />
                                ))}
                            </div>
                        </div>
                        <UserButton />
                    </div>
                </SheetContent>
            </Sheet>
            <div className="items-center gap-8 hidden md:flex">
                {dataLink.map((data) => (
                    <RenderLink data={data} key={data.id ?? data.link} />
                ))}
                <UserButton />
            </div>
        </div>
    );
};
