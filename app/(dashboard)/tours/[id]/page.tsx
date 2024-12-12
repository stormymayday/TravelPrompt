import { notFound } from "next/navigation";
import { getSingleTour } from "@/actions/getSingleTour";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";
import TourInfo from "@/components/TourInfo";
import Image from "next/image";
import axios from "axios";
const url = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_API_KEY}&query=`;

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

    const { data } = await axios(`${url}${tour.city}`);
    const tourImage = data?.results[0]?.urls?.raw;

    return (
        <div>
            <Link href="/tours" className={`${buttonVariants()} mb-8`}>
                Back to Tours
            </Link>

            {tourImage ? (
                <div>
                    <Image
                        src={tourImage}
                        width={300}
                        height={300}
                        className="rounded-sm shadow-xl mb-16 h-96 w-96 object-cover"
                        alt={tour.title}
                        priority
                    />
                </div>
            ) : null}

            <TourInfo tour={tour} />
        </div>
    );
}
export default SingleTourPage;
