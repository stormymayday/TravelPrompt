"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

interface ErrorPageProps {
    error: Error;
    reset: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ErrorPage(props: ErrorPageProps) {
    // console.error(props.error.message);

    return (
        <section className="h-[75vh] flex flex-col gap-y-5 items-center justify-center">
            <h1 className="font-bold text-3xl text-center">
                Oops! Something went wrong!
            </h1>
            <Link href="/tours" className={buttonVariants()}>
                Back to Tours
            </Link>
        </section>
    );
}
export default ErrorPage;
