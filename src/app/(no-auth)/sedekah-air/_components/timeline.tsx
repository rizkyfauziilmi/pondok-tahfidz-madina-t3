import Timelines, { type TimelineEvent } from "~/components/ui/timelines";

export const Timeline = () => {
  const events: TimelineEvent[] = [
    {
      title: "Pembangunan Sumur Bor",
      date: new Date("2022-01-01"),
      description:
        "Pembangunan sumur bor di daerah terpencil yang membutuhkan air bersih.",
    },
    {
      title: "Pembangunan Saluran Irigasi",
      date: new Date("2022-02-01"),
      description:
        "Pembangunan saluran irigasi untuk mendukung pertanian lokal.",
    },
    {
      title: "Pembagian Air Bersih",
      date: new Date("2022-03-01"),
      description: "Pembagian air bersih kepada masyarakat yang membutuhkan.",
    },
  ];

  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Timeline Kegiatan Sedekah Air
      </h3>
      <Timelines events={events} />
    </div>
  );
};
