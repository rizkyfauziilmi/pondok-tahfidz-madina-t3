import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MediaSocialDrawer } from "./media-social-drawer";

interface ProgramProps {
    title: string;
    logo?: string;
    link?: string;
    isComponent: boolean;
}

const programList: ProgramProps[] = [
    {
        title: "Belajar Alquran",
        logo: "/images/al-quran.png",
        link: "belajar-quran",
        isComponent: false,
    },
    {
        title: "TK Alam",
        logo: "/images/tk-alam.png",
        link: "tk-alam", isComponent: false
    },
    { title: "Santri Mandiri", logo: "/images/logo.png", link: "santri-mandiri", isComponent: false },
    {
        title: "Sedekah Air",
        logo: "/images/sumur-air.png",
        link: "sedekah-air",
        isComponent: false,
    },
    {
        title: "Artikel Pondok",
        logo: "/images/wirausaha-pondok.png",
        link: "articles",
        isComponent: false,
    },
    {
        title: "Media Sosial",
        isComponent: true,
    },
];

const Program = ({ title, logo, link, isComponent }: ProgramProps) => {
    if (link && !isComponent) {
        return (
            <Link href={link}>
                <div className="flex flex-col h-28 md:h-fit hover:shadow-2xl shadow-primary group transition-all duration-300 cursor-pointer border-[#f7af2e] justify-center items-center border-[1px] rounded-xl p-4">
                    <Image
                        src={logo ?? ""}
                        alt={`logo-${title}`}
                        className="md:size-14 size-10"
                        width={100}
                        height={100}
                    />
                    <p className="md:text-sm text-xs font-semibold group-hover:text-[#f7af2e]">
                        {title}
                    </p>
                </div>
            </Link>
        );
    }

    if (isComponent) {
        return <MediaSocialDrawer title={title} />;
    }
};

export const Programs = () => {
    return (
        <div
            id="program-pondok"
            className="rounded-t-lg p-4 w-full md:w-fit -mt-12 z-20 relative bg-background mx-auto"
        >
            <div className="flex flex-col gap-4">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                    Program Pondok
                </h3>
                <div className="grid md:grid-cols-6 gap-4 text-center grid-cols-3">
                    {programList.map((program) => (
                        <Program key={program.title} {...program} />
                    ))}
                </div>
            </div>
        </div>
    );
};
