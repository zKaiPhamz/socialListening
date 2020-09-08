import { gql } from '@apollo/client';

const SEARCH_POST = gql`
  query searchPost ($content: String, $offset: Int, $limit: Int) {
    posts(where: { content: { _similar: $content } }, limit: $limit, offset: $offset, order_by: { id: desc }) {
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

export default SEARCH_POST;
