import React from "react";

export default function Header(props:{
    showMenu:(visible:boolean)=>void
}) {
    const {showMenu} = props
  return (
    <header className="flex justify-between items-center w-full">
      <h1 className="font-bold text-2xl text-darkest md:text-4xl">memory</h1>
      <button onClick={()=>showMenu(true)} className="md:hidden bg-orange w-20 h-10 flex justify-center items-center text-darkwhite font-bold text-base rounded-3xl">
        Menu
      </button>
      <div className="hidden md:flex gap-4">
        <button className="py-3 px-10 bg-orange hover:bg-lightorange text-darkwhite font-bold text-xl rounded-3xl">
          Restart
        </button>
        <button className="py-3 px-6 bg-newgame hover:bg-bluegrey text-darkest font-bold text-xl rounded-3xl">
          New Game
        </button>
      </div>
    </header>
  );
}
