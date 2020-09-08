import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {
  Row, Col, Button, Typography,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import SEARCH_POST from '../graphql/queries/searchPost';

const Home = () => {
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const { key } = router.query;

  const { data, loading, fetchMore } = useQuery(SEARCH_POST, {
    variables: {
      content: `%${key}%`,
      limit: 10,
      offset: 0,
    },
  });

  const handleLoadMore = async () => {
    setLoad(true);

    await fetchMore({
      variables: {
        offset: data.posts.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          posts: [
            ...prev.posts,
            ...fetchMoreResult.posts,
          ],
        };
      },
    });

    setLoad(false);
  };

  if (loading) {
    return (
      <Layout>
        <Row justify="center" style={{ paddingTop: 200 }}>
          <LoadingOutlined style={{ fontSize: 200 }} spin />
        </Row>
      </Layout>
    );
  }

  if (data && data.posts) {
    return (
      <Layout>
        {key ? <Typography.Title level={3}>Kết quả tìm kiếm cho: {key}</Typography.Title> : ''}
        <Row gutter={[16, 16]}>
          {data.posts.map((post) => (
            <Col span={12} key={post.id}>
              <Card post={post} />
            </Col>
          ))}
        </Row>

        <Button onClick={() => handleLoadMore()} type="primary" loading={load}>
          Get More
        </Button>
      </Layout>
    );
  }
  return <Layout />;
};

export default Home;
