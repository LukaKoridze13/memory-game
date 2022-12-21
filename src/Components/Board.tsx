import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPoo,
  faBomb,
  faCar,
  faGhost,
  faShip,
  faBaby,
  faRocket,
  faHippo,
  faSun,
  faMoon,
  faAnchor,
  faAmbulance,
  faAtom,
  faSwimmer,
  faBiking,
  faTractor,
  faSnowman,
  faSnowflake,
} from "@fortawesome/free-solid-svg-icons";
import Card from "./Card";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
interface card {
  id: number;
  opened: boolean;
  content: JSX.Element;
  checked: boolean;
}
const random16 = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
const random36 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];
const icons16 = [
  faPoo,
  faBomb,
  faCar,
  faGhost,
  faShip,
  faBaby,
  faRocket,
  faHippo,
  faPoo,
  faBomb,
  faCar,
  faGhost,
  faShip,
  faBaby,
  faRocket,
  faHippo,
];
const icons36 = [
  faPoo,
  faBomb,
  faCar,
  faGhost,
  faShip,
  faBaby,
  faRocket,
  faHippo,
  faSun,
  faMoon,
  faAnchor,
  faAmbulance,
  faAtom,
  faSwimmer,
  faBiking,
  faTractor,
  faSnowman,
  faSnowflake,
  faPoo,
  faBomb,
  faCar,
  faGhost,
  faShip,
  faBaby,
  faRocket,
  faHippo,
  faSun,
  faMoon,
  faAnchor,
  faAmbulance,
  faAtom,
  faSwimmer,
  faBiking,
  faTractor,
  faSnowman,
  faSnowflake,
];
export default function Board(props: {
  grid: number;
  theme: string | undefined;
}) {
  const { grid, theme } = props;
  const [cards, setCards] = useState<card[]>([]);
  const [refresh, setRefresh] = useState<boolean>(true);
  const [check, setCheck] = useState<number>(0);
  function shuffleArray(array: number[] | IconDefinition[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function checkCard(id: number, checked: boolean, opened: boolean) {
    if (check < 2 && !checked && !opened) {
      cards.forEach((card) => {
        if (card.id === id) {
          card.checked = true;
        }
      });
      setCards(cards);
      setRefresh(!refresh);
      setCheck(check + 1);
    }
  }
  function areSame() {
    if (check === 2) {
      let checkers = cards.filter((card) => card.checked);
      if (theme === "Numbers") {
        if (checkers[0].content.props.num === checkers[1].content.props.num) {
          cards.forEach((card) => {
            if (card.checked) {
              card.opened = true;
              card.checked = false;
            }
          });
          setCards(cards);
          setRefresh(!refresh);
          setCheck(0);
        } else {
          setTimeout(() => {
            cards.forEach((card) => {
              card.checked = false;
            });
            setCards(cards);
            setRefresh(!refresh);
            setCheck(0);
          }, 1500);
        }
      } else {
        if (
          checkers[0].content.props.icon.iconName ===
          checkers[1].content.props.icon.iconName
        ) {
          cards.forEach((card) => {
            if (card.checked) {
              card.opened = true;
              card.checked = false;
            }
          });
          setCards(cards);
          setRefresh(!refresh);
          setCheck(0);
        } else {
          setTimeout(() => {
            cards.forEach((card) => {
              card.checked = false;
            });
            setCards(cards);
            setRefresh(!refresh);
            setCheck(0);
          }, 1500);
        }
      }
    }
  }
  useEffect(() => {
    if (cards.length === 0) {
      if (theme === "Numbers") {
        if (grid === 4) {
          shuffleArray(random16);
          for (let i = 0; i < grid * grid; i++) {
            cards.push({
              id: i + 1,
              opened: false,
              checked: false,
              content: <Num num={random16[i]} />,
            });
          }
          setCards(cards);
          setRefresh(!refresh);
        } else {
          shuffleArray(random36);
          for (let i = 0; i < grid * grid; i++) {
            cards.push({
              id: i + 1,
              opened: false,
              checked: false,
              content: <Num num={random36[i]} />,
            });
          }
          setCards(cards);
          setRefresh(!refresh);
        }
      } else {
        if (grid === 4) {
          shuffleArray(icons16);

          for (let i = 0; i < grid * grid; i++) {
            cards.push({
              id: i + 1,
              opened: false,
              checked: false,
              content: <FontAwesomeIcon icon={icons16[i]} />,
            });
          }
          setCards(cards);
          setRefresh(!refresh);
        } else {
          shuffleArray(icons36);

          for (let i = 0; i < grid * grid; i++) {
            cards.push({
              id: i + 1,
              opened: false,
              checked: false,
              content: <FontAwesomeIcon icon={icons36[i]} />,
            });
          }
          setCards(cards);
          setRefresh(!refresh);
        }
      }
    }
  }, []);
  useEffect(() => {
    areSame();
  }, [check]);
  return (
    <div
      className={`board w-full aspect-square max-w-xl grid ${
        grid === 4 ? "grid-cols-4" : "grid-cols-6"
      } mt-20 md:mt-28 gap-3 md:gap-5`}>
      {cards.map((card) => {
        const { content, checked, opened, id } = card;
        return (
          <Card
            content={content}
            checked={checked}
            opened={opened}
            id={id}
            key={id}
            onClick={checkCard}
          />
        );
      })}
    </div>
  );
}

function Num(props: { num: number }) {
  const { num } = props;
  return <div>{num}</div>;
}
