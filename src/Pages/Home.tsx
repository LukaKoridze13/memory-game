import React from "react";
import ChooseButton from "../Components/ChooseButton";
import Label from "../Components/Label";
import Logo from "../Components/Logo";
import useChooseBetween from "../Hooks/ChooseBetween";

export default function Home() {
  const [theme, setTheme] = React.useState<string>("Numbers");
  const numbers = React.useRef<HTMLButtonElement>(null);
  const icons = React.useRef<HTMLButtonElement>(null);

  const [grid, setGrid] = React.useState<string>("4x4");
  const four = React.useRef<HTMLButtonElement>(null);
  const six = React.useRef<HTMLButtonElement>(null);

  // Creating Functions using Custom Hook
  const changeTheme = useChooseBetween(
    theme,
    setTheme,
    "Numbers",
    "Icons",
    numbers,
    icons
  );
  const changeGrid = useChooseBetween(grid, setGrid, "4x4", "6x6", four, six);

  return (
    <div className="bg-darkest flex items-center justify-center flex-col h-screen w-screen">
      <Logo />
      <div className="w-11/12 max-w-2xl bg-darkwhite rounded-3xl p-6 md:p-14 mt-11 md:mt-20">
        <div>
          <Label text="Select Theme" />
          <div className="flex justify-between mt-3 md:mt-4">
            <ChooseButton text="Numbers" save={numbers} onClick={changeTheme} />
            <ChooseButton text="Icons" save={icons} onClick={changeTheme} />
          </div>
        </div>
        <div className="pt-6 md:pt-8">
          <Label text="Numbers of Players" />
          <div className="flex justify-between mt-3 md:mt-4"></div>
        </div>
        <div className="pt-6 md:pt-8">
          <Label text="Grid Size" />
          <div className="flex justify-between mt-3 md:mt-4">
            <ChooseButton text="4x4" save={four} onClick={changeGrid} />
            <ChooseButton text="6x6" save={six} onClick={changeGrid} />
          </div>
        </div>
      </div>
    </div>
  );
}
