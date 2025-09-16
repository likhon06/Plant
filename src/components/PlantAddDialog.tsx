
"use client";

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { UploadButton } from "@/utils/uploadthing";

export default function PlantAddDialog() {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add New Plant</DialogTitle>
                <DialogDescription>
                    Fill in the details to add a new plant to your inventory.
                </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Plant Name</Label>
                        <Input type="text" id="name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input type="text" id="category" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input type="number" id="price" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input type="number" id="stock" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" rows={3} />
                </div>
                <div className="space-y-2 h-[20%] mb-20">
                    <Label>Image</Label>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: any) => {
                            console.log("Files: ", res);
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
                    <Button type="submit">Add Plant</Button>
                </div>
            </form>
        </DialogContent>
    )
}