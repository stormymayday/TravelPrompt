"use server";

import { db } from "@/lib/db";

export const getSingleTour = async (id: string) => {
    return db.tour.findUnique({
        where: {
            id,
        },
    });
};
