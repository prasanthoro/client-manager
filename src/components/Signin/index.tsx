"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSessionTimedOut, setUserDetails } from "@/redux/Modules/userlogin";

import {
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { loginAPI } from "@/services/auth";

export type SignInPageType = {
  className?: string;
};
const SignInPage = ({ className = "" }) => {
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
        user_name: email,
        password: password,
      };
      const response: any = await loginAPI(payload);
      if (response.status == 200 || response.status == 201) {
        Cookies.set("user", response?.user_details_user_type);
        dispatch(setUserDetails(response));
        // toast.success("User logged in successfully");
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
    <section className="loginPage">
      <div className="imageBlock"></div>
      <div className="fromBlock">
        <div className="signInCard">
          <div className="companyLogo">
            <img
              src="/clients.svg"
              alt="image"
              style={{
                alignSelf: "stretch",
                flex: 1,
                maxWidth: "70%",
                overflow: "hidden",
                maxHeight: "100%",
                objectFit: "contain",
                minWidth: "43.75rem",
              }}
            />
          </div>
          <form>
            <div className="form">
              <div className="fieldgroups">
                <div className="inputgroup">
                  <label className="lable" style={{ fontSize: "1rem" }}>
                    Username
                  </label>
                  <TextField
                    className="inputfield"
                    color="primary"
                    placeholder="Enter Username"
                    variant="outlined"
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "47px",
                        borderRadius: "6px",
                      },
                    }}
                    onKeyDown={(e: any) => {
                      if (e.key == "Enter") {
                        signInEvent();
                      }
                    }}
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                    }}
                  />
                  <Typography
                    variant="subtitle1"
                    color="error"
                    fontSize="13px"
                    sx={{
                      color: "red !important",
                      display: errorMessages?.password ? "" : "none",
                    }}
                  >
                    {errorMessages?.user_name}
                  </Typography>
                </div>
                <div className="inputgroup" id="mt-20">
                  <label className="lable" style={{ fontSize: "1rem" }}>
                    Password
                  </label>
                  <TextField
                    onKeyDown={(e: any) => {
                      if (e.key == "Enter") {
                        signInEvent();
                      }
                    }}
                    className="inputfield"
                    color="primary"
                    placeholder="Enter Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPassword(e.target.value)
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="toggle password visibility"
                          >
                            {/* {!showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon style={{}} />
                            )} */}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiInputBase-root": {
                        height: "47px",
                        borderRadius: "6px",
                      },
                    }}
                  />

                  <Typography
                    variant="subtitle1"
                    color="error"
                    fontSize="13px"
                    sx={{
                      color: "red !important",
                      display: errorMessages?.password ? "" : "none",
                    }}
                  >
                    {errorMessages?.password}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="error"
                    fontSize="13px"
                    sx={{
                      color: "red !important",
                      display: invalidMessage ? "" : "none",
                    }}
                  >
                    {invalidMessage}
                  </Typography>
                </div>
              </div>
            </div>

            <Button
              className="submitButton"
              disableElevation
              color="primary"
              variant="contained"
              disabled={loading}
              sx={{ borderRadius: "0px 0px 0px 0px" }}
              onClick={() => {
                signInEvent();
              }}
            >
              {loading ? (
                <CircularProgress
                  size="1.5rem"
                  sx={{ size: "0.2rem", color: "#fff" }}
                  onClick={() => router.push("/dashboard")}
                />
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          {isSessionTimedOut ? (
            <p style={{ color: "red" }}>{"Session Timeout"}</p>
          ) : (
            ""
          )}
        </div>
      </div>
    </section>
  );
};
export default SignInPage;
