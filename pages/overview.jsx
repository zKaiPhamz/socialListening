import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Pie, Line } from 'react-chartjs-2';
import { Row, Col, Button } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useQuery } from '@apollo/client';

import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import GET_TIME_COMMENTS from '../graphql/queries/getTimeComments';
import dateTimeFormat from '../helper/dateTimeFormat';

const OverView = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [lineLabel, setLineLabel] = useState([]);
  const [posData, setPosData] = useState([]);
  const [negData, setNegData] = useState([]);
  const [neuData, setNeuData] = useState([]);
  const { data } = useQuery(GET_TIME_COMMENTS, { variables: { postId } });
  let post;
  let pieData;
  const pieOptions = {
    responsive: false,
    legend: {
      position: 'left',
      labels: {
        boxWidth: 20,
      },
    },
  };
  useEffect(() => {
    if (data && data.comments_aggregate && data.comments_aggregate.nodes) {
      const cloneData = data.comments_aggregate.nodes;
      const dateList = [];
      const posTime = [];
      const negTime = [];
      const neuTime = [];
      cloneData.forEach((comment) => {
        if (comment.created_at) {
          const date = dateTimeFormat.format(
            parseInt(`${comment.created_at}000`, 10),
          );
          const index = dateList.indexOf(date);
          if (index !== -1) {
            if (comment.label === '__lb__negative') negTime[index] += 1;
            else if (comment.label === '__lb__positive') posTime[index] += 1;
            else if (comment.label === '__lb__neutral') neuTime[index] += 1;
          } else {
            dateList.push(date);
            posTime.push(0);
            negTime.push(0);
            neuTime.push(0);
            if (comment.label === '__lb__negative') negTime[0] += 1;
            else if (comment.label === '__lb__positive') posTime[0] += 1;
            else if (comment.label === '__lb__neutral') neuTime[0] += 1;
          }
        }
      });

      setLineLabel(dateList);
      setPosData(posTime);
      setNegData(negTime);
      setNeuData(neuTime);
    }
  }, [data]);

  if (typeof router.query.post !== 'undefined') {
    post = JSON.parse(router.query.post);
    pieData = {
      labels: ['Tích Cực', 'Tiêu Cực', 'Trung Lập'],
      datasets: [
        {
          data: [
            post.pos_total ? post.pos_total : 0,
            post.neg_total ? post.neg_total : 0,
            post.neu_total ? post.neu_total : 0,
          ],
          backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
          label: 'Biểu đồ đánh giá của người dùng',
        },
      ],
    };
  }

  const lineData = {
    labels: lineLabel,
    datasets: [
      {
        label: 'Tích Cực',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#36A2EB',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#36A2EB',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#36A2EB',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: posData,
      },
      {
        label: 'Trung Lập',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#FFCE56',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#FFCE56',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#FFCE56',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: neuData,
      },
      {
        label: 'Tiêu Cực',
        fill: false,
        lineTension: 0.1,
        backgroundColor: '#FF6384',
        borderColor: '#FF6384',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#FF6384',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#FF6384',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: negData,
      },
    ],
  };

  if (post && pieData) {
    const handle = (label) => {
      router.push({
        pathname: '/detail',
        query: { label, postId: `${post.post_id}` },
      });
    };

    return (
      <Layout>
        <Card post={post} />
        <Row justify="space-around" align="center" style={{ marginTop: 16 }}>
          <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
            <Pie data={pieData} height={300} width={400} options={pieOptions} />
          </Col>

          <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
            <Line
              data={lineData}
              height={300}
              width={500}
              options={pieOptions}
            />
          </Col>
        </Row>

        <Row justify="space-around" style={{ marginTop: 16 }}>
          <Button
            style={{
              backgroundColor: '#36A2EB',
              color: '#fff',
              fontWeight: 'bold',
            }}
            onClick={() => handle('__lb__positive')}
          >
            Tích Cực
          </Button>

          <Button
            style={{
              backgroundColor: '#FF6384',
              color: '#fff',
              fontWeight: 'bold',
            }}
            onClick={() => handle('__lb__negative')}
          >
            Tiêu Cực
          </Button>

          <Button
            style={{
              backgroundColor: '#FFCE56',
              color: '#fff',
              fontWeight: 'bold',
            }}
            onClick={() => handle('__lb__neutral')}
          >
            Trung Lập
          </Button>
        </Row>
      </Layout>
    );
  }
  return (
    <Layout>
      <Row justify="center" style={{ paddingTop: 200 }}>
        <LoadingOutlined style={{ fontSize: 200 }} spin />
      </Row>
    </Layout>
  );
};

export default OverView;
