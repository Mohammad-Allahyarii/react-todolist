import { SearchFavorite1 } from "iconsax-reactjs";
import React, { useEffect, useRef, useState } from "react";

const EmptyTasksList = () => {
  const [dotCount, setDotCount] = useState(0);

  const intervalRef = useRef();

  useEffect(() => {

typeWriteEffect()

    return () => clearInterval(intervalRef.current)
  }, []);

  const typeWriteEffect = () => {

    intervalRef.current = setInterval(() => {
      

      setDotCount((prev) => (
        prev >= 3 ? 0 : prev + 1
      ));
    }, 1000);

  }


  return (
    <h2 className="text-center text-my-dark flex justify-center items-center gap-2">
      <SearchFavorite1 className="text-my-dark" />
      <span>
        Empty
        <span>
          {Array.from({ length: dotCount })
            .map((_) => ".")
            .join("")}
        </span>
      </span>
    </h2>
  );
};

export default EmptyTasksList;
