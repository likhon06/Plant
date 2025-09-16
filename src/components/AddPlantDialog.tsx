"use client";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PlantAddDialog from "@/components/PlantAddDialog";

export default function AddPlantDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add Plant</Button>
      </DialogTrigger>
      <PlantAddDialog />
    </Dialog>
  );
}
