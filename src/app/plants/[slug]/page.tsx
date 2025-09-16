import React from 'react'
import PlantCard from './PlantCard'
import { stackServerApp } from '@/stack';
import { SignIn } from '@stackframe/stack';
import { getPlants } from '@/actions/plant.action';


async function page({ params }: { params: { slug: string } }) {
    const user = await stackServerApp.getUser();
    const [id] = params.slug.split("--");
    const plant: any = await getPlants(id);

    if (!user) {
        return <SignIn />
    }

    return (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-full">
                <PlantCard plant={plant} />
            </div>
        </div>
    )
}

export default page