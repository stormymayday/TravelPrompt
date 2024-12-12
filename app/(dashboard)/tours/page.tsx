import ToursPage from "@/components/ToursPage";
import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
} from "@tanstack/react-query";
import { getAllTours } from "@/actions/getAllTours";

export default async function AllToursPage() {
    const queryClient = new QueryClient();

    // prefetching tours
    await queryClient.prefetchQuery({
        queryKey: ["tours"],
        queryFn: () => getAllTours(),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ToursPage />
        </HydrationBoundary>
    );
}
