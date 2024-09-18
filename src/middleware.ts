import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const unProtectedRoutes = ["/"];

function containSubstring(inputString: string, subStrings: Array<string>) {
  return subStrings.some((subString) => inputString?.includes(subString));
}

const isAunthenticated = (req: NextRequest) => {
  const loggedIn = req.cookies.get("user");
  if (loggedIn) return true;
  else {
    return false;
  }
};

export default function middleWare(req: NextRequest) {
  if (
    !isAunthenticated(req) &&
    containSubstring(req.nextUrl.pathname, protectedRoutes)
  ) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (
    isAunthenticated(req) &&
    unProtectedRoutes?.includes(req.nextUrl.pathname)
  ) {
    const absoluteURL = new URL("/insurances", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
