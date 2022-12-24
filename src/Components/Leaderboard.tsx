import axios from "axios";
import { stringify } from "querystring";
import React, { useEffect, useState } from "react";
const { REACT_APP_API, REACT_APP_TOKEN } = process.env;
export default function Leaderboard() {
  const [filter, setFilter] = useState<string>("time");
  const [grid, setGrid] = useState<string>("grid4");
  const [ref,setRef] = useState<boolean>(true)
  const [data, setData] = useState<
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
      return `${minutes}:${seconds < 10 ? `0${seconds}s` : seconds}s`;
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
  }, [fetch]);
  useEffect(() => {
    if (filter === "time") {
      let x=data.sort((a, b) => {
        let ax = a.hours * 3600 + a.minutes * 60 + a.seconds;
        let bx = b.hours * 3600 + b.minutes * 60 + b.seconds;
        return ax - bx;
      });
      setData(x);
    } else {
      let x= data.sort((a, b) => {
        return a.moves - b.moves;
      });
      setData(x);
    }
    setRef(!ref)
  }, [filter,data]);
  return (
    <div className="w-72">
      <p className="text-center text-darkwhite font-bold text-2xl mb-5">
        {grid === "grid4" ? "4X4" : "6X6"}
      </p>

      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full text-darkwhite font-bold border-collapse">
          <thead>
            <tr className="text-left bg-grey">
              <th className="w-2/12 p-2">Rank</th>
              <th className="w-4/12 p-2">User</th>
              {filter === "time" ? (
                <th className="w-4/12 p-2">Time</th>
              ) : (
                <th className="w-4/12 p-2">Moves</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-bluegrey">
            {data.map((item, i) => {
              return (
                <tr key={`tr${i}`}>
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{item.player}</td>
                  <td className="p-2">
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
