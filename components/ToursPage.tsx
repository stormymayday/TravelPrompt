"use client";
import { getAllTours } from "@/actions/getAllTours";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";

const ToursPage = () => {
    const { data, isPending } = useQuery({
        queryKey: ["tours"],
        queryFn: () => getAllTours(),
    });

    // return <>{isPending || <ToursList data={data} />}</>;
    return <>{!isPending && <ToursList data={data || []} />}</>;
};
export default ToursPage;
