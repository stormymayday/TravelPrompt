import Link from "next/link";
import { Tour } from "@prisma/client";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { Card, CardContent, CardTitle } from "@/components/ui/Card";

interface TourCardInterface {
    tour: Tour;
}

const TourCard = ({ tour }: TourCardInterface) => {
    const { city, id, country } = tour;

    return (
        <Link href={`/tours/${id}`}>
            <Card className="hover:bg-accent/10 transition-colors duration-200">
                <CardContent className="p-4 flex items-center justify-center text-center">
                    <CardTitle className="text-lg">
                        {capitalizeFirstLetter(city)}, {country.toUpperCase()}
                    </CardTitle>
                </CardContent>
            </Card>
        </Link>
    );
};

export default TourCard;
