"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React from "react";
import { Button } from "./ui/button";
import { MoreHorizontal } from "lucide-react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { deletePlantAction } from "@/actions/plant.action";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "./ui/dialog";
import PlantDialog from "./PlantDialog";

export interface PlantFromDB {
  id: string;
  name: string;
  price: number;
  stock: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  category: string;
  imageUrl?: string | null;
  description?: string | null;
}


const InventoryTable = ({ plants }: { plants: PlantFromDB[] }) => {
  const handleEdit = (id: string) => {

  };
  const handleDelete = async (id: string) => {
    await deletePlantAction(id);
  };
  const router = useRouter();
  return (
    <div className="w-[95%] mx-auto">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Plant ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {plants.map((plant: PlantFromDB) => (
            <TableRow key={plant.id}>
              <TableCell onClick={() => router.push(`/plants/${plant.id}`)}>{plant.id}</TableCell>
              <TableCell onClick={() => router.push(`/plants/${plant.id}`)}>{plant.name}</TableCell>
              <TableCell onClick={() => router.push(`/plants/${plant.id}`)}>{plant.description}</TableCell>
              <TableCell onClick={() => router.push(`/plants/${plant.id}`)}>{plant.category}</TableCell>
              <TableCell onClick={() => router.push(`/plants/${plant.id}`)}>{plant.price}</TableCell>
              <TableCell onClick={() => router.push(`/plants/${plant.id}`)}>{plant.stock}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <FiEdit className="mr-2" /> Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <PlantDialog actionType="edit" id={plant.id} />
                      </Dialog>
                      <DropdownMenuItem onClick={() => handleDelete(plant.id)}>
                        <FiTrash2 className="mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InventoryTable;
