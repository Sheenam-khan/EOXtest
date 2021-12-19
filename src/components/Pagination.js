import { Button } from "antd";
import React, { useState, useEffect } from "react";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);
  const [numberOfButtons, setNumberOfButoons] = useState(
    Math.ceil(total / showPerPage)
  );

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        type="primary"
        onClick={() => onButtonClick("prev")}
        style={{ marginRight: "10px" }}
      >
        Previous
      </Button>

      <Button type="primary" onClick={() => onButtonClick("next")}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
