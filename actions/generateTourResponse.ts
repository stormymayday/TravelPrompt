"use server";

import OpenAI from "openai";
import * as z from "zod";
import { TourDestinationSchema } from "@/schemas";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const generateTourResponse = async (
    values: z.infer<typeof TourDestinationSchema>
) => {
    // Validate input fields
    const validatedFields = TourDestinationSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            success: "",
            error: " Please enter City and Country.",
            tour: null,
        };
    }

    // Extracting validated fields
    const { city, country } = validatedFields.data;

    const query = `Find a ${city} in this ${country}.
                    If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}. 
                    Once you have a list, create a one-day tour. Response should be in the following JSON format: 
                    {
                    "tour": {
                        "city": "${city}",
                        "country": "${country}",
                        "title": "title of the tour",
                        "description": "description of the city and tour",
                        "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
                    }
                    }
                    If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;

    try {
        const timeoutPromise = new Promise((_, reject) =>
            // Waiting for 15 seconds
            setTimeout(() => reject(new Error("Request timed out")), 15000)
        );

        const responsePromise = openai.chat.completions.create({
            messages: [
                { role: "system", content: "you are a tour guide" },
                { role: "user", content: query },
            ],
            model: "gpt-3.5-turbo",
            temperature: 0,
        });

        const response = await Promise.race([responsePromise, timeoutPromise]);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rawContent = (response as any).choices[0].message.content || "";
        let tourData = JSON.parse(rawContent);

        if (!tourData.tour) {
            return {
                success: "",
                error: "No matching tour found...",
                tour: null,
            };
        }

        return {
            success: "Tour generated!",
            error: "",
            tour: tourData.tour,
        };
    } catch (error: unknown) {
        if (error instanceof Error && error.message === "Request timed out") {
            return {
                success: false,
                error: "Service is not responding. Please try again later.",
                tour: null,
            };
        }

        return {
            success: "",
            error: "Oops! Something went wrong!",
            tour: null,
        };
    }
};
