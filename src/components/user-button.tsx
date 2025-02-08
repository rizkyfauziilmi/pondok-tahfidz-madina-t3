import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { signIn, signOut, useSession } from "next-auth/react"
import { nameToFallback } from "~/lib/string"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { DoorOpen, FileKey2, KeyRound, ShieldCheck, ShieldMinus, UserRound, Wrench } from "lucide-react"
import { Button } from "./ui/button"
import { api } from "~/trpc/react"

import { useBoolean } from "usehooks-ts"
import { SetAdminPasswordDialog } from "./dialogs/set-admin-password-dialog"
import { BecomeAdminDialog } from "./dialogs/become-admin-dialog"
import { BecomeUserAlertDialog } from "./dialogs/become-user-alert-dialog"
import { UpdateAdminPasswordDialog } from "./dialogs/update-admin-password-dialog"

export const UserButton = () => {
    const [adminPassword] = api.adminPasswordRouter.getCurrent.useSuspenseQuery();
    const { data: session } = useSession();
    const setAdminPSDialog = useBoolean(false);
    const becomeAdminDialog = useBoolean(false);
    const becomeUserAlertDialog = useBoolean(false);
    const updateAdminPasswordDialog = useBoolean(false);

    if (!session) {
        return (
            <Button onClick={() => signIn()} size="sm">
                Masuk
            </Button>
        )
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src={session.user.image ?? "https://avatar.iran.liara.run/public"} />
                        <AvatarFallback>
                            {nameToFallback(session.user.name ?? 'Anonymous')}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <span className="flex items-center">
                            {session.user.isAdmin ? <Wrench className="mr-2 size-4 text-blue-600" /> : <UserRound className="mr-2 size-4" />}
                            {session.user.name}
                        </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {adminPassword ? (
                        session.user.isAdmin ? (
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
                </DropdownMenuContent>
            </DropdownMenu >
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
    )
}