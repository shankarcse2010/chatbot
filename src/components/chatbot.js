import React, { Component } from 'react';
import { Layout, Form, Input, Tooltip, Avatar, Image } from 'antd';
import { PlusOutlined, EllipsisOutlined, LeftOutlined } from '@ant-design/icons';


import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Modalpopup from './modal';
import userMessage from '../state_manager/actions/user_details/user_message';
import updateMsg from '../state_manager/actions/user_details/update_msg';

import 'antd/dist/antd.css';
import './chat.css';

import randomText from './random_text.json';

const { Header, Footer, Content } = Layout;
let formRef = {}, scrollView = {};

class Chatbot extends Component {
  state = { currentValue: '' }
  componentDidMount() {
    if (this.props.chatHistory.length < 3) this.props.userMessage({ messageId: Date.now(), messageHistory: [{ timeStamp: new Date(), msg: 'Nice to see you.' }], type: 'income' });
  }

  onFinish = (values) => {
    this.props.userMessage({ messageId: Date.now(), messageHistory: [{ timeStamp: new Date(), msg: values.message }], type: 'out_going' });
    const randomMsg = randomText[Math.floor(Math.random() * randomText.length)];
    setTimeout(() => {
      this.props.userMessage({ messageId: Date.now(), messageHistory: [{ timeStamp: new Date(), msg: randomMsg }], type: 'income' });
      scrollView.current.scrollIntoView({ behavior: 'smooth' })
    }, 1000);
    formRef.current.resetFields();
  }

  render() {
    return (
      <div className={'app-conatiner'}>
        <Layout className={'app-wrapper'}>
          <Header>
            <LeftOutlined />
            <div>
              <Avatar src={<Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />} />
              <span className={'chat-user'}>Justin</span>
            </div>
            <EllipsisOutlined />
          </Header>
          <Content>
            <div className={'app-msg-wrapper'}>
              {
                this.props.chatHistory.map((ele, index) =>

                  ele.type === 'income' ?
                    <div
                      className={`income messages`}
                      key={index}>
                      <div className={'chat-content'}>{ele.messageHistory[0].msg}</div>
                      <div className={'chat-time'}>{new Date(ele.messageHistory[0].timeStamp).toLocaleTimeString()}</div>

                    </div> :
                    <Tooltip title="Double click to edit" color={'#108ee9'}>
                      <div
                        className={`out_going messages`}
                        key={index}
                        onDoubleClick={() => this.setState({ currentValue: ele })}>
                        <div className={'chat-content'}>{ele.messageHistory[0].msg}</div>
                        <div className={'chat-time'}>{new Date(ele.messageHistory[0].timeStamp).toLocaleTimeString()}</div>
                      </div>
                    </Tooltip>
                )
              }
              <div ref={scrollView} />
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
              ref={formRef}
            >
              <Form.Item
                name={'message'}
              >
                <Input
                  size="large"
                  placeholder={'Type your message...'}
                  className={'msg-typer'}
                  suffix={
                    <PlusOutlined
                      onClick={(evt) => {
                        this.onFinish({ message: formRef.current.getFieldValue('message') })
                      }} />
                  }
                />
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