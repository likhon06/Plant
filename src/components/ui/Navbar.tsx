import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a href="/" className="mr-6 flex items-center space-x-2 ml-4">
              <span className="font-bold">Plant</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="transition-colors hover:text-foreground/80">Home</Link>
              <Link href="/about" className="transition-colors hover:text-foreground/80">About</Link>
              <Link href="/projects" className="transition-colors hover:text-foreground/80">Projects</Link>
              <Link href="/contact" className="transition-colors hover:text-foreground/80">Contact</Link>
            </nav>
          </div>
        </div>
      </nav>
      <div className="fixed bottom-4 right-4">
            <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
