import React, { Component } from 'react';
import { Layout, Form, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modalpopup from './modal';
import userMessage from '../state_manager/actions/user_details/user_message';
import updateMsg from '../state_manager/actions/user_details/update_msg';

import 'antd/dist/antd.css';
import './App.css';

import randomText from './random_text.json';

const { Header, Footer, Sider, Content } = Layout;

class Chatbot extends Component {
  formRef = {}
  state = { currentValue: '' }
  componentDidMount() {
    if (this.props.chatHistory.length < 3) this.props.userMessage({ messageId: Date.now(), messageHistory: [{ timeStamp: new Date(), msg: 'Nice to see you.' }], type: 'income' });
  }
  onFinish = (values) => {
    this.props.userMessage({ messageId: Date.now(), messageHistory: [{ timeStamp: new Date(), msg: values.message }], type: 'out_going' });
    const randomMsg = randomText[Math.floor(Math.random() * randomText.length)];

    setTimeout(() => {
      this.props.userMessage({ messageId: Date.now(), messageHistory: [{ timeStamp: new Date(), msg: randomMsg }], type: 'income' });
    }, 1000);

    this.formRef.current.resetFields();
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  }
  render() {
    return (
      <div className={'app-conatiner'}>
        <Layout className={'app-wrapper'}>
          <Header>Justin</Header>
          <Content>
            <div className={'app-msg-wrapper'}>
              {
                this.props.chatHistory.map((ele, index) =>

                  ele.type === 'income' ? <div className={`income messages`} key={index}>{ele.messageHistory[0].msg}</div> :
                    <Tooltip title="Double click to edit" color={'#108ee9'}>
                      <div className={`out_going messages`} key={index} onDoubleClick={() => this.setState({ currentValue: ele })}>{ele.messageHistory[0].msg}</div>
                    </Tooltip>
                )
              }
            </div>
          </Content>
          <Footer>
            <Form
              name="basic"
              layout={'inline'}
              initialValues={{
                remember: true,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              ref={this.formRef}
            >
              <Form.Item
                name={'message'}
              >
                <Input size="large" placeholder={'Type your message...'} className={'msg-typer'} suffix={<PlusOutlined />} />
              </Form.Item>
            </Form>

          </Footer>
        </Layout>
        {this.state.currentValue !== '' && <Modalpopup
          currentValue={this.state.currentValue.messageHistory[0].msg}
          offmodal={(valueText) => {
            if (valueText) this.props.updateMsg(valueText, this.state.currentValue.messageId)
            this.setState({ currentValue: '' })
          }} />}
      </div>
    );
  }
}

const maptheStore = ({ userDetails }) => {
  const { chatHistory } = userDetails;
  return {
    chatHistory: [...chatHistory]
  };
};

const actionDispatcher = dispatch => {
  return bindActionCreators(
    {
      userMessage,
      updateMsg
    },
    dispatch
  );
};

export default connect(
  maptheStore,
  actionDispatcher
)(Chatbot)