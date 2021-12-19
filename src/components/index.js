import { Card, Row, Input, Col, Spin, notification } from "antd";
import React, { useState, useEffect } from "react";
import Publisher from "./Publisher";
import Pagination from "./Pagination";
const { Search } = Input;

const List = () => {
  const [datas, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPerPage, setShowPerPage] = useState(9);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });

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
      setFilteredData(data);
      setLoading(false);
      console.log("response", data);
    } catch (err) {
      setLoading(true);
      notification.error({
        message: "Failed!",
        description: "Failed to fetch data !",
      });
    }
  };

  const onSearch = (text) => {
    console.log("text", text);
    const newColumns = Object.keys(datas[0]);
    const newDataSource =
      (text &&
        datas.filter((item) =>
          newColumns.some(
            (key) =>
              item[key] &&
              item[key]
                .toString()
                .toLowerCase()
                .indexOf(text.toString().toLowerCase()) > -1
          )
        )) ||
      datas;
    setFilteredData(newDataSource);
  };

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  return (
    <div>
      <h1 className="head__text">News Portal 👋</h1>
      <Search
        type="text"
        onSearch={onSearch}
        placeholder="Search"
        allowClear
        bordered
      />
      {/* <Input
        className="p-2 m-2 "
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
        allowClear
        bordered
      /> */}
      <div className="all__news">
        {loading ? (
          <Spin tip="Loading" />
        ) : filteredData ? (
          filteredData
            .slice(pagination.start, pagination.end)
            .map((publisher) => (
              <Publisher data={publisher} key={publisher.id} />
            ))
        ) : (
          <Spin tip="Loading" />
        )}
      </div>
      <Pagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={datas.length}
      />
    </div>
  );
};

export default List;
