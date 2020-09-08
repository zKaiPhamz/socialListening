import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Avatar, Typography, Row, Button,
} from 'antd';

import openNotification from '../../helper/notification';

const Login = () => {
  const [accessToken, setAccessToken] = useState(Cookies.get('token'));
  const getPageInfo = async (accessTokenHere) => {
    const getPageUrl = `https://graph.facebook.com/me/accounts?fields=picture,name&access_token=${accessTokenHere}`;
    try {
      const pageResponse = await axios.get(getPageUrl);
      if (pageResponse && pageResponse.data) {
        Cookies.set('pageInfos', JSON.stringify(pageResponse.data.data));
      }
    } catch (e) {
      Cookies.set('pageInfos', JSON.stringify([]));
    }
  };

  const responseFacebook = async (response) => {
    await getPageInfo(response.accessToken);
    Cookies.set('id', response.id);
    Cookies.set('name', response.name);
    Cookies.set('imgLink', response.picture.data.url);
    openNotification('Success', 'Đăng nhập Thành Công', 'success');
    Cookies.set('token', response.accessToken);
    setAccessToken(response.accessToken);
  };

  if (!accessToken) {
    return (
      <FacebookLogin
        appId="2931610017126226"
        autoLoad
        fields="name,email,picture"
        scope="pages_manage_engagement"
        callback={responseFacebook}
        icon="fa-facebook"
        buttonStyle={{ fontSize: 10, padding: 10, borderRadius: 20 }}
      />
    );
  }

  return (
    <Row>
      <Avatar size={50} src={Cookies.get('imgLink')}>W</Avatar>
      <div>
        <Typography.Text style={{ color: '#fff', fontWeight: 900 }}>{Cookies.get('name')}</Typography.Text>
        <Button
          type="primary"
          style={{
            color: '#fff', fontWeight: 900, display: 'block',
          }}
          onClick={() => {
            Cookies.remove('token');
            setAccessToken('');
          }}
        >
          Đăng Xuất
        </Button>
      </div>
    </Row>
  );
};

export default Login;
