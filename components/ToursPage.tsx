"use client";

import { useState } from "react";
import { getAllTours } from "@/actions/getAllTours";
import { useQuery } from "@tanstack/react-query";
import ToursList from "@/components/ToursList";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const ToursPage = () => {
    const [searchValue, setSearchValue] = useState("");

    const { data, isPending } = useQuery({
        queryKey: ["tours", searchValue],
        queryFn: () => getAllTours(searchValue),
    });

    return (
        <div className="flex flex-col items-center w-full max-w-4xl px-4 mx-auto">
            <div className="w-full">
                <form className="flex flex-col sm:flex-row items-end gap-4 w-full">
                    <div className="flex-1 w-full">
                        <Input
                            type="text"
                            placeholder="enter city or country here..."
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            maxLength={50}
                        />
                    </div>
                    <Button
                        type="button"
                        disabled={isPending}
                        onClick={() => setSearchValue("")}
                        className="w-full sm:w-auto"
                    >
                        {isPending ? "Please wait..." : "Reset"}
                    </Button>
                </form>
            </div>

            <div className="mt-16 w-full">
                {!isPending && <ToursList data={data || []} />}
            </div>
        </div>
    );
};

export default ToursPage;
