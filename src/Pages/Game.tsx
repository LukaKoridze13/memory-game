import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "../Components/Board";
import Finish from "../Components/Finish";
import Header from "../Components/Header";
import MobileMenu from "../Components/MobileMenu";
import Scores from "../Components/Scores";

export default function Game() {
  const { theme, players, grid, round } = useParams();
  const [visible, setVisible] = React.useState<boolean>(false);
  const [points, setPoints] = useState<number[][]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [turn, setTurn] = useState<number>(0);
  const [finish, setFinish] = useState<boolean>(false);
  const [time, setTime] = useState<string>("");
  function resetPoints() {
    let x = [];
    for (let i = 0; i < Number(players); i++) {
      x.push([0, i + 1]);
    }
    setPoints(x);
  }
  useEffect(() => {
    resetPoints();
  }, []);
  return (
    <main className="flex flex-col items-center justify-between h-screen md:h-fit py-5   w-full bg-darkwhite pt-3 px-6 md:p-9 overflow-x-hidden lg:flex-row lg:flex-wrap lg:justify-evenly  2xl:flex-col 2xl:justify-between">
      <Header showMenu={setVisible} />
      {visible && <MobileMenu setVisible={setVisible} />}
      {/* prettier-ignore */}
      <Board grid={grid === "4x4" ? 4 : 6} theme={theme} moves={moves} setMoves={setMoves} turn={turn} 
        setTurn={setTurn} players={Number(players)} points={points} setPoints={setPoints} setFinish={setFinish}/>
      <Scores
        players={Number(players)}
        points={points}
        moves={moves}
        turn={turn}
        finish={finish}
        setT={setTime}
        grid={grid === "4x4" ? "grid4" : "grid6"}
        theme={theme || ""}
      />
      {finish && <Finish points={points} moves={moves} time={time} />}
    </main>
  );
}
