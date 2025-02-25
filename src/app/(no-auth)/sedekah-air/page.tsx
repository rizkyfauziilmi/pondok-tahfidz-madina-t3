import { Donation } from "./_components/donation";
import { Introduction } from "./_components/introduction";
import { Timeline } from "./_components/timeline";
import { Why } from "./_components/why";

export default function SedekahAirPage() {
    return (
        <div className="p-4 md:px-24 space-y-4">
            <Introduction />
            <Why />
            <Timeline />
            <Donation />
        </div>
    );
}
