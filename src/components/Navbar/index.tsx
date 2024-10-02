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
import { changeFirstCharToCap } from "@/lib/helpers/core/changeFirstLetterToCap";

const NavBarComponent = () => {
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
  const firstName = userDetails?.data?.user_details?.first_name
    ? userDetails?.data?.user_details?.first_name
    : "";
  const lastName = userDetails?.data?.user_details?.last_name
    ? userDetails?.data?.user_details?.last_name
    : "";
  const fullName =
    firstName || lastName
      ? `${changeFirstCharToCap(firstName)} ${changeFirstCharToCap(lastName)}`
      : "";

  return (
    <div>
      <section className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between p-2 max-w-7xl mx-auto">
          <div className="companyLogo">
            <Image src="/loginImage.svg" alt="image" height={40} width={140} />
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-2">
              <Image src="/avatar-boy.svg" width={35} height={35} alt="" />
              <span className="text-sm">
                {fullName ? changeFirstCharToCap(fullName) : ""}
              </span>
            </div>

            <div
              className="flex items-center space-x-1 border border-blue-800 rounded-lg cursor-pointer p-1 bg-transparent"
              onClick={logout}
            >
              <span className="text-sm">Logout</span>
              <Image src="/logout.svg" height={25} width={25} alt={"log-out"} />
            </div>
          </div>
        </div>
      </section>
      {/* <div>{children}</div> */}
    </div>
  );
};
export default NavBarComponent;
