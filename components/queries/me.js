import { gql } from '@apollo/client';

const ME = gql`
  query me {
    me {
      id
      fullName
      taskCount
    }
  }
`;

export default ME;
