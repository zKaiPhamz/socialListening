import { gql } from '@apollo/client';

const GET_COMMENTS = gql`
  query MyQuery($label: String, $postId: String, $limit: Int, $offset: Int) {
    comments_aggregate(limit: $limit, offset: $offset, where: {label: {_eq: $label}, post_id: {_eq: $postId}}) {
      nodes {
        id
        content
        comment_id
        created_at
        user_avatar
        user_name
      }
    }
  }
`;

export default GET_COMMENTS;
