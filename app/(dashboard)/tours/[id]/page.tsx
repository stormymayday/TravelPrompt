import { notFound } from "next/navigation";
import { getSingleTour } from "@/actions/getSingleTour";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import TourInfo from "@/components/TourInfo";

type Params = Promise<{ id: string }>;

interface SingleTourPageProps {
    params: Params;
}

async function SingleTourPage({ params }: SingleTourPageProps) {
    const resolvedParams = await params;

    const { id } = resolvedParams;

    const tour = await getSingleTour(id);

    if (!tour) {
        return notFound();
    }

    return (
        <div>
            <Link href="/tours" className={`${buttonVariants()} mb-8`}>
                Back to Tours
            </Link>
            <TourInfo tour={tour} />
        </div>
    );
}
export default SingleTourPage;
