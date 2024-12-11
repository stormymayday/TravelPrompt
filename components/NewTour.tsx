"use client";

import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { GenerateTourSchema } from "@/schemas";
import {
    useMutation,
    // useQueryClient
} from "@tanstack/react-query";
// import { getExistingTour } from "@/actions/getExistingTour";
import { generateTourResponse } from "@/actions/generateTourResponse";
// import { createNewTour } from "@/actions/createNewTour";

import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

import { Button } from "@/components/ui/Button";

import { toast } from "sonner";

import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

import TourInfo from "./TourInfo";

interface Destination {
    city: string;
    country: string;
}

function NewTour() {
    const {
        mutate,
        isPending,
        data: tour,
    } = useMutation({
        mutationFn: async (destination: Destination) => {
            const newTour = await generateTourResponse(destination);

            if (newTour) {
                console.log(newTour);

                return newTour;
            }

            setError("No matching city found...");
            toast.error("No matching city found...");

            return null;
        },
    });

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof GenerateTourSchema>>({
        resolver: zodResolver(GenerateTourSchema),
        defaultValues: {
            city: "",
            country: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof GenerateTourSchema>) => {
        setSuccess("");
        setError("");
        const destination = values;

        mutate(destination);
    };

    return (
        <div className="flex flex-col items-center">
            <Card className="w-[600px] max-w-[87vw]">
                <CardHeader>
                    <p className="text-2xl font-semibold text-center">
                        🗺️ New Tour
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            className="space-y-6"
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        maxLength={50}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        disabled={isPending}
                                                        maxLength={50}
                                                        type="text"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Generating..." : "Generate Tour"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <div className="mt-16">
                {tour ? <TourInfo tour={tour} /> : null}
            </div>
        </div>
    );
}
export default NewTour;
