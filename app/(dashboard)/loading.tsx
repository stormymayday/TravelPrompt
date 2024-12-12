"use client";

import { BeatLoader } from "react-spinners";

function LoadingPage() {
    return (
        <section className="h-[75vh] flex items-center justify-center">
            <BeatLoader color="hsl(var(--muted-foreground))" />
        </section>
    );
}
export default LoadingPage;
