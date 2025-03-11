"use client";

import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
  SheetFooter,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";
import { useSidebarStore } from "~/stores/sidebar-store";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserButton } from "~/components/user-button";
import { ModeToggle } from "~/components/mode-toggle";
import { useSession } from "next-auth/react";

interface TopBarProps {
  showArticle?: boolean;
}

interface dataLinkType {
  title: string;
  link?: string;
  id?: string;
}

export const TopBar = ({ showArticle = false }: TopBarProps) => {
  const { isOpen, setIsOpen } = useSidebarStore();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const dataLink: dataLinkType[] = [
    { title: "Beranda", link: "/" },
    { title: "Artikel", id: "preview-article" },
    { title: "Lokasi", id: "lokasi" },
    { title: "Tentang", id: "footer" },
  ];

  const RenderLink = ({
    data,
    isSheet = false,
  }: {
    data: dataLinkType;
    isSheet?: boolean;
  }) => {
    if (!data || (data.id === "preview-article" && !showArticle)) return null;
    return (
      <p
        className={cn(
          isSheet ? "text-primary" : "text-white",
          "cursor-pointer font-semibold hover:text-[#f7af2e]",
        )}
        onClick={() => {
          router.push(data.id ? `#${data.id}` : (data.link ?? "/"));
          setIsOpen(false);
        }}
      >
        {data.title}
      </p>
    );
  };

  const isUserLoggedIn = !!session;

  const currentPath = pathname?.split("/")[1] ?? "";
  const isNotShow = ["dashboard"].includes(currentPath);

  if (isNotShow) return null;

  return (
    <div className="overflow-visible">
      <div className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between gap-4 bg-[#009e9b] px-3 py-2 md:gap-0 md:px-20">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="logo"
              className="size-10 md:size-14 xl:bg-transparent"
              width={100}
              height={100}
            />
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold tracking-tight text-white md:text-2xl">
                Pondok Tahfidz Madina
              </h3>
              <small className="text-xs font-semibold leading-none text-[#ffd486] md:text-sm">
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
              className="flex bg-transparent text-white shadow-none hover:bg-transparent hover:text-white hover:shadow-none"
              onClick={() => setIsOpen(true)}
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] overflow-auto sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Menu navigasi untuk memudahkan Anda dalam menjelajahi website
                kami.
              </SheetDescription>
            </SheetHeader>
            <div className="mb-2 flex flex-col gap-4">
              {dataLink.map((data) => (
                <RenderLink data={data} key={data.id ?? data.link} isSheet />
              ))}
            </div>
            <SheetFooter className="items-center">
              {!isUserLoggedIn && <ModeToggle />}
              <UserButton />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
