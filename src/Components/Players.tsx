import React from "react";
export default function Players(props: {
  text: string;
  save: React.RefObject<HTMLButtonElement>;
  onClick: (event:React.MouseEvent) => void;
}) {
  const { text, save, onClick } = props;
  return (
    <button
      ref={save}
      onClick={onClick}
      className="players bg-lightgrey first:!bg-darkest w-14 h-10 md:w-32 md:h-16 flex items-center justify-center rounded-3xl text-base md:text-3xl text-darkwhite font-bold cursor-pointer hover:bg-bluegrey">
      {text}
    </button>
  );
}
