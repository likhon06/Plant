import React from 'react'
import PlantCard from './PlantCard'
import { stackServerApp } from '@/stack';
import { SignIn } from '@stackframe/stack';
import { getPlantById } from '@/actions/plant.action';


async function page({ params }: { params: any }) {
    const user = await stackServerApp.getUser();
    const { slug } = await params;
    const plant: any = await getPlantById(slug);

    if (!user) {
        return <SignIn />
    }

    if (!plant.success) {
        return (
            <div className="mt-7 max-w-7xl mx-auto px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Plant Not Found</h1>
                    <p className="text-gray-600 mt-2">{plant.message}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-full mt-20">
                <PlantCard plant={plant.data} />
            </div>
        </div>
    )
}

export default page