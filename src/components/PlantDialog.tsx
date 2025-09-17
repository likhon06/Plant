
"use client";
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Spinner } from "./ui/shadcn-io/spinner";
import { UploadButton } from "@/utils/uploadthing";
import { createPlant, updatePlant } from "@/actions/plant.action";

export default function PlantDialog({ actionType, id }: { actionType: "add" | "edit", id?: string }) {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePlant = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const plantData = {
                name: formData.get("name") as string,
                category: formData.get("category") as string,
                price: formData.get("price") as string,
                stock: formData.get("stock") as string,
                description: formData.get("description") as string,
                imageUrl: imageUrl,
            }
            let result;
            if (actionType === "add") {
                result = await createPlant(plantData);
            } else if (actionType === "edit") {
                result = await updatePlant(id as string, plantData);
            }
            console.log("result : ", result);
            if (result?.success) {
                toast.success(actionType === "add" ? "Plant added successfully" : "Plant updated successfully");
                (e.target as HTMLFormElement).reset();
                setImageUrl("");
            } else {
                toast.error(result?.message || "Failed to add plant");
            }
        } catch (error) {
            toast.error("An error occurred while adding the plant");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{actionType === "add" ? "Add New Plant" : "Update Plant"}</DialogTitle>
                <DialogDescription>
                    {actionType === "add" ? "Fill in the details to add a new plant to your inventory." : "Fill in the details to update the plant."}
                </DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={handlePlant}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Plant Name</Label>
                        <Input type="text" id="name" name="name" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input type="text" id="category" name="category" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input type="number" id="price" name="price" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input type="number" id="stock" name="stock" required />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" name="description" rows={3} />
                </div>
                <div className="space-y-2 h-[20%] mb-20">
                    <Label>Image</Label>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            console.log("Files: ", res);
                            setImageUrl(res?.[0]?.ufsUrl ?? "");
                            alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                        appearance={{
                            button: "bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md",
                            container: "w-full flex flex-col items-center justify-center min-h-[120px] border-2 border-dashed border-gray-300 rounded-lg",
                            allowedContent: "text-sm text-gray-500 mt-1",
                        }}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <DialogTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogTrigger>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Spinner key={"default"} variant={"default"} />
                                {actionType === "add" ? "Adding..." : "Updating..."}
                            </>
                        ) : (
                            actionType === "add" ? "Add Plant" : "Update Plant"
                        )}
                    </Button>
                </div>
            </form>
        </DialogContent>
    )
}