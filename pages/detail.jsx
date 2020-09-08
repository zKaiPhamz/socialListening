import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {
  Row, Avatar, Comment, Button, Col,
} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import Layout from '../components/common/Layout';
import RemoveComment from '../components/common/RemoveComment';
import GET_COMMENTS from '../graphql/queries/getComments';
import dateTimeFormat from '../helper/dateTimeFormat';

const OverView = () => {
  const [loading, setLoading] = useState(false);
  const { postId, label } = useRouter().query;
  const { data, fetchMore } = useQuery(GET_COMMENTS, {
    variables: {
      postId,
      label,
      limit: 10,
      offset: 0,
    },
  });

  const handleLoadMore = async () => {
    setLoading(true);

    await fetchMore({
      variables: {
        offset: data.comments_aggregate.nodes.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          comments_aggregate: {
            ...prev.comments_aggregate,
            nodes: [
              ...prev.comments_aggregate.nodes,
              ...fetchMoreResult.comments_aggregate.nodes,
            ],
          },
        };
      },
    });

    setLoading(false);
  };

  if (data && data.comments_aggregate && data.comments_aggregate.nodes) {
    return (
      <Layout>
        <Row gutter={[16, 8]}>
          {data.comments_aggregate.nodes.map((comment) => (
            <Col span={12}>
              <Comment
                author={
                  <a>{comment.user_name ? comment.user_name : 'Whatever'}</a>
                }
                avatar={(
                  <Avatar
                    src={
                      comment.user_avatar
                        ? comment.user_avatar
                        : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    }
                    alt="Han Solo"
                  />
                )}
                content={<p>{comment.content}</p>}
                style={{
                  backgroundColor: '#fff',
                  paddingLeft: 16,
                  paddingRight: 16,
                  borderRadius: 8,
                  marginBottom: 16,
                }}
                datetime={(
                  <Row gutter={16}>
                    <Col>
                      <p>
                        {comment.created_at
                          ? dateTimeFormat.format(
                            parseInt(`${comment.created_at}000`, 10),
                          )
                          : ''}
                      </p>
                    </Col>

                    <Col>
                      <a
                        rel="noreferrer"
                        target="_blank"
                        href={`https://www.facebook.com/${comment.comment_id}`}
                      >
                        click me
                      </a>
                    </Col>

                    <Col>
                      <RemoveComment
                        postId={postId}
                        commentId={comment.comment_id}
                        id={comment.id}
                      />
                    </Col>
                  </Row>
                )}
              />
            </Col>
          ))}
        </Row>
        <Button
          onClick={() => handleLoadMore()}
          type="primary"
          loading={loading}
        >
          Get More
        </Button>
      </Layout>
    );
  }
  return (
    <Layout>
      <Row justify="center" style={{ paddingTop: 200 }}>
        <LoadingOutlined style={{ fontSize: 200 }} spin />
      </Row>
    </Layout>
  );
};

export default OverView;
