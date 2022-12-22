import React from "react";
import { useNavigate } from "react-router-dom";

export default function MobileMenu(props: {
  setVisible: (par: boolean) => void;
}) {
  const { setVisible } = props;
  const navigate = useNavigate()
  return (
    <div className="w w-screen h-screen bg-menu flex justify-center items-center absolute top-0 left-0">
      <div className="bg-darkwhite w-11/12 flex flex-col gap-4 rounded-3xl items-center py-5">
        <button className="bg-orange h-12 w-11/12 rounded-3xl flex justify-center items-center text-lg text-darkwhite font-bold">
          Restart
        </button>
        <button className="bg-newgame h-12 w-11/12 rounded-3xl flex justify-center items-center text-lg text-darkgrey font-bold" onClick={()=>{navigate('/')}}>
          New Game
        </button>
        <button
          className="bg-newgame h-12 w-11/12 rounded-3xl flex justify-center items-center text-lg text-darkgrey font-bold"
          onClick={() => setVisible(false)}>
          Resume Game
        </button>
      </div>
    </div>
  );
}
