import { gql } from '@apollo/client';

const GET_NEW_POSTS = gql`
  query getNewPosts ($limit: Int, $offset: Int) {
    comments_aggregate(limit: $limit, offset: $offset, order_by: { id: desc }) {
      nodes{
        like
        share
        content
        post_id
        comment
        created_at
        img_link
        pos_total
        neg_total
        neu_total
      }
    }
  }
`;

export default GET_NEW_POSTS;
