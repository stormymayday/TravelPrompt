import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

function TourNotFoundPage() {
    return (
        <section className="h-[75vh] flex flex-col gap-y-5 items-center justify-center">
            <h1 className="font-bold text-3xl text-center">
                Sorry, but we could not find that tour!
            </h1>
            <Link href="/tours" className={buttonVariants()}>
                Back to Tours
            </Link>
        </section>
    );
}
export default TourNotFoundPage;
