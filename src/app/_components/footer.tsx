import Link from "next/link";
import { BaselineFacebook } from "~/components/svgs/facebook-svg-muted";
import { BaselineInstagram } from "~/components/svgs/instagram-svg-muted";
import { BaselineWhatsapp } from "~/components/svgs/whatsapp-svg-muted";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export const Footer = () => {
  return (
    <footer
      className="flex flex-col gap-6 bg-card p-4 md:items-center md:justify-between md:gap-12 md:px-24 md:py-14"
      id="footer"
    >
      <div className="flex flex-col gap-16 md:flex-row md:gap-12">
        <div className="flex-1">
          <div className="text-lg font-semibold">Pondok Tahfidz Madina</div>
          <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
            Membentuk generasi Qur&apos;ani yang berakhlak mulia dan berwawasan
            luas
          </p>
        </div>
        <div className="w-72">
          <div className="mb-6 text-lg font-semibold">Kontak</div>
          <Button asChild>
            <Link href="https://wa.link/rcd0jf" target="_blank">
              <BaselineWhatsapp />
              +6287825530191
            </Link>
          </Button>
        </div>
        <div className="flex-1">
          <div className="mb-6 text-lg font-semibold">Social Media</div>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link
                href="https://www.facebook.com/kang.saepudin.75"
                target="_blank"
              >
                <BaselineFacebook />
                Facebook
              </Link>
            </Button>
            <Button asChild>
              <Link
                href="https://www.instagram.com/tahfidzmadinabdg"
                target="_blank"
              >
                <BaselineInstagram />
                Instagram
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <Separator className="opacity-50" />
      <p className="text-center text-sm text-muted-foreground">
        © 2025 Pondok Tahfidz Madina. Hak cipta dilindungi.
      </p>
    </footer>
  );
};
