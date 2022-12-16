import React from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header";
import MobileMenu from "../Components/MobileMenu";

export default function Game() {
  const { theme, players, grid, round } = useParams();
  const [visible, setVisible] = React.useState<boolean>(false);
  return (
    <main className="flex flex-col items-center justify-evenly h-screen w-screen bg-darkwhite pt-3 px-6 md:p-9">
      <Header showMenu={setVisible}/>
      {visible && <MobileMenu />}
    </main>
  );
}
