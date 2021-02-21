import React, { useState } from 'react';
import { Modal } from 'antd';
import { Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default function Modalpopup(props) {
    const [currentValue, setCurrentValue] = useState(props.currentValue)
    return (
        <Modal
            title="Edit Message"
            centered
            visible={true}
            onOk={() => props.offmodal(currentValue)}
            onCancel={() => props.offmodal()}
            width={300}
        >
            <Input size="large"
                placeholder={'Type your message...'}
                suffix={<PlusOutlined />}
                value={currentValue}
                onChange={(evt) => setCurrentValue(evt.currentTarget.value)} />
        </Modal>
    )
}