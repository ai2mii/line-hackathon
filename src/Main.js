import React, { Component } from 'react'
import { Layout } from 'antd';
import ReportForm from './ReportForm'
import thinknetLogo from './logo_thinknet.png'
const { Header, Footer, Sider, Content } = Layout;


class MainPage extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Header style={{ background: 'white'}}>
            <img src={thinknetLogo} width="200px" alt="logo"/>
          </Header>
          <Content>
            <ReportForm />
          </Content>
          <Footer style={{ background: 'white'}}></Footer>
        </Layout>
      </div>
    );
  }
}

export default MainPage;
