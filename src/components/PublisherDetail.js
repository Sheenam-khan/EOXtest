import React, { useState, useEffect } from "react";

import { Card, Row, Col, Spin, notification } from "antd";
import moment from "moment";

const PublisherDetail = () => {
  const [datas, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchNews();
  }, []);
  const fetchNews = async () => {
    try {
      const response = await fetch(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/newsf6e2440.json"
      );
      const data = await response.json();
      setData(data);
      setLoading(false);
    } catch (err) {
      setLoading(true);
      notification.error({
        message: "Failed!",
        description: "Failed to fetch data !",
      });
    }
  };
 
  return (
    <div>
      {/* <div className="all_news"> */}
      <Row>
        {loading ? (
          <Spin tip="Loading" />
        ) : datas ? (
          datas.map((data) => (
            <Col span={8}>
              <Card title={data.TITLE} style={{ width: 400 }}>
                <h1 className="news__title">{data.TITLE}</h1>
                <p className="news__desc">{data.URL}</p>
                <span className="news__author">{data.PUBLISHER}</span> <br />
                <span className="news__published">
                  {moment(data.TIMESTAMP).format("DD/MM/YYYY")}
                </span>
                <span className="news__source">{data.HOSTNAME}</span>
              </Card>
            </Col>
          ))
        ) : (
          <Spin tip="Loading" />
        )}
      </Row>
    </div>

    //  </div>
  );
};

export default PublisherDetail;
