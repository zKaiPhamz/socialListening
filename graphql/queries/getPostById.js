import { gql } from '@apollo/client';

const GET_POST = gql`
  query searchPost ($id: String, $offset: Int, $limit: Int) {
    posts(where: { page_id: { _similar: $id } }, limit: $limit, offset: $offset, order_by: { id: desc }) {
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
`;

export default GET_POST;
