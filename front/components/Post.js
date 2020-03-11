import react, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Col, Row, Divider, List, Spin, message, Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

import Wirte from './write';

const dataList = [{
    postId: 1,
    img: 'http://localhost:3065/중국상장 (2)1583953381459.png',
},
{
    PostId: 2,
    img: 'https://i.pinimg.com/originals/a9/f4/8e/a9f48e0b63fabdd91ba620b057a20003.png',
},
{
    postId: 3,
    img: 'https://coinpan.com/files/attach/images/198/228/868/065/a495aeb56f2aef77704d42bf64d6bb61.jpg',
},
{
    postId: 4,
    img: 'https://www.etoland.co.kr/data/file0207/etohumor/2041158719_JpXB8LqS_IMG_20180223_101005.jpg',
},
]


const post = (props) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [postVisible, setPostVisible] = useState(false);

    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        try {
            axios.get(`http://localhost:3065/api/posts`)
                .then(res => {
                    setData(res.data);
                })
        } catch (error) {

        }
    }, [])

    const showPostModal = () => {
        setPostVisible(true);
    }

    const postHandleOk = (e) => {
        setPostVisible(false); //모달창 끄기
    }

    const postHandleCancel = (e) => {
        setPostVisible(false);
    }

    const handleInfiniteOnLoad = () => { //무한 스크롤
        // let dataSet = data;

        // setLoading(true);

        // if (dataSet.length > 16) { //데이터가 끝일때
        //     message.warning('새로운 게시물이 없습니다!');

        //     setHasMore(false);
        //     setLoading(false); //return?
        //     return;
        // }

        // //concat으로 새로 불러온 리스트 데이터 붙이기 
        // dataSet = dataSet.concat(data);
        // setData(dataSet);
        // setLoading(false);

    };

    const logoutOnClick = () => { //로그아웃
        try {
            axios
                .post(`http://localhost:3065/api/user/logout`, {}, { withCredentials: true })
                .then(req => {
                    props.setLogin(false);
                    message.success(`로그아웃 완료하였습니다!`);
                })
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <Row style={{ marginTop: '1%' }}>
            <Col sm={8} xs={6}></Col>
            <Col sm={8} xs={12}>
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '20px', display: 'inline', color: 'black', float: 'left', marginTop: '9px', marginBottom: '10px' }}>Welcome {props.me && props.me.nickname}</p>
                    <Link href='/'><a><h1 style={{ cursor: 'pointer', display: 'inline', textAlign: 'center', marginBottom: '10px' }}> 4Makers </h1></a></Link>
                    <p style={{ fontSize: '20px', color: 'black', float: 'right', marginTop: '9px', marginBottom: '10px', cursor: 'pointer' }} onClick={logoutOnClick} >LogOut</p>&nbsp;&nbsp;&nbsp;
                            <Divider style={{ marginTop: '1px', marginBottom: '10px' }} />

                    <Wirte />

                    <Row gutter={[8, 8]} style={{ marginLeft: '30px', marginRight: '30px' }} >
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            loadMore={handleInfiniteOnLoad}
                            hasMore={!loading && hasMore}
                            useWindow={true}
                        >

                            <List
                                dataSource={data}
                                grid={{
                                    gutter: '16',
                                    xs: 1,
                                    sm: 1,
                                    md: 2,
                                }}

                                renderItem={item => (

                                    <List.Item key={item.id}>
                                        {console.log(item)}
                                        <img style={{ cursor: 'pointer', width: '100%', height: '250px' }} onClick={showPostModal} src={`http://localhost:3065/` + item.Images[0].src} alt="Image" />
                                        <Modal
                                            title={item.User.nickname}
                                            visible={postVisible}
                                            onOk={postHandleOk}
                                            onCancel={postHandleCancel}
                                            okButtonProps={{ type: 'ghost', shape: 'round' }}
                                            cancelButtonProps={{ type: 'ghost', shape: 'round' }}
                                        >
                                            <p>{item.content}</p>
                                
                                        </Modal>
                                    </List.Item>
                                )}
                            >
                                {loading && hasMore && (
                                    <div className="demo-loading-container">
                                        <Spin />
                                    </div>
                                )}
                            </List>
                            
                        </InfiniteScroll>
                    </Row>
                </div>

            </Col>
            <Col sm={8} xs={6}></Col>
        </Row>
    )
}

export default post;
