"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const getAllTours = async (searchTerm?: string) => {
    if (!searchTerm) {
        const tours = await db.tour.findMany({
            orderBy: {
                city: "asc",
            },
        });
        revalidatePath("/tours");
        return tours;
    }

    const tours = await db.tour.findMany({
        where: {
            OR: [
                {
                    city: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
                {
                    country: {
                        contains: searchTerm,
                        mode: "insensitive",
                    },
                },
            ],
        },
        orderBy: {
            city: "asc",
        },
    });

    revalidatePath("/tours");
    return tours;
};
