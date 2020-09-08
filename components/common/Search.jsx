import React from 'react';
import { Input } from 'antd';
import Router from 'next/router';

const Search = () => {
  const handleSearch = (key) => {
    Router.push({
      pathname: '/search',
      query: { key },
    });
  };

  return (
    <Input.Search
      placeholder="Search..."
      onSearch={(key) => handleSearch(key)}
      style={{ width: 400, borderRadius: 50, marginRight: 16 }}
    />
  );
};

export default Search;
