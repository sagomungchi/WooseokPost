import React, { useState, useCallback } from 'react';
import { Input, Button, Row, Col, Upload, message } from 'antd';

import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

const write = () => {

    const [textValue, setTextValue] = useState('');

    const textOnChange = useCallback((e) => {
        setTextValue(e.target.value);
    }, [textValue])

    //Upload

    return (
        <Row>
            <Col sm={24} style={{ paddingLeft: '30px', paddingRight: '30px', fontFamily: 'Roboto, sans-serif' }}>
                <div style={{ float: "left", marginBottom: '10px' }}>
                    <Upload {...props}><Button type={'default'} > <UploadOutlined />이미지</Button></Upload>
                </div>
                <TextArea style={{ height: '200px' }} onChange={textOnChange} />
                <div style={{ float: "right", marginTop: '10px' }}>

                    <Button type={'default'} style={{ marginBottom: '15px' }}>글쓰기</Button>
                    <br />
                </div>
            </Col>
        </Row>
    )
}

export default write;

