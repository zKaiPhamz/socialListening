import React from 'react';
import {
  Typography, Row, Col, Button,
} from 'antd';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';

import Layout from '../components/common/Layout';
import SEARCH_POST from '../graphql/queries/searchPost';
import Card from '../components/common/Card';

const Home = () => {
  const router = useRouter();
  const { data, loading } = useQuery(SEARCH_POST, {
    variables: {
      content: '%%',
      offset: 0,
      limit: 4,
    },
  });

  const renderData = () => {
    if (loading) {
      return (
        <Row justify="center" style={{ paddingTop: 200 }}>
          <LoadingOutlined style={{ fontSize: 200 }} spin />
        </Row>
      );
    }
    if (data && data.posts) {
      return (
        <>
          <Typography.Title level={3}>Mới Nhất</Typography.Title>
          <Row gutter={[16, 16]}>
            {data.posts.map((post) => (
              <Col span={12} key={post.id}>
                <Card post={post} />
              </Col>
            ))}
          </Row>
          <Button
            type="primary"
            onClick={() => router.push({ pathname: '/search', query: { key: '' } })}
          >
            Watch More
          </Button>
        </>
      );
    }
    return <></>;
  };

  return <Layout>{renderData()}</Layout>;
};

export default Home;
