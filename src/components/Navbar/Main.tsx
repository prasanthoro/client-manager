"use client";

import NavBarComponent from ".";
import SideBar from "./SideBar";

const MainComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <NavBarComponent />
      <SideBar children={children} />
    </div>
  );
};
export default MainComponent;
