import React from "react";

export default function Score(props: { point: number; player: number }) {
  const { point, player } = props;
  return (
    <div className="s w-16 md:w-40 md:h-20 rounded-lg h-20 bg-newgame flex flex-col justify-center items-center gap-3">
      <p className="text-grey font-bold text-base">
        P<span className="hidden md:inline">layer </span>
        {player+1}
      </p>
      <p className="text-darkgrey font-bold text-2xl">{point}</p>
    </div>
  );
}
