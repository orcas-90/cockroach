import { cnInsect } from "./Insect.classname";
import { useState, type MouseEvent, useEffect } from "react";
import { uid } from "uid";

import type { DragEventHandler, FC, MouseEventHandler } from "react";

import "./Insect.css";

let timer: string | number | NodeJS.Timer | undefined;

type Cockr = {
  id: string;
  cockr: string;
  top: string;
  left: string;
};

const Insect = () => {
  const [addCockr, setaddCockr] = useState<Cockr[]>([]);
  const [second, setSecond] = useState(0);
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    console.log(addCockr);
    if (addCockr.length === 0) {
      clearInterval(timer);
    }
  }, [addCockr]);

  useEffect(() => {
    if (addCockr.length === 0) {
      setButtonState((buttonState) => (buttonState = false));
    }
  }, [addCockr]);

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    setSecond((second) => (second = 0));

    timer = setInterval(function () {
      setSecond((prev) => prev + 1);
      console.log(second);
    }, 1000);

    for (let i = 0; i < 10; i++) {
      let id = uid(10);
      const cockr = "🦗";
      const top = Math.random() * 300 + "px";
      const left = Math.random() * 400 + "px";

      addCockr.push({ cockr, id, top, left });
    }

    setaddCockr((prev) => [...prev]);
    console.log(addCockr);

    if (addCockr.length > 0) {
      setButtonState(true);
    }
  };

  const getDeleteCockr = (indexCur: string) => {
    return () => {
      setaddCockr((prev) =>
        prev.filter((cockroach) => cockroach.id !== indexCur),
      );
    };
  };

  return (
    <div className={cnInsect()}>
      <button
        className={cnInsect("Button")}
        disabled={buttonState}
        onClick={handleClick}
      >
        🦗
      </button>
      {addCockr.map((cockroach) => (
        <div
          className={cnInsect("Cockr")}
          key={cockroach.id}
          onClick={getDeleteCockr(cockroach.id)}
          style={{
            top: cockroach.top,
            left: cockroach.left,
          }}
        >
          {cockroach.cockr}
        </div>
      ))}
      <div>Your game's time: {second} seconds!</div>
    </div>
  );
};

export { Insect };
