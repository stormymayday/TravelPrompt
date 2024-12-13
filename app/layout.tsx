import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "@/components/ui/Sonner";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
    title: "TravelPrompt",
    description: "AI-Driven City Tour Generator",
};

// Custom font:
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
const font = Roboto({
    subsets: ["latin"],
    weight: ["700"],
});

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();

    return (
        <SessionProvider session={session}>
            <html lang="en" suppressHydrationWarning>
                <body className={cn(font.className)}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Toaster />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </SessionProvider>
    );
}
