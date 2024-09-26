import { useState } from 'react';
import { Button, Layout, Menu, Row, Col, Card } from 'antd';
import BarChartComponent from '../../components/Charts/BarChartComponent.jsx';
import LineChartComponent from '../../components/Charts/LineChartComponent.jsx';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  return (
    <Content style={{ margin: '16px' }}>
      <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
        <h2>Welcome to the Dashboard</h2>
        <p>This is the main dashboard page.</p>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="Ventas vs Compras">
              <BarChartComponent />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Tendencia de Ventas y Compras">
              <LineChartComponent />
            </Card>
          </Col>
        </Row>
        {/* Add more dashboard content here */}
      </div>
    </Content>
  );
};

export default Dashboard;
