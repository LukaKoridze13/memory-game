import React from "react";

export default function PlayerCard(props:{
    player: number;
    points: number;
    winner: boolean;
}) {
    const {player, points,winner} = props
  return (
    <div
      className={`w-4/5 flex justify-between items-center p-4 bg-newgame rounded-md mx-auto ${
        winner && "!bg-darkest"
      }`}>
      <p
        className={`font-bold text-sm text-grey ${
          winner && "!text-darkwhite"
        }`}>
        Player {player} {winner && '(Winner!)'}
      </p>
      <p
        className={`font-bold text-darkest text-xl ${
          winner && "!text-darkwhite"
        }`}>
        {points} Pairs
      </p>
    </div>
  );
}
