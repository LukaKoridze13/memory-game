import React from "react";
import { useParams } from "react-router-dom";
import Board from "../Components/Board";
import Header from "../Components/Header";
import MobileMenu from "../Components/MobileMenu";

export default function Game() {
  const { theme, players, grid, round } = useParams<string>();
  const [visible, setVisible] = React.useState<boolean>(false);
  return (
    <main className="flex flex-col items-center justify-evenly w-full bg-darkwhite pt-3 px-6 md:p-9 overflow-x-hidden">
      <Header showMenu={setVisible} />
      {visible && <MobileMenu setVisible={setVisible} />}
      <Board grid={grid === "4x4" ? 4 : 6} theme={theme} />
    </main>
  );
}
