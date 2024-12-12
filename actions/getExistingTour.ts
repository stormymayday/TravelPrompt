"use server";

import * as z from "zod";
import { TourDestinationSchema } from "@/schemas";
import { db } from "@/lib/db";

export const getExistingTour = async (
    values: z.infer<typeof TourDestinationSchema>
) => {
    const validatedFields = TourDestinationSchema.safeParse(values);

    // Checking if the fields are valid
    if (!validatedFields.success) {
        // console.log(`invalid fields`);

        // return {
        //     error: "Invalid fields!",
        // };
        return null;
    }

    // Extracting validated fields
    const { city, country } = validatedFields.data;

    const existingTour = await db.tour.findUnique({
        where: {
            city_country: {
                city: city.toLowerCase(),
                country: country.toLowerCase(),
            },
        },
    });

    return existingTour;
};
