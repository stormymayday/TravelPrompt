"use server";

import * as z from "zod";
import { TourSchema } from "@/schemas";
import { db } from "@/lib/db";
import { currentUser } from "@/utils/server-current-user/currentUser";

export const createNewTour = async (values: z.infer<typeof TourSchema>) => {
    const user = await currentUser();

    if (!user) {
        return { error: "unauthorized" };
    }

    // Validate the input fields
    const validatedFields = TourSchema.safeParse(values);

    // Checking if the fields are valid
    if (!validatedFields.success) {
        // return {
        //     error: "Invalid fields!",
        // };
        return null;
    }

    // Extracting validated fields
    const { city, country, title, description, image, stops } =
        validatedFields.data;

    // Creating a tour
    const newTour = await db.tour.create({
        data: {
            city: city.toLowerCase(),
            country: country.toLowerCase(),
            title,
            description,
            image,
            stops,
            user: {
                // Connecting to user via userId
                connect: { id: user.id },
            },
        },
    });

    return newTour;
};
