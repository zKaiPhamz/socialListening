import { gql } from '@apollo/client';

const GET_TIME_COMMENTS = gql`
  query MyQuery($postId: String) {
    comments_aggregate(order_by: {created_at: asc}, where: {post_id: {_eq: $postId}}) {
      nodes {
        label
        created_at
      }
    }
  }
`;

export default GET_TIME_COMMENTS;
