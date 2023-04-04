import React from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Space } from 'antd'

export const App: React.FC = () => {
  const { Header, Content } = Layout
  return (
    <Space direction='vertical' style={{ width: '100%' }} size={[0, 48]}>
      <Layout className='vh-100'>
        <Header>
          <h4 className='text-white mt-3'>Move Smart</h4>
        </Header>
        <Content className='p-3'>
          <Outlet />
        </Content>
      </Layout>
    </Space>
  )
}
