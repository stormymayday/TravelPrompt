"use server";

import { db } from "@/lib/db";

export const getAllTours = async (searchTerm?: string) => {
    if (!searchTerm) {
        const tours = await db.tour.findMany({
            orderBy: {
                city: "asc",
            },
        });

        return tours;
    }

    const tours = await db.tour.findMany({
        where: {
            OR: [
                {
                    city: {
                        contains: searchTerm,
                    },
                },
                {
                    country: {
                        contains: searchTerm,
                    },
                },
            ],
        },
        orderBy: {
            city: "asc",
        },
    });

    return tours;
};
