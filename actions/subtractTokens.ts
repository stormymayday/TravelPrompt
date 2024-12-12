"use server";

import { db } from "@/lib/db";
// import { revalidatePath } from "next/cache";

export const subtractTokens = async (userId: string, tokens: number) => {
    const result = await db.user.update({
        where: {
            id: userId,
        },
        data: {
            tokens: {
                decrement: tokens,
            },
        },
    });

    console.log(`SERVER tokens: ${result.tokens}`);

    // revalidatePath("/settings");
    return result;
};
