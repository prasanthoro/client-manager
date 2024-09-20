"use client";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { setSessionTimedOut, setUserDetails } from "@/redux/Modules/userlogin";
import { loginAPI } from "@/services/auth";
import { CircularProgress } from "@mui/material";
export const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isSessionTimedOut = useSelector(
    (state: any) => state?.userLogin?.sessionExpiredOtNot
  );
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessages, setErrorMessages] = useState<any>();
  const [invalidMessage, setInvalidMessage] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const signInEvent = async () => {
    if (loading) return;
    setLoading(true);
    dispatch(setSessionTimedOut(false as any));
    setErrorMessages("");
    setInvalidMessage("");
    try {
      const payload = {
        email: email,
        password: password,
      };
      console.log(payload, "payload");
      const response: any = await loginAPI(payload);
      if (response.status == 200 || response.status == 201) {
        Cookies.set("user", response?.user_details_user_type);
        dispatch(setUserDetails(response));
        // toast.success("User logged in successfully");
        router.replace("/dashboard");
      } else if (response?.status == 422) {
        setErrorMessages(response?.error_data);
      } else if (response?.status == 401) {
        setInvalidMessage(response?.message);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/clients.svg"
          alt="Image"
          width={1}
          height={1}
          className="w-full h-[80%] object-cover"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your Email"
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    signInEvent();
                  }
                }}
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <p
                color="error"
                style={{
                  color: "red !important",
                  display: errorMessages?.password ? "" : "none",
                }}
              >
                {errorMessages?.user_name}
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                onKeyDown={(e: any) => {
                  if (e.key === "Enter") {
                    signInEvent();
                  }
                }}
              />
              <p
                color="error"
                style={{
                  color: "red !important",
                  display: errorMessages?.password ? "" : "none",
                }}
              >
                {errorMessages?.user_name}
              </p>
              <p
                color="error"
                style={{
                  color: "red !important",
                  display: errorMessages?.password ? "" : "none",
                }}
              >
                {invalidMessage}
              </p>
            </div>
            <Button
              type="submit"
              className="w-full"
              onClick={() => signInEvent()}
            >
              {loading ? (
                <CircularProgress size="1.5rem" sx={{ color: "#fff" }} />
              ) : (
                "Log In"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
