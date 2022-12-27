import axios from "axios";
import React, { useEffect, useState } from "react";
const { REACT_APP_API, REACT_APP_TOKEN } = process.env;
export default function Leaderboard() {
  const [filter, setFilter] = useState<string>("time");
  const [grid, setGrid] = useState<string>("grid4");
  const [ref, setRef] = useState<boolean>(true);
  const [data, setData] = useState<
    {
      player: string;
      seconds: number;
      minutes: number;
      hours: number;
      moves: number;
    }[]
  >([]);
  const [filteredData, setFilteredData] = useState<
    {
      player: string;
      seconds: number;
      minutes: number;
      hours: number;
      moves: number;
    }[]
  >([]);
  const [fetch, setFetch] = useState(true);
  function format(seconds: number, minutes: number, hours: number): string {
    if (minutes < 1 && hours < 1) {
      return `${seconds}s`;
    } else if (hours < 1) {
      return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}s`;
    } else {
      return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }s`;
    }
  }
  useEffect(() => {
    axios.get(`${REACT_APP_API}${grid}`).then((res) => {
      setData(res.data);
    });
  }, [fetch, grid]);
  useEffect(() => {
    let x;
    if (filter === "time") {
      x = data.sort((a, b) => {
        let ax = a.hours * 3600 + a.minutes * 60 + a.seconds;
        let bx = b.hours * 3600 + b.minutes * 60 + b.seconds;
        return ax - bx;
      });
    } else {
      x = data.sort((a, b) => {
        return a.moves - b.moves;
      });
    }
    x=x.filter((v, i, a) => a.findIndex((v2) => v2.player === v.player) === i);
    setFilteredData(x)
    setRef(!ref);
  }, [filter, grid,data]);
  return (
    <div className="w-60">
      <p className="text-center text-darkwhite font-bold text-2xl mb-5">
        <span
          onClick={() => {
            setGrid("grid4");
          }}
          className={`${grid === "grid6" && "opacity-25"} cursor-pointer`}>
          4X4
        </span>{" "}
        <span
          onClick={() => {
            setGrid("grid6");
          }}
          className={`${grid === "grid4" && "opacity-25"} cursor-pointer`}>
          6X6
        </span>
      </p>
      <p className="text-center text-darkwhite font-bold text-base mb-5">
        <span
          onClick={() => {
            setFilter("time");
          }}
          className={`${filter === "moves" && "opacity-25"} cursor-pointer`}>
          Time
        </span>{" "}
        <span
          onClick={() => {
            setFilter("moves");
          }}
          className={`${filter === "time" && "opacity-25"} cursor-pointer`}>
          Moves
        </span>
      </p>

      {filteredData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="text-darkwhite font-bold border-collapse block w-60">
          <thead className="w-60 block">
            <tr className="text-left bg-grey block w-full">
              <th className="p-2 w-3/12 inline-block">Rank</th>
              <th className="p-2 w-5/12 inline-block">User</th>
              {filter === "time" ? (
                <th className="p-2 w-4/12 inline-block">Time</th>
              ) : (
                <th className="p-2 w-4/12 inline-block">Moves</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-bluegrey block h-56 overflow-y-scroll">
            {filteredData.map((item, i) => {
              return (
                <tr key={`tr${i}`} className="w-full block">
                  <td className="p-2 w-3/12 inline-block">{i + 1}</td>
                  <td className="p-2 w-5/12 inline-block">{item.player}</td>
                  <td className="p-2 w-4/12 inline-block">
                    {filter === "time"
                      ? format(item.seconds, item.minutes, item.hours)
                      : item.moves}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
