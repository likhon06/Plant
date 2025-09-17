
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "../../../components/ui/badge";
import { PlantFromDB } from "@/components/InventoryTable";
import Image from "next/image";


export default function PlantCard({ plant }: { plant: PlantFromDB }) {

    if (!plant) {
        return <div>Plant data is not available.</div>;
    }

    return (
        <Card className="w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 p-4">
                    <CardHeader className="p-0">
                        {plant.imageUrl && (
                            <div className="rounded-lg overflow-hidden">
                                <Image
                                    src={plant.imageUrl}
                                    width={500}
                                    height={1000}
                                    alt="Post content"
                                />
                            </div>
                        )}
                    </CardHeader>
                </div>
                <div className="w-full md:w-1/2 flex flex-col justify-start p-4">
                    <CardContent className="space-y-4 md:space-y-6">
                        <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold break-words">
                            {plant.name}
                        </CardTitle>
                        <CardTitle className="text-2xl sm:text-3xl font-bold">
                            ${plant.price}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                            <Badge className="text-sm md:text-base">{plant.category}</Badge>
                        </div>
                        <CardDescription className="text-base md:text-lg">
                            Stock: {plant.stock}
                        </CardDescription>
                        <CardDescription className="text-white text-base md:text-lg">
                            {plant.description}
                        </CardDescription>
                    </CardContent>
                </div>
            </div>
        </Card>
    );
}