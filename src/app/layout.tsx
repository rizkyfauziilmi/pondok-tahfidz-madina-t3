import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/sonner";
import { ThemeProvider } from "~/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { TooltipProvider } from "~/components/ui/tooltip";
import { TopBar } from "./_components/top-bar";
import React from "react";

export const metadata: Metadata = {
  title: "Pondok Tahfidz Madina",
  description: "Pondok Tahfidz Madina",
};

// TODO : improve SEO
export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isAnyArticlePublished =
    await api.articleRouter.getIsAnyArticlePublished();
  const session = await auth();

  if (session?.user) {
    void api.adminPasswordRouter.getCurrent.prefetch();
  }

  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <SessionProvider>
              <TooltipProvider>
                <HydrateClient>
                  <TopBar showArticle={isAnyArticlePublished} />
                </HydrateClient>
                <div className="mt-16">{children}</div>
                <Toaster />
              </TooltipProvider>
            </SessionProvider>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
