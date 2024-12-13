import { Button } from "@/components/ui/Button";
import LoginButton from "@/components/auth/LoginButton";
import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import heroImg from "@/public/hero.svg";

export default function Home() {
    return (
        <main>
            <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between">
                <span className="text-3xl font-semibold">
                    Travel
                    <span className="text-primary">Prompt</span>
                </span>
                <ModeToggle />
            </header>
            <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center gap-5">
                <div className="">
                    <h1 className="text-4xl md:text-7xl font-bold">
                        Your <span className="text-primary">Personal</span> Tour
                        <span className="text-primary"> Guide</span>
                    </h1>
                    <LoginButton asChild>
                        <Button className="mt-4" size="lg">
                            Explore
                        </Button>
                    </LoginButton>
                </div>
                <Image
                    src={heroImg}
                    alt="landing"
                    className="hidden lg:block rounded-sm"
                />
            </section>
        </main>
    );
}
