import React from "react";

export default function Card(props: {id:number, content: number | JSX.Element, checked: boolean, opened: boolean, onClick: (id:number,checked:boolean, opened:boolean)=> void }) {
    const {id,content,checked,opened, onClick} = props
  return (
    <div onClick={()=>{onClick(id,checked,opened)}} className={`${opened && '!bg-lightgrey'} ${opened && 'pointer-events-none'} ${checked && '!bg-orange'} w-full rounded-full aspect-square bg-darkgrey flex items-center justify-center font-bold text-darkwhite text-2xl cursor-pointer md:text-5xl md:hover:bg-bluegrey lg:text-2xl 2xl:text-5xl`}>{(checked || opened) && content}</div>
  );
}
