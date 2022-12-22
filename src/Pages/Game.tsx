import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "../Components/Board";
import Header from "../Components/Header";
import MobileMenu from "../Components/MobileMenu";
import Scores from "../Components/Scores";

export default function Game() {
  const { theme, players, grid, round } = useParams();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [points, setPoints] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  useEffect(() => {
    for (let i = 0; i < Number(players); i++) {
      points.push(0);
    }
  }, []);
  return (
    <main className="flex flex-col items-center justify-between h-screen md:h-fit py-5   w-full bg-darkwhite pt-3 px-6 md:p-9 overflow-x-hidden">
      <Header showMenu={setVisible} />
      {visible && <MobileMenu setVisible={setVisible} />}
      <Board grid={grid === "4x4" ? 4 : 6} theme={theme} moves={moves} setMoves={setMoves}/>
      <Scores players={Number(players)} points={points} moves={moves} />
    </main>
  );
}
