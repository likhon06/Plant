import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Button } from "./button";
import { stackServerApp } from "@/stack";
import { getUserDetails } from "@/actions/user.action";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const Navbar = async () => {
  const user = await stackServerApp.getUser(); // getUser
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);
  return (
    <div>
      <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a href="/" className="mr-6 flex items-center space-x-2 ml-4">
              <span className="font-bold">🌱Plant</span>
            </a>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/"
                className="transition-colors hover:text-foreground/80"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-foreground/80"
              >
                About
              </Link>
              <Link
                href="/projects"
                className="transition-colors hover:text-foreground/80 hidden md:block lg:block"
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-foreground/80 hidden md:block lg:block"
              >
                Contact
              </Link>
              <span className="hidden md:block lg:block">
                {userProfile?.name ? (
                  <>
                    <span className="text-[14px] text-gray-600 dark:text-gray-300">
                      {`Hello, ${userProfile?.name}`}
                    </span>
                    <Link href={app.signOut}>
                      <Button>Sign Out</Button>
                    </Link>
                  </>
                ) : (
                  <Link href={app.signIn}>
                    <Button>Sign In</Button>
                  </Link>
                )}
              </span>
            </nav>
            <nav className="md:hidden lg:hidden fixed top-2 right-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="relative w-10 h-10 group"
                  >
                    <div className="flex flex-col justify-center items-center w-6 h-6 transition-all duration-300 group-data-[state=open]:rotate-45">
                      <span
                        className="absolute h-0.5 w-4 bg-current transition-all duration-300 
                        group-data-[state=open]:rotate-90 group-data-[state=open]:translate-y-0
                        -translate-y-1"
                      ></span>
                      <span
                        className="absolute h-0.5 w-4 bg-current transition-all duration-300 
                        group-data-[state=open]:opacity-0"
                      ></span>
                      <span
                        className="absolute h-0.5 w-4 bg-current transition-all duration-300
                        group-data-[state=open]:-rotate-180 group-data-[state=open]:translate-y-0 
                        translate-y-1"
                      ></span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="animate-in slide-in-from-top-2"
                >
                  <DropdownMenuItem>
                    {userProfile?.name ? (
                      <>
                        <span className="text-[14px] text-gray-600 dark:text-gray-300">
                          {`Hello, ${userProfile?.name}`}
                        </span>
                      </>
                    ) : (
                      <Link href={app.signIn}>Sign In</Link>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/projects" className="flex w-full">
                      Projects
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/contact" className="flex w-full">
                      Contact
                    </Link>
                  </DropdownMenuItem>
                  {userProfile?.name && (
                    <DropdownMenuItem>
                      <Link href={app.signOut}>Sign Out</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
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
