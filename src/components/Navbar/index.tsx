"use client";
import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  deleteProfileDetails,
  removeUserDetails,
} from "@/redux/Modules/userlogin/userlogin.slice";
import { usePathname, useRouter } from "next/navigation";

export const NavBarComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const userDetails = useSelector((state: any) => state.userLogin.userDetails?.data?.user_details);
  console.log(userDetails,"userDetails");
  
  const handleLogout = async () => {
    dispatch(deleteProfileDetails());
    dispatch(removeUserDetails());
    router.push("/");
    Cookies.remove("user");
  };
  const username = userDetails?.user_details?.username


  if (pathname == "/") {
    return children;
  } else {
    return (
      <div>
        <div className="flex  w-full flex-col ">
          <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-gray-700 px-4 md:px-6">
            <Link
              href="#"
              className="text-white font-bold-200 transition-colors hover:text-foreground "
            >
             <Image
                    src="/clients.svg"
                    width={100}
                    height={100}
                    alt=""
                  />
            </Link>
            {/* // search box */}
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <form className="ml-auto flex-1 sm:flex-initial">
                <div className="relative flex gap-4">
                  {/* Conditionally active Dashboard */}
                  <p
                    className={`${
                      pathname === "/dashboard"
                        ? "font-bold text-white"
                        : "text-gray-400"
                    }`}
                    style={{cursor:'pointer'}}
                    onClick={() => {
                      router.push('/dashboard')
                    }}
                  >
                    Dashboard
                  </p>
                  {/* Conditionally active Client */}
                  <p
                    className={`${
                      pathname === "/clients"
                        ? "font-bold text-white"
                        : "text-gray-400"
                    }`}
                    style={{cursor:'pointer'}}
                    onClick={() => {
                      router.push('/clients')
                    }}
                  >
                    Clients
                  </p>
                </div>
              </form>
            </div>
            {/* // dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full bg-white"
                >
                  <Image
                    src="/nav-avatar.svg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full bg-white"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuLabel>
                {userDetails ? `Hello, ${userDetails.first_name}` : "Hello, Guest"}
              </DropdownMenuLabel> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="text-white flex gap-4">{userDetails ? `Hello, ${userDetails.first_name}` : "Hello, Guest"}</p>
          </header>
        </div>
        <div>{children}</div>
      </div>
    );
  }
};
