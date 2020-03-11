import React, { useState, useCallback } from 'react';
import { Input, Button, Row, Col, Upload, message } from 'antd';
import axios from 'axios';

import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;


const write = () => {

    const [textValue, setTextValue] = useState('');
    const [imagePath, setImagePath] = useState('');

    const textOnChange = useCallback((e) => {
        setTextValue(e.target.value);
    }, [textValue])

    const props = { //업로드 설정
        name: 'file',
        action: 'http://localhost:3065/api/post/images',
        withCredentials: true,
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                setImagePath(info.file.response[0])
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const writeOnClick = () => {
        try {
            if(!textValue || !textValue.trim()){
                return message.error(`공백은 작성이 불가능 합니다!`);
            }
            axios.post(`http://localhost:3065/api/post`,{
                content : textValue,
                image : imagePath,
            },{withCredentials:true})
            .then(res=>{
                window.location.reload();
            })
        } catch (error) {
            console.error(error)
        }
    }
    
    //Upload

    return (
        <Row>
            <Col sm={24} style={{ paddingLeft: '30px', paddingRight: '30px', fontFamily: 'Roboto, sans-serif' }}>
                <div style={{ float: "left", marginBottom: '10px' }}>
                    <Upload  {...props}><Button type={'default'} shape="round" style={{paddingLeft:'5px'}} > <UploadOutlined />이미지</Button></Upload>
                </div>
                <TextArea  style={{ height: '200px' , borderRadius: '10px' }} onChange={textOnChange} />
                <div style={{ float: "right", marginTop: '10px' }}>

                    <Button type={'default'} style={{ marginBottom: '15px' }} shape="round" onClick={writeOnClick} >글쓰기</Button>
                    <br />
                </div>
            </Col>
        </Row>
    )
}

export default write;

