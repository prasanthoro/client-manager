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
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

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
  const [invalidMessage, setInvalidMessage] = useState<any>();
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
      const response: any = await loginAPI(payload);
      if (response.status == 200 || response.status == 201) {
        toast.success(response?.message);
        Cookies.set("user", response?.data?.user_details?.user_type);
        dispatch(setUserDetails(response));
        router.replace("/dashboard");
      } else if (response?.type == "VALIDATION_ERROR") {
        setErrorMessages(response?.error_data);
      } else if (response?.type == "Invalid_Credentials") {
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
              {errorMessages?.email && (
                <p style={{ color: "red" }}>{errorMessages.email[0]}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
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
                <Image
                  className="absolute right-[10px] top-[10px]"
                  src={!showPassword ? "/eye-off.svg" : "/view.svg"}
                  alt={showPassword ? "Hide Password" : "Show Password"}
                  width={24}
                  height={24}
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>

              {errorMessages?.password && (
                <p style={{ color: "red" }}>{errorMessages.password[0]}</p>
              )}
              <p
                color="error"
                style={{
                  color: "red !important",
                }}
              >
                {invalidMessage}
              </p>
            </div>
            <Button
              type="submit"
              className="w-full flex justify-center items-center"
              onClick={() => signInEvent()}
            >
              {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
