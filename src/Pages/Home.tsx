import React from "react";
import ThemeGridButton from "../Components/ThemeGridButton";
import Label from "../Components/Label";
import Logo from "../Components/Logo";
import Players from "../Components/Players";
import useChooseBetween from "../Hooks/ChooseBetween";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../Components/Leaderboard";
const { REACT_APP_API, REACT_APP_TOKEN } = process.env;
export default function Home() {
  const [theme, setTheme] = React.useState<string>("Numbers");
  const numbers = React.useRef<HTMLButtonElement>(null);
  const icons = React.useRef<HTMLButtonElement>(null);

  const [grid, setGrid] = React.useState<string>("4x4");
  const four = React.useRef<HTMLButtonElement>(null);
  const six = React.useRef<HTMLButtonElement>(null);

  const [players, setPlayers] = React.useState<number>(1);
  const solo = React.useRef<HTMLButtonElement>(null);
  const duo = React.useRef<HTMLButtonElement>(null);
  const trio = React.useRef<HTMLButtonElement>(null);
  const squad = React.useRef<HTMLButtonElement>(null);
  const buttons = [solo, duo, trio, squad];

  const navigate = useNavigate();
  // Function to handle player change
  const changePlayers = (event: React.MouseEvent) => {
    let target = event.target as HTMLButtonElement;
    buttons.forEach((but) => {
      but.current?.classList.remove("first:!bg-darkest", "!bg-darkest");
    });
    target.classList.add("!bg-darkest");
    setPlayers(Number(target.innerText));
  };
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
    <div className="bg-darkest flex items-center justify-evenly flex-col h-screen w-screen">
      <div className="absolute top-10 left-6 hidden sm:block">
        <Leaderboard />
      </div>
      <div className="flex flex-col content-evenly w-full">
        <Logo />
        {localStorage.getItem(REACT_APP_TOKEN || "") === null ? (
          <div className="flex justify-evenly md:hidden">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="flex  items-center justify-center bg-orange text-darkwhite font-bold text-lg md:text-5x w-24 h-12 md:h-16 mt-8 rounded-3xl hover:bg-lightorange cursor-pointer">
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="flex items-center justify-center bg-orange text-darkwhite font-bold text-lg md:text-5x w-24 h-12 md:h-16 mt-8 rounded-3xl hover:bg-lightorange cursor-pointer">
              Register
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem(REACT_APP_TOKEN || "");
              navigate("/");
            }}
            className="flex md:hidden items-center justify-center bg-orange text-darkwhite font-bold text-lg md:text-5x w-fit px-2 mx-auto h-12 md:h-16 mt-8 rounded-3xl hover:bg-lightorange cursor-pointer">
            Sign Out ({localStorage.getItem(REACT_APP_TOKEN || "")})
          </button>
        )}
        <div className="sm:hidden mx-auto mt-6 mb-6">
          <Leaderboard />
        </div>
      </div>
      <div className="w-11/12 max-w-2xl bg-darkwhite rounded-3xl p-4 md:p-10 relative">
        {localStorage.getItem(REACT_APP_TOKEN || "") === null ? (
          <div className="hidden justify-evenly md:flex absolute gap-5 right-2 -top-6">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="flex  items-center justify-center bg-orange text-darkwhite font-bold text-lg md:text-5x w-24 h-12 md:h-16 mt-8 rounded-3xl hover:bg-lightorange cursor-pointer">
              Login
            </button>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="flex items-center justify-center bg-orange text-darkwhite font-bold text-lg md:text-5x w-24 h-12 md:h-16 mt-8 rounded-3xl hover:bg-lightorange cursor-pointer">
              Register
            </button>
          </div>
        ) : (
          <div className="hidden justify-evenly md:flex absolute gap-5 right-2 -top-6">
            <button
              onClick={() => {
                localStorage.removeItem(REACT_APP_TOKEN || "");
                navigate("/");
              }}
              className="flex  items-center justify-center bg-orange text-darkwhite font-bold text-lg md:text-5x w-fit px-2 h-12 md:h-16 mt-8 rounded-3xl hover:bg-lightorange cursor-pointer">
              Sign Out ({localStorage.getItem(REACT_APP_TOKEN || "")})
            </button>
          </div>
        )}
        <div>
          <Label text="Select Theme" />
          <div className="flex justify-between mt-3 md:mt-4">
            <ThemeGridButton
              text="Numbers"
              save={numbers}
              onClick={changeTheme}
            />
            <ThemeGridButton text="Icons" save={icons} onClick={changeTheme} />
          </div>
        </div>
        <div className="pt-6 md:pt-8">
          <Label text="Numbers of Players" />
          <div className="flex justify-between mt-3 md:mt-4">
            <Players text="1" save={solo} onClick={changePlayers} />
            <Players text="2" save={duo} onClick={changePlayers} />
            <Players text="3" save={trio} onClick={changePlayers} />
            <Players text="4" save={squad} onClick={changePlayers} />
          </div>
        </div>
        <div className="pt-6 md:pt-8">
          <Label text="Grid Size" />
          <div className="flex justify-between mt-3 md:mt-4">
            <ThemeGridButton text="4x4" save={four} onClick={changeGrid} />
            <ThemeGridButton text="6x6" save={six} onClick={changeGrid} />
          </div>
        </div>
        <button
          onClick={() => {
            navigate(`/${theme}/${players}/${grid}/0`);
          }}
          className="flex items-center justify-center bg-orange text-darkwhite font-bold text-lg md:text-5x w-full h-12 md:h-16 mt-8 rounded-3xl hover:bg-lightorange cursor-pointer">
          Start Game
        </button>
      </div>
    </div>
  );
}
