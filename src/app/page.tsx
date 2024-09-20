"use client";
import { Dashboard } from "@/components/Dashboard";
import { SignIn } from "@/components/Signin";

import { Suspense } from "react";
const SignInPage = () => {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
};
export default SignInPage;
