import { Donation } from "../../components/donation";
import { Introduction } from "../../components/introduction";
import { Timeline } from "../../components/timeline";
import { Why } from "../../components/why";

export const SedekahAir = () => {
  return (
    <div className="space-y-4 px-6 md:px-24">
      <Introduction />
      <Why />
      <Timeline />
      <Donation />
    </div>
  );
};
