import React from "react";
import { ModeToggle } from "./ui/ModeToggle";
import Link from "next/link";
import { Button } from "./ui/button";
import { stackServerApp } from "@/stack";
import { getUserDetails } from "@/actions/user.action";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { UserButton } from "@stackframe/stack";

const Navbar = async () => {
  const user = await stackServerApp.getUser(); // getUser
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);
  return (
    <div>
      <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center lg:justify-between h-14 w-[90%] mx-auto">
            <div>
              <Link href="/" className="mr-6 flex items-center space-x-2 ml-4">
                <span className="font-bold">🌱Plant</span>
              </Link>
            </div>
            <div>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <Link
                  href="/plants"
                  className="transition-colors hover:text-foreground/80"
                >
                  Plants
                </Link>
                <Link
                  href="/projects"
                  className="transition-colors hover:text-foreground/80"
                >
                  Projects
                </Link>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-foreground/80"
                >
                  Contact
                </Link>
                <span className="hidden md:block lg:block">
                  {userProfile?.name ? (
                    <UserButton />
                  ) : (
                    <Link href={app.signIn}>
                      <Button>Sign In</Button>
                    </Link>
                  )}
                </span>
              </nav>
              <nav className="md:hidden lg:hidden fixed top-2 right-2 mt-1">
                <UserButton />
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
