import React, { useState } from "react";
export default function Scores(props: {
  players: number;
  points: number[];
  moves: number;
}) {
  const { players, points, moves } = props;
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [time, setTime] = useState<string>("0");
  // Handels time
  React.useEffect(() => {
    let sec = setInterval(() => {
      if (seconds === 59) {
        setSeconds(0);
      } else {
        setSeconds(seconds + 1);
      }
    }, 1000);
    return () => {
      clearInterval(sec);
    };
  }, [seconds]);
  React.useEffect(() => {
    let min = setInterval(() => {
      if (minutes === 59) {
        setMinutes(0);
      } else {
        setMinutes(minutes + 1);
      }
    }, 60000);
    return () => {
      clearInterval(min);
    };
  }, [minutes]);
  React.useEffect(() => {
    let hour = setInterval(() => {
      setHours(hours + 1);
    }, 3600000);
    return () => {
      clearInterval(hour);
    };
  }, [hours]);
  React.useEffect(() => {
    console.log(hours, minutes, seconds);
    if (minutes < 1 && hours < 1) {
      setTime(`${seconds}`);
    } else if (hours < 1) {
      setTime(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
    } else {
      setTime(
        `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
          seconds < 10 ? `0${seconds}` : seconds
        }`
      );
    }
  }, [seconds]);
  // Return
  if (players > 1) {
    return (
      <div>
        {points.map(() => {
          return <div></div>;
        })}
      </div>
    );
  } else {
    return (
      <div className="flex justify-between w-full md:justify-center gap-8 md:mt-20">
        <div className="h-16 w-5/12 flex flex-col justify-evenly items-center bg-newgame rounded-xl md:w-80 md:h-20">
          <p className="text-grey font-bold text-base">Time</p>
          <p className="text-darkgrey font-bold text-2xl">{time}</p>
        </div>
        <div className="h-16 w-5/12 flex flex-col justify-evenly items-center bg-newgame rounded-xl md:w-80 md:h-20">
          <p className="text-grey font-bold text-base">Moves</p>
          <p className="text-darkgrey font-bold text-2xl">{moves}</p>
        </div>
      </div>
    );
  }
}
