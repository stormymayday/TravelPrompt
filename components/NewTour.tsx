"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TourDestinationSchema } from "@/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getExistingTour } from "@/actions/getExistingTour";
import { generateTourResponse } from "@/actions/generateTourResponse";
import { createNewTour } from "@/actions/createNewTour";

import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import TourInfo from "@/components/TourInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSession } from "next-auth/react";
import { subtractTokens } from "@/actions/subtractTokens";

function NewTour() {
    const queryClient = useQueryClient();

    const user = useCurrentUser();
    const { update } = useSession();

    const {
        mutate,
        isPending,
        data: tour,
    } = useMutation({
        mutationFn: async (
            destination: z.infer<typeof TourDestinationSchema>
        ) => {
            const existingTour = await getExistingTour(destination);

            if (!user) {
                return null;
            }

            if (!user.id) {
                return null;
            }

            if (existingTour) {
                return existingTour;
            }

            if (user?.tokens < 300) {
                toast.error("Not enough tokes left!");
                return null;
            }

            const newTour = await generateTourResponse(destination);

            if (newTour.success) {
                await createNewTour(newTour.tour?.tour);

                console.log(
                    `CLIENT User ID: ${user.id}, Tokens: ${newTour.tour?.tokens}`
                );

                const result = await subtractTokens(
                    user.id,
                    newTour.tour?.tokens
                );

                console.log(`RESULT: ${result}`);

                toast.success(newTour.success);

                queryClient.invalidateQueries({
                    queryKey: ["tours"],
                });

                await update();

                return newTour.tour?.tour;
            }

            toast.error(newTour.error);

            return null;
        },
    });

    const form = useForm<z.infer<typeof TourDestinationSchema>>({
        resolver: zodResolver(TourDestinationSchema),
        defaultValues: {
            city: "",
            country: "",
        },
    });

    const handleSubmit = async (
        values: z.infer<typeof TourDestinationSchema>
    ) => {
        const destination = values;

        mutate(destination);
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl px-4">
            <h1 className="mb-5 self-start">Tokens Left: {user?.tokens}</h1>
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
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled={isPending}
                                                maxLength={50}
                                                type="text"
                                                placeholder="Enter City"
                                            />
                                        </FormControl>
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
            </div>

            <div className="mt-16 w-full">
                {tour ? <TourInfo tour={tour} /> : null}
            </div>
        </div>
    );
}

export default NewTour;
