import banner from "~/../public/images/belajar-ngaji-banner.jpeg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import Image from "next/image";

export default function BelajarQuranPage() {
    return (
        <div className="md:p-24 p-4 space-y-8">
            <div className="flex md:flex-row flex-col justify-center gap-4">
                <Image
                    src={banner}
                    alt="Belajar Ngaji"
                    priority
                    placeholder="blur"
                    className="rounded-xl shadow-xl w-full object-cover"
                />
                <div>
                    <h3 className="scroll-m-20 pb-2 text-muted-foreground/80 text-center text-xl md:text-2xl font-semibold tracking-tight">
                        Belajar Al-Quran
                    </h3>
                    <p className="text-center text-lg text-muted-foreground">
                        Mempelajari Al-Quran sangat penting bagi umat Islam. Al-Quran adalah
                        pedoman hidup yang harus diikuti oleh setiap Muslim. Dengan
                        mempelajari Al-Quran, kita akan lebih mengenal ajaran Islam dan
                        dapat menjalankan ibadah dengan benar.
                    </p>
                    <Tabs defaultValue="visi" className="pt-4">
                        <TabsList className="w-full flex">
                            <TabsTrigger value="visi" className="flex-1">
                                Visi
                            </TabsTrigger>
                            <TabsTrigger value="misi" className="flex-1">
                                Misi
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="visi">
                            <blockquote className="mt-6 border-l-2 pl-6 italic">
                                &quot;Membantu umat Islam dalam mempelajari Al-Quran dengan
                                mudah. Menjadi tempat belajar Al-Quran yang terpercaya dan
                                berkualitas. Membantu umat Islam dalam memahami ajaran Islam
                                yang benar.&quot;
                            </blockquote>
                        </TabsContent>
                        <TabsContent value="misi">
                            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                                <li>
                                    Menyediakan metode belajar Al-Quran yang mudah dipahami oleh
                                    semua kalangan.
                                </li>
                                <li>
                                    Menyediakan pengajar Al-Quran yang berpengalaman dan
                                    berkualitas.
                                </li>
                                <li>
                                    Menyediakan fasilitas belajar Al-Quran yang lengkap dan
                                    nyaman.
                                </li>
                            </ul>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div>
                <h4 className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight">
                    4 Keutamaan Mempelajari Al-Qur&apos;an
                </h4>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>
                        Syafaat di hari kiamat: Al-Qur&apos;an akan menjadi syafaat bagi
                        pembacanya di hari kiamat.
                    </li>
                    <li>
                        Pahala dari Allah SWT: Pembaca Al-Qur&apos;an akan mendapatkan
                        pahala dari Allah SWT.
                    </li>
                    <li>
                        Mendapatkan perlindungan malaikat: Pembaca Al-Qur&apos;an akan
                        mendapatkan perlindungan dari malaikat.
                    </li>
                    <li>
                        Diselamatkan di hari penghisaban akhirat: Pembaca Al-Qur&apos;an
                        akan diselamatkan di hari penghisaban akhirat.
                    </li>
                </ul>
                <h4 className="scroll-m-20 text-lg md:text-xl font-semibold tracking-tight">
                    Beberapa keutamaan lain dari mempelajari Al-Qur&apos;an
                </h4>
                <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                    <li>Menjadi sebaik-baiknya manusia</li>
                    <li>Bersama para malaikat</li>
                    <li>Menaikkan derajat</li>
                    <li>Dihindarkan dari sifat dengki</li>
                    <li>Mendapatkan jaminan surga dari Allah SWT</li>
                    <li>Sebagai ibadah yang paling utama</li>
                    <li>Diibaratkan seperti orang yang bersedekah</li>
                </ul>
            </div>
        </div>
    );
}
