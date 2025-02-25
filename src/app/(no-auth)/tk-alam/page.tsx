import bannerImage from "~/../public/images/tk-alam-banner.jpg";
import {
    Brain,
    BriefcaseBusiness,
    HandHeart,
    Lightbulb,
    Sprout,
    Users,
} from "lucide-react";
import Image from "next/image";

export default function TkAlamPage() {
    return (
        <div>
            <div className="h-96 relative flex items-center justify-center w-full">
                <Image
                    src={bannerImage}
                    alt="TK Alam"
                    className="object-cover absolute inset-0 h-96 brightness-50"
                    placeholder="blur"
                    priority
                />
                <div className="z-50 text-center">
                    <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight lg:text-5xl">
                        TK Alam
                    </h1>
                    <h2 className="text-xl md:text-3xl text-white font-semibold tracking-tight first:mt-0">
                        &quot;Belajar dari Alam, Membangun Masa Depan&quot;
                    </h2>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 text-white">
                <div className="bg-green-500 border border-green-200 p-4 rounded-lg flex flex-col items-center">
                    <HandHeart className="size-8" />
                    <h3 className=" font-bold">Pengembangan Akhlak</h3>
                    <p className="text-center">
                        Anak-anak belajar akhlak yang baik melalui metode teladan, yaitu
                        guru memberikan contoh akhlak yang baik.
                    </p>
                </div>
                <div className="bg-green-500 border border-green-200 p-4 rounded-lg flex flex-col items-center">
                    <Brain className="size-8" />
                    <h3 className=" font-bold">Pengembangan Logika</h3>
                    <p className="text-center">
                        Anak-anak belajar logika melalui metode action learning, yaitu
                        belajar bersama alam.
                    </p>
                </div>
                <div className="bg-green-500 border border-green-200 p-4 rounded-lg flex flex-col items-center">
                    <Users className="size-8" />
                    <h3 className=" font-bold">Pengembangan Kepemimpinan</h3>
                    <p className="text-center">
                        Anak-anak belajar kepemimpinan melalui metode outbound training.
                    </p>
                </div>
                <div className="bg-green-500 border border-green-200 p-4 rounded-lg flex flex-col items-center">
                    <BriefcaseBusiness className="size-8" />
                    <h3 className=" font-bold">Pengembangan Mental Bisnis</h3>
                    <p className="text-center">
                        Anak-anak belajar mental bisnis melalui metode magang dan belajar
                        dari ahlinya.
                    </p>
                </div>
                <div className="bg-green-500 border border-green-200 p-4 rounded-lg flex flex-col items-center">
                    <Sprout className="size-8" />
                    <h3 className=" font-bold">Memahami Alam dan Lingkungan</h3>
                    <p className="text-center">
                        Anak-anak belajar tentang alam dan lingkungan sekitar, sehingga
                        mereka memahami pentingnya menjaga lingkungan dan keterhubungan
                        manusia dengan alam.
                    </p>
                </div>
                <div className="bg-green-500 border border-green-200 p-4 rounded-lg flex flex-col items-center">
                    <Lightbulb className="size-8" />
                    <h3 className=" font-bold">Kreativitas</h3>
                    <p className="text-center">
                        Anak-anak belajar kreativitas melalui metode bermain, berkreasi, dan
                        berinovasi.
                    </p>
                </div>
            </div>
        </div>
    );
}
