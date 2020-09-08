import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import {
  Row, Typography, Col, Card as CardPaper,
} from 'antd';
import { useLazyQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';

import Layout from '../components/common/Layout';
import GET_POST from '../graphql/queries/getPostById';
import Card from '../components/common/Card';

const Fanpage = () => {
  const accessToken = Cookies.get('token');
  const clone = Cookies.get('pageInfos');
  const [pageInfos, setPageInfos] = useState();
  const [loadPost, { loading, data }] = useLazyQuery(GET_POST);

  useEffect(() => {
    const pageInfosJson = JSON.parse(clone);
    setPageInfos(pageInfosJson);
  }, [clone]);

  const renderPage = () => {
    if (pageInfos) {
      return (
        <Row gutter={[16, 16]}>
          {
            pageInfos.map((pageInfo) => (
              <Col span={4} key={pageInfo.id}>
                <CardPaper
                  hoverable
                  cover={<img alt="example" src={pageInfo.picture.data.url} />}
                  onClick={() => loadPost({
                    variables: {
                      id: pageInfo.id,
                      offset: 0,
                      limit: 10,
                    },
                  })}
                >
                  <CardPaper.Meta title={pageInfo.name} description={`id: ${pageInfo.id}`} />
                </CardPaper>
              </Col>
            ))
          }
        </Row>
      );
    }
    return (
      <Row align="center">
        <Typography.Title>Không tìm thấy Trang nào từ tài khoản của bạn</Typography.Title>
      </Row>
    );
  };

  const renderPost = () => {
    if (loading) {
      return (
        <Row justify="center" style={{ paddingTop: 200 }}>
          <LoadingOutlined style={{ fontSize: 200 }} spin />
        </Row>
      );
    }

    if (data && data.posts) {
      if (data.posts.length === 0) {
        return (
          <Row align="center">
            <Typography.Title level={4}>
              Chúng tôi không tìm thấy bài viết nào trong dữ liệu của chúng tôi trên trang của bạn
            </Typography.Title>
          </Row>
        );
      }
      return (
        <Row gutter={[16, 16]}>
          {data.posts.map((post) => (
            <Col span={12} key={post.id}>
              <Card post={post} />
            </Col>
          ))}
        </Row>
      );
    }
    return <></>;
  };

  if (!accessToken) {
    return (
      <Layout>
        <Row align="center">
          <Typography.Title>Bạn Chưa Đăng Nhập</Typography.Title>
        </Row>
      </Layout>
    );
  }

  return (
    <Layout>
      <Row align="center">
        <Typography.Title level={3}>Trang Của Bạn</Typography.Title>
      </Row>
      {renderPage()}
      {renderPost()}
    </Layout>
  );
};

export default Fanpage;
