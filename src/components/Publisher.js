import React from "react";
import { Button, Card} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
const Publisher = ({ data }) => {

  const { TITLE, PUBLISHER, TIMESTAMP, ID } = data;
  console.log("time", TIMESTAMP);
  return (
    <Card title={TITLE} style={{ width: 400 }}>
      <Link to={`/Publisher/${ID}`}>
        <Button type="primary">{PUBLISHER}</Button>
      </Link>
      <span className="timestamp">
        {moment(data.TIMESTAMP).format("DD/MM/YYYY")}
      </span>
    </Card>
  );
};

export default Publisher;
