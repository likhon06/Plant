
import React from "react";
import { Search } from "lucide-react";
import { stackServerApp } from "@/stack";
import { SignUp } from "@stackframe/stack";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getPlants } from "@/actions/plant.action";
import PlantDialog from "@/components/PlantDialog";
import InventoryTable from "@/components/InventoryTable";
import { PlantFromDB } from "@/components/InventoryTable";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

const Plants = async () => {
  const user = await stackServerApp.getUser();
  const plants = await getPlants();
  return (
    <div className="mt-20">
      {user ? (
        <>
          <div className="flex justify-between items-center w-[95%] mx-auto mb-4">
            <div className="relative">
              <Input type="text" placeholder="Search plants" className="pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>+ Add Plant</Button>
              </DialogTrigger>
              <PlantDialog actionType="add" />
            </Dialog>
          </div>
          <InventoryTable plants={plants.data as PlantFromDB[]} />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <SignUp />
        </div>
      )}
    </div>
  );
};

export default Plants;
