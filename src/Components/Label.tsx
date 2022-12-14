import React from "react";

export default function Label(props: { text: string }) {
  const { text } = props;
  return <p className="text text-grey font-bold text-base md:text-xl">{text}</p>;
}
