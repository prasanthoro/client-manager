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
      <NavBarComponent>{children}</NavBarComponent>
      <SideBar>{children}</SideBar>
    </div>
  );
};
export default MainComponent;
