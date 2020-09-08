import React from 'react';
import { PageHeader, Row } from 'antd';
import Search from './Search';
import Login from '../auth/login';

const extra = () => (
  <Row key="1">
    <Search />
    <Login />
  </Row>
);
const Header = () => (
  <PageHeader
    title={[
      <div style={{ color: '#fff', fontFamily: 'monospace' }} key="1">Whatever</div>,
    ]}
    extra={[extra()]}
    style={{ backgroundColor: '#002140', color: 'red' }}
  />
);

export default Header;
