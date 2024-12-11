import { TravelPlan } from "@/types";

interface TourInfoProps {
    tour: TravelPlan;
}

const TourInfo = ({ tour }: TourInfoProps) => {
    const { title, description, stops } = tour;
    return (
        <div className="w-full">
            <h1 className="text-4xl font-semibold mb-4">{title}</h1>
            <p className="leading-loose mb-6">{description}</p>
            <ul>
                {stops.map((stop) => {
                    return (
                        <li key={stop} className="mb-4 bg-muted p-4 rounded-sm">
                            <p className="text">{stop}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
export default TourInfo;
