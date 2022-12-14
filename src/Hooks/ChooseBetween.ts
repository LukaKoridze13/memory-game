const ChooseBetween = (
  state: string,
  setState: (arg:string) => void,
  stateValue: string,
  stateValueTwo: string,
  ref: React.RefObject<HTMLButtonElement>,
  refTwo: React.RefObject<HTMLButtonElement>
) => {
  return () => {
    if (state === stateValue) {
      setState(stateValueTwo);
      ref.current?.classList.remove("first:!bg-darkest");
      refTwo.current?.classList.add("!bg-darkest");
    } else {
      setState(stateValue);
      ref.current?.classList.add("first:!bg-darkest");
      refTwo.current?.classList.remove("!bg-darkest");
    }
  };
};
export default ChooseBetween;
