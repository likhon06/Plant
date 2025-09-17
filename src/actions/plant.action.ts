'use server';
import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
export async function getPlants(searchTerm?: string) {
    try {
        const currentUserId = await getUserId();
        const searchRules: any = {
            userId: currentUserId,
        };
        if (searchTerm) {
            searchRules.name = {
                contains: searchTerm,
                mode: "insensitive"
            };
        }
        const myPlants = await prisma.plants.findMany({
            where: searchRules
        });
        return {
            success: true,
            data: myPlants
        };
    } catch (error) {
        return { success: false, message: "Failed to get plants" };
    }
}

export async function getPlantById(plantId: string) {
    try {
        const currentUserId = await getUserId();
        const plant = await prisma.plants.findFirst({
            where: {
                id: plantId,
                userId: currentUserId
            }
        });
        if (!plant) {
            return {
                success: false,
                message: "Plant not found"
            };
        }
        return {
            success: true,
            data: plant
        };
    } catch (error) {
        return { success: false, message: "Failed to get plant" };
    }
}

export async function createPlant(plantData: any) {
    try {
        const userId = await getUserId();
        const processedData: any = {
            name: plantData.name,
            category: plantData.category,
            price: parseFloat(plantData.price),
            stock: parseInt(plantData.stock),
            description: plantData.description || null,
            imageUrl: plantData.imageUrl || null,
            userId: userId
        };
        const plant = await prisma.plants.create({
            data: processedData
        });
        revalidatePath('/plants');
        return { success: true, data: plant };
    } catch (error) {
        return { success: false, message: "Failed to create plant" };
    }
}

export async function updatePlant(id: string, plantData: any) {
    try {
        const userId = await getUserId();

        // First check if the plant exists and belongs to the user
        const existingPlant = await prisma.plants.findFirst({
            where: {
                id: id,
                userId: userId
            }
        });

        if (!existingPlant) {
            return {
                success: false,
                message: "Plant not found or you don't have permission to update it"
            };
        }

        const processedData = {
            name: plantData.name,
            category: plantData.category,
            price: parseFloat(plantData.price),
            stock: parseInt(plantData.stock),
            description: plantData.description || null,
            imageUrl: plantData.imageUrl || null,
        };

        console.log("Updating plant with data:", processedData);

        const plant = await prisma.plants.update({
            where: { id },
            data: processedData
        });

        console.log("Plant updated successfully:", plant);
        revalidatePath('/plants');
        return { success: true, data: plant };
    } catch (error) {
        console.error("Error updating plant:", error);
        return { success: false, message: "Failed to update plant" };
    }
}

export async function deletePlant(id: string) {
    try {
        await prisma.plants.delete({
            where: { id }
        });
        revalidatePath('/plants');
        return { success: true };
    } catch (error) {
        return { success: false, message: "Failed to delete plant" };
    }
}

export async function deletePlantAction(id: string) {
    return await deletePlant(id);
}
