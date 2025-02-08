"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { Facebook } from "~/components/svgs/facebook-svg";
import { Google } from "~/components/svgs/google-svg";
import { Instagram } from "~/components/svgs/instagram-svg";
import { TiktokIcon } from "~/components/svgs/tiktok-svg";
import { Button } from "~/components/ui/button";

export default function Login() {
    const signInWithProvider = (provider: "google" | "instagram" | "tiktok" | "facebook") => {
        void signIn(provider, { redirectTo: "/" });
    }

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <a
                            href="#"
                            className="flex items-center gap-2 font-medium pointer-events-none"
                        >
                            <Image
                                src="/images/logo.png"
                                alt="logo"
                                width={100}
                                height={100}
                                className="size-10"
                            />
                            <span className="text-md font-semibold opacity-50">
                                Pondok Tahfidz Madina
                            </span>
                        </a>
                        <h1 className="text-xl text-center font-bold">
                            Untuk mengakses konten, silahkan login terlebih dahulu
                        </h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => signInWithProvider("google")}
                        >
                            <Google />
                            Masuk dengan Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => signInWithProvider("facebook")}
                        >
                            <Facebook />
                            Masuk dengan Facebook
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => signInWithProvider("instagram")}
                        >
                            <Instagram />
                            Masuk dengan Instagram
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => signInWithProvider("tiktok")}
                        >
                            <TiktokIcon />
                            Masuk dengan Tiktok
                        </Button>
                    </div>
                </div>
                <div className="mt-4 text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                    Dengan mengklik lanjutkan, Anda setuju dengan <a href="#">Syarat dan Ketentuan</a> kami dan <a href="#">Kebijakan Privasi</a> kami.
                </div>
            </div>
        </div>
    );
}