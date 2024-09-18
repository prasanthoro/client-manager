"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  deleteProfileDetails,
  removeUserDetails,
} from "@/redux/Modules/userlogin";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
// import { changeFirstCharToCap } from "@/help/insurances/changeFirstCharCap";
export const NavBarComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const userDetails = useSelector((state: any) => state.userLogin.userDetails);
  const logout = async () => {
    dispatch(deleteProfileDetails());
    dispatch(removeUserDetails());
    router.push("/");
    Cookies.remove("user");
  };
  const username = userDetails?.user_details?.username;
  if (pathname == "/") {
    return children;
  } else {
    return (
      <div>
        <section id="navBar">
          <div className="header">
            <div className="container">
              <div className="companyLogo">
                {/* <Image
                  src="/labSquire-logo.svg"
                  alt="image"
                  height={40}
                  width={140}
                />
              </div>
              <div className="rightBlock">
                <Link
                  className={
                    pathname?.includes("dashboard")
                      ? "active-link"
                      : "inactive-link"
                  }
                  href="/dashboard"
                >
                  Dashboard
                </Link> */}
                {/* <Link
                  className={
                    pathname?.includes("insurances") ||
                    pathname?.includes("add-payer") ||
                    pathname?.includes("edit-payer")
                      ? "active-link"
                      : "inactive-link"
                  }
                  href="/insurances"
                >
                  Insurances
                </Link> */}
                {/* <Link
                  className={
                    pathname?.includes("state-license")
                      ? "active-link"
                      : "inactive-link"
                  }
                  href="/state-license"
                >
                  State License
                </Link> */}
                {/* <Link
                  className={
                    pathname?.includes("lab-documents")
                      ? "active-link"
                      : "inactive-link"
                  }
                  href="/lab-documents"
                >
                  <p>Lab Documents Directory</p>
                </Link> */}
                <div
                  style={{
                    display: "flex",
                    columnGap: "5px",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src="/profile-icon.svg"
                    width={16}
                    height={16}
                    alt=""
                  />
                  {/* <span className="userName">
                    {username ? changeFirstCharToCap(username) : ""}
                  </span> */}
                </div>

                <div className="logoutBtn" onClick={logout}>
                  Logout
                  <Image
                    src={"/navbar/profile/logout.svg"}
                    height={18}
                    width={18}
                    alt={"log-out"}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <div>{children}</div>
      </div>
    );
  }
};
