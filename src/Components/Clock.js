import { useEffect, useRef, useState } from "react";

function Clock() {
  const secondsRef = useRef(null);
  const minutesRef = useRef(null);
  const hoursRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false); // State to track if the clock is running
  const intervalIdRef = useRef(null); // To store the interval ID

  useEffect(() => {
    function setTime() {
      const now = new Date();

      const seconds = now.getSeconds();
      const secondsDegrees = (seconds / 60) * 360;
      secondsRef.current.style.transform = `rotate(${secondsDegrees}deg)`;

      const minutes = now.getMinutes();
      const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
      minutesRef.current.style.transform = `rotate(${minutesDegrees}deg)`;

      const hours = now.getHours();
      const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
      hoursRef.current.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    if (isRunning) {
      setTime();
      intervalIdRef.current = setInterval(setTime, 1000);
    }

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [isRunning]);

  const stopClock = () => {
    setIsRunning(false);
  };

  const startClock = () => {
    setIsRunning(true);
  };
  return (
    <main>
      <section>
        <span ref={secondsRef}></span>
        <span ref={minutesRef}></span>
        <span ref={hoursRef}></span>
      </section>
      <section className="flex flex-row item-center justify-center text-black p-4  w-auto h-auto ">
        <button onClick={startClock} className="bg-gray-600 p-4">
          start
        </button>
        <button onClick={stopClock} className="bg-red-800 p-4">
          stops
        </button>
      </section>
    </main>
  );
}

export default Clock;
