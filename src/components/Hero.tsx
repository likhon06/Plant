import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              ✨ Your Website Builder
              <ArrowUpRight className="ml-2 size-4" />
            </Badge>

            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Blocks Built With Shadcn & Tailwind
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl lg:text-xl">
              Finely crafted components built with React, Tailwind and Shadcn
              UI. Developers can copy and paste these blocks directly into their
              project.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button asChild className="w-full sm:w-auto">
                <a href="">Discover all components</a>
              </Button>
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <a href="">
                  View on GitHub
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </div>
          <img
            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg"
            alt="Hero section demo image showing interface components"
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export { Hero };
