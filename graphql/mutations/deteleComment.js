import { gql } from '@apollo/client';

const DELETE_COMMENT = gql`
  mutation MyMutation($id: Int!) {
    delete_comments_by_pk(id: $id) {
      __typename
    }
  }
`;

export default DELETE_COMMENT;
