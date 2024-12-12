import { notFound } from "next/navigation";
import { getSingleTour } from "@/actions/getSingleTour";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import TourInfo from "@/components/TourInfo";

interface SingleTourPageProps {
    params: {
        id: string;
    };
}

async function SingleTourPage({ params }: SingleTourPageProps) {
    const { id } = params;

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
