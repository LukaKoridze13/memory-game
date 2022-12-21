import React from "react";

export default function Card(props: {id:number, content: number | JSX.Element, checked: boolean, opened: boolean, onClick: (id:number,checked:boolean, opened:boolean)=> void }) {
    const {id,content,checked,opened, onClick} = props
  return (
    <div onClick={()=>{onClick(id,checked,opened)}} className={`${opened && '!bg-lightgrey'} ${opened && 'pointer-events-none'} ${checked && '!bg-orange'} w-full rounded-full aspect-square bg-darkgrey flex items-center justify-center font-bold text-darkwhite text-xs cursor-pointer md:text-4xl hover:bg-bluegrey`}>{(checked || opened) && content} {content}</div>
  );
}
