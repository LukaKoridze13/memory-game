import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import PlayerCard from "./PlayerCard";

export default function Finish(props: {
  points: number[][];
  moves: number;
  time: string;
}) {
  let { points, moves, time } = props;
  const [winners,setWinners] = useState<number[][]>([])
  const navigate = useNavigate();
  React.useEffect(() => {
    points.sort((a, b) => b[0]-a[0]);
    let max = 0;
    points.forEach((i)=>{
        if(i[0]>max){
            max=i[0]
        }
    })
    points.forEach((p)=>{
        if(p[0]>=max){
            if(!winners.includes(p)){
                winners.push(p)
            }
        }
    })
    setWinners(winners)
  });
  return (
    <div className="w-screen h-screen bg-menu flex justify-center items-center absolute top-0 left-0">
      <div className="bg-darkwhite w-11/12 flex flex-col gap-4 rounded-3xl items-center py-5 max-w-2xl  ">
        <p className="md:text-5xl text-darkest font-bold text-2xl">
          {points.length === 1 && "You did it!"}
          {winners.length > 1 && "It's a tie!"}
          {winners.length === 1 && `Player ${winners[0][1]} Wins`}
        </p>
        <p className="text-grey md:text-lg text-sm">
          Game over! Here are the results…
        </p>
        {points.length > 1 ? (
          <div className="w-full flex flex-col gap-3">
            {points.map((p, i) => {
                let winner = false;
                if(winners.includes(p)){
                    winner=true
                }
              return (
                <PlayerCard points={p[0]} player={p[1]} key={"point" + i} winner={winner}/>
              );
            })}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <div className="w-4/5 flex justify-between items-center p-4 bg-newgame rounded-md mx-auto">
              <p className="font-bold text-sm text-grey">Time Elapsed</p>
              <p className="font-bold text-darkest text-xl">{time}</p>
            </div>
            <div className="w-4/5 flex justify-between items-center p-4 bg-newgame rounded-md mx-auto">
              <p className="font-bold text-sm text-grey">Moves Taken</p>
              <p className="font-bold text-darkest text-xl">{moves}</p>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="bg-orange h-12 w-4/5 rounded-3xl flex justify-center items-center text-lg text-darkwhite font-bold">
          Restart
        </button>
        <button
          className="bg-newgame h-12 w-4/5 rounded-3xl flex justify-center items-center text-lg text-darkgrey font-bold"
          onClick={() => {
            navigate("/");
          }}>
          New Game
        </button>
      </div>
    </div>
  );
}
