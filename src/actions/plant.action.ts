'use server';
import { prisma } from "@/lib/prisma";
import { getUserId } from "./user.action";
import { revalidatePath } from "next/cache";
export async function getPlants(searchTerm?: string) {
    try {
        const currentUserId = await getUserId();
        // First, let's set up which plants we want to find
        const searchRules: any = {
            userId: currentUserId, // Only get plants that belong to this user
        };

        // If someone typed in a search word, also look for plants with that name
        if (searchTerm) {
            searchRules.name = {
                contains: searchTerm, // Find any plant names that have this word
                mode: "insensitive"  // Don't worry about uppercase/lowercase
            };
        }

        // Get all the plants that match our rules
        const myPlants = await prisma.plants.findMany({
            where: searchRules
        });

        // Send back the plants we found
        return {
            success: true,
            data: myPlants
        };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to get plants" };
    }
}


export async function createPlant(plantData: any) {
    try {
        const userId = await getUserId();
        const plant = await prisma.plants.create({
            data: { ...plantData, userId }
        });
        revalidatePath('/plants');
        return { success: true, data: plant };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Failed to create plant" };
    }
}

export async function updatePlant(id: string, plantData: any) {
    try {
        const plant = await prisma.plants.update({
            where: { id },
            data: plantData
        });
        revalidatePath('/plants');
        return { success: true, data: plant };
    } catch (error) {
        console.error(error);
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
        console.error(error);
        return { success: false, message: "Failed to delete plant" };
    }
}


export async function deletePlantAction(id: string) {
    return await deletePlant(id);
}


// GET - DONE
// DELETE - DONE
// CREATE
// UPDATE
