import React, { useRef, useState } from "react";
import Score from "./Score";
export default function Scores(props: {
  players: number;
  points: number[][];
  moves: number;
  turn: number;
  finish:boolean;
  setT: (arg:string) => void
}) {
  const { players, points, moves, turn, finish,setT} = props;
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [time, setTime] = useState<string>("0");

  const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (ref.current?.children[turn] !== undefined) {
      for (let i = 0; i < players; i++) {
        ref.current?.children[i].classList.remove("!bg-orange");
        ref.current?.children[i].children[0].classList.remove(
          "!text-darkwhite"
        );
        ref.current?.children[i].children[1].classList.remove(
          "!text-darkwhite"
        );
      }
      ref.current?.children[turn].classList.add("!bg-orange");
      ref.current?.children[turn].children[0].classList.add("!text-darkwhite");
      ref.current?.children[turn].children[1].classList.add("!text-darkwhite");
    }
  });
  // Handels time
  React.useEffect(() => {
    if(!finish){
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
    }
  }, [seconds]);
  React.useEffect(() => {
    if(!finish){
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
    }
  }, [minutes]);
  React.useEffect(() => {
    if(!finish){
      let hour = setInterval(() => {
        setHours(hours + 1);
      }, 3600000);
      return () => {
        clearInterval(hour);
      };
    }
  }, [hours]);
  React.useEffect(() => {
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
  React.useEffect(() => {
    setT(time)
  }, [time]);
  // Return
  if (players > 1) {
    return (
      <div
        ref={ref}
        className="flex justify-evenly w-full md:justify-evenly md:mt-20 lg:flex-col lg:gap-4 lg:w-fit 2xl:w-full 2xl:gap-0 2xl:flex-row">
        {points.map((point, index) => {
          return <Score point={point[0]} player={index} key={`p${index}`} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="flex justify-between w-full md:justify-center gap-8 md:mt-20 lg:flex-col lg:gap-4 lg:w-fit 2xl:w-full 2xl:gap-0 2xl:flex-row">
        <div className="h-16 w-5/12 flex flex-col justify-evenly items-center bg-newgame rounded-xl md:w-80 md:h-20 md:flex-row">
          <p className="text-grey font-bold text-base">Time</p>
          <p className="text-darkgrey font-bold text-2xl">{time}</p>
        </div>
        <div className="h-16 w-5/12 flex flex-col justify-evenly items-center bg-newgame rounded-xl md:w-80 md:h-20 md:flex-row">
          <p className="text-grey font-bold text-base">Moves</p>
          <p className="text-darkgrey font-bold text-2xl">{moves}</p>
        </div>
      </div>
    );
  }
}
