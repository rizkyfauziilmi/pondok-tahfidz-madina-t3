"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { nameToFallback } from "~/lib/string";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  DoorOpen,
  FileKey2,
  KeyRound,
  Monitor,
  Moon,
  PanelsTopLeft,
  ShieldCheck,
  ShieldMinus,
  Sun,
} from "lucide-react";
import { Button } from "./ui/button";
import { api } from "~/trpc/react";

import { useBoolean } from "usehooks-ts";
import { SetAdminPasswordDialog } from "./dialogs/set-admin-password-dialog";
import { BecomeAdminDialog } from "./dialogs/become-admin-dialog";
import { BecomeUserAlertDialog } from "./dialogs/become-user-alert-dialog";
import { UpdateAdminPasswordDialog } from "./dialogs/update-admin-password-dialog";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export const UserButton = () => {
  const [adminPassword] = api.adminPasswordRouter.getCurrent.useSuspenseQuery(
    undefined,
    {
      retry: false,
    },
  );
  const { data: session } = useSession();
  const setAdminPSDialog = useBoolean(false);
  const becomeAdminDialog = useBoolean(false);
  const becomeUserAlertDialog = useBoolean(false);
  const updateAdminPasswordDialog = useBoolean(false);
  const router = useRouter();
  const { setTheme, theme: currentTheme } = useTheme();

  const themeIconMap = {
    dark: <Moon />,
    light: <Sun />,
    system: <Monitor />,
  };

  if (!session) {
    return (
      <Button onClick={() => signIn()} size="sm">
        Masuk
      </Button>
    );
  }

  const isAdmin = session.user.isAdmin;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="justify-start px-2 md:justify-between"
            variant="outline"
          >
            <div className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage
                  src={
                    session.user.image ?? "https://avatar.iran.liara.run/public"
                  }
                />
                <AvatarFallback>
                  {nameToFallback(session.user.name ?? "Anonymous")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{session.user.name}</span>
            </div>
            {isAdmin ? (
              <Badge variant="admin">Admin</Badge>
            ) : (
              <Badge>Pengguna</Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Avatar className="size-6">
                <AvatarImage
                  src={
                    session.user.image ?? "https://avatar.iran.liara.run/public"
                  }
                />
                <AvatarFallback>
                  {nameToFallback(session.user.name ?? "Anonymous")}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <small className="text-sm font-medium leading-none">
                  {session.user.name}
                </small>
                {isAdmin ? (
                  <Badge variant="admin">Admin</Badge>
                ) : (
                  <Badge>Pengguna</Badge>
                )}
              </div>
            </DropdownMenuItem>
            {adminPassword ? (
              isAdmin ? (
                <>
                  <DropdownMenuItem onSelect={updateAdminPasswordDialog.toggle}>
                    <FileKey2 className="mr-2 size-4" />
                    Ubah Password Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={becomeUserAlertDialog.toggle}>
                    <ShieldMinus className="mr-2 size-4" />
                    Jadi Pengguna
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onSelect={becomeAdminDialog.toggle}>
                  <ShieldCheck className="mr-2 size-4" />
                  Jadi Admin
                </DropdownMenuItem>
              )
            ) : (
              <DropdownMenuItem onSelect={setAdminPSDialog.toggle}>
                <KeyRound className="mr-2 size-4" />
                Setel Password Admin
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onSelect={() => signOut()}>
              <DoorOpen className="mr-2 size-4" />
              Keluar
            </DropdownMenuItem>
          </DropdownMenuGroup>
          {isAdmin && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Menu Admin</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => router.push("/dashboard")}>
                  <PanelsTopLeft className="size-4" />
                  Admin Dashboard
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Tambahan</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <DropdownMenuItem className="p-0">
                  {themeIconMap[currentTheme as "dark" | "light" | "system"]}
                  Ganti Tema
                </DropdownMenuItem>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onSelect={() => setTheme("light")}>
                    <Sun className="mr-2 size-4" />
                    Terang
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setTheme("dark")}>
                    <Moon className="mr-2 size-4" />
                    Gelap
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setTheme("system")}>
                    <Monitor className="mr-2 size-4" />
                    Sistem
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <SetAdminPasswordDialog
        open={setAdminPSDialog.value}
        setOpen={setAdminPSDialog.setValue}
      />
      <BecomeAdminDialog
        open={becomeAdminDialog.value}
        setOpen={becomeAdminDialog.setValue}
      />
      <BecomeUserAlertDialog
        open={becomeUserAlertDialog.value}
        setOpen={becomeUserAlertDialog.setValue}
      />
      <UpdateAdminPasswordDialog
        open={updateAdminPasswordDialog.value}
        setOpen={updateAdminPasswordDialog.setValue}
      />
    </>
  );
};
