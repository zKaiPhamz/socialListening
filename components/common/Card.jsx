import React from 'react';
import { Card, Col, Row } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {
  CommentOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';

import dateTimeFormat from '../../helper/dateTimeFormat';

const Content = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Text = styled.div`
  color: #1890ff;
`;

const MainCard = ({ post }) => {
  const date = post.created_at
    ? dateTimeFormat.format(parseInt(`${post.created_at}000`, 10))
    : '';

  return (
    <Link
      href={{
        pathname: '/overview',
        query: { post: JSON.stringify(post), postId: post.post_id },
      }}
    >
      <Card hoverable>
        <Row gutter={16}>
          <Col>
            {post.img_link && post.img_link.startsWith('http') ? (
              <img
                alt="example"
                src={post.img_link}
                style={{ width: 150, height: 150, borderRadius: 20 }}
              />
            ) : null}
          </Col>
          <Col style={{ flex: 1 }}>
            <div>Đăng lúc: {date}</div>
            <Content>{post.content}</Content>

            <Row justify="space-around">
              <Col>
                <LikeOutlined style={{ color: '#1890ff', fontSize: 20 }} />
                <Text>{post.like}</Text>
              </Col>

              <Col>
                <CommentOutlined style={{ color: '#1890ff', fontSize: 20 }} />
                <Text>{post.comment}</Text>
              </Col>

              <Col>
                <ShareAltOutlined style={{ color: '#1890ff', fontSize: 20 }} />
                <Text>{post.share}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};

MainCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default MainCard;
