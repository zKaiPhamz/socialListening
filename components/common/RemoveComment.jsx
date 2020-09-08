import React from 'react';
import { Button, Modal, Typography } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useMutation } from '@apollo/client';

import openNotification from '../../helper/notification';
import DELETE_COMMENT from '../../graphql/mutations/deteleComment';

const { confirm } = Modal;

const RemoveComment = ({ commentId, postId, id }) => {
  const [deleteComment, { error }] = useMutation(DELETE_COMMENT, {
    variables: {
      id: parseInt(id, 10),
    },
  });

  if (error) console.log(error);
  const remove = async () => {
    const token = Cookies.get('Token');
    const url = `https://graph.facebook.com/${postId}_${commentId}?access_token=${token}`;
    try {
      const response = await axios({
        method: 'delete',
        url,
      });
      if (response.data && response.data.success) {
        deleteComment();
        openNotification('Remove Success', 'Xóa comment thành công', 'success');
      }
    } catch (e) {
      openNotification(
        'Remove Fail',
        'Bạn không thể xóa comment này. Hãy chắc chắn bạn có quyền xóa commeny này',
        'error',
      );
    }
  };

  const handleRemoveTask = async () => {
    confirm({
      icon: <ExclamationCircleOutlined />,
      content: (
        <Typography.Text type="danger">
          Are You Sure To Delete It ?
        </Typography.Text>
      ),
      onOk() {
        remove();
      },
    });
  };

  return (
    <Button
      type="primary"
      danger
      onClick={() => handleRemoveTask()}
      size="small"
    >
      Remove
    </Button>
  );
};

RemoveComment.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RemoveComment;
