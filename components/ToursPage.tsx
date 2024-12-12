"use client";

import { useState } from "react";
import { getAllTours } from "@/actions/getAllTours";
import { useQuery } from "@tanstack/react-query";
import ToursList from "@/components/ToursList";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const ToursPage = () => {
    const [searchValue, setSearchValue] = useState("");
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

    // const { data, isPending } = useQuery({
    //     queryKey: ["tours", searchValue],
    //     queryFn: () => getAllTours(searchValue),
    // });

    // Debouncing the search input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);

        // Using a timeout to delay the actual search
        const timeoutId = setTimeout(() => {
            setDebouncedSearchValue(value);
        }, 500);

        return () => clearTimeout(timeoutId);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, isPending } = useQuery({
        queryKey: ["tours", debouncedSearchValue],
        queryFn: () => getAllTours(debouncedSearchValue),
        // Adding staleTime of 5 minutes to improve performance
        staleTime: 1000 * 60 * 5,
    });

    const handleReset = () => {
        setSearchValue("");
        setDebouncedSearchValue("");
    };

    return (
        <div className="flex flex-col items-center w-full max-w-4xl px-4 mx-auto">
            <div className="w-full">
                <form className="flex flex-col sm:flex-row items-end gap-4 w-full">
                    <div className="flex-1 w-full">
                        <Input
                            type="text"
                            placeholder="Enter City or Country"
                            value={searchValue}
                            // onChange={(e) => setSearchValue(e.target.value)}
                            onChange={handleSearchChange}
                            maxLength={50}
                        />
                    </div>
                    <Button
                        type="button"
                        // disabled={isPending}
                        // onClick={() => setSearchValue("")}
                        onClick={handleReset}
                        className="w-full sm:w-auto"
                    >
                        Reset
                        {/* {isPending ? "Please wait..." : "Reset"} */}
                    </Button>
                </form>
            </div>

            <div className="mt-16 w-full">
                <ToursList data={data || []} />
            </div>
        </div>
    );
};

export default ToursPage;
