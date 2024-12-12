"use client";

// import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { TourDestinationSchema } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getExistingTour } from "@/actions/getExistingTour";
import { generateTourResponse } from "@/actions/generateTourResponse";
import { createNewTour } from "@/actions/createNewTour";

// import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    // FormLabel,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

import { Button } from "@/components/ui/Button";

import { toast } from "sonner";

// import FormError from "@/components/FormError";
// import FormSuccess from "@/components/FormSuccess";

import TourInfo from "./TourInfo";

function NewTour() {
    const queryClient = useQueryClient();

    const {
        mutate,
        isPending,
        data: tour,
    } = useMutation({
        mutationFn: async (
            destination: z.infer<typeof TourDestinationSchema>
        ) => {
            const existingTour = await getExistingTour(destination);

            if (existingTour) {
                return existingTour;
            }

            const newTour = await generateTourResponse(destination);

            if (newTour) {
                await createNewTour(newTour);

                queryClient.invalidateQueries({
                    queryKey: ["tours"],
                });

                return newTour;
            }

            // setError("No matching city found...");
            toast.error("No matching city found...");

            return null;
        },
    });

    // const [error, setError] = useState<string | undefined>();
    // const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof TourDestinationSchema>>({
        resolver: zodResolver(TourDestinationSchema),
        defaultValues: {
            city: "",
            country: "",
        },
    });

    const handleSubmit = (values: z.infer<typeof TourDestinationSchema>) => {
        // setSuccess("");
        // setError("");
        const destination = values;

        mutate(destination);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl px-4">
            <div className="w-full">
                <Form {...form}>
                    <form
                        className="flex flex-col sm:flex-row items-end gap-4 w-full"
                        onSubmit={form.handleSubmit(handleSubmit)}
                    >
                        <div className="flex-1 w-full">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>City</FormLabel> */}
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                maxLength={50}
                                                type="text"
                                                placeholder="Enter City"
                                            />
                                        </FormControl>
                                        {/* <FormMessage /> */}
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1 w-full">
                            <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Country</FormLabel> */}
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                maxLength={50}
                                                type="text"
                                                placeholder="Enter Country"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full sm:w-auto"
                        >
                            {isPending ? "Generating..." : "Generate Tour"}
                        </Button>
                        <FormMessage />
                    </form>
                </Form>

                {/* <FormError message={error} />
                <FormSuccess message={success} /> */}
            </div>

            <div className="mt-16 w-full">
                {tour ? <TourInfo tour={tour} /> : null}
            </div>
        </div>
    );
}

export default NewTour;
