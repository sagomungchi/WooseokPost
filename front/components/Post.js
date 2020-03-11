import react, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Col, Row, Divider, List, Spin, message, Modal, Button, Input, Affix } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

import Wirte from './write';

const { TextArea, Search } = Input;

const post = (props) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [postVisible, setPostVisible] = useState(false);
    const [statusM, setStatusM] = useState(false); //수정화면 출력
    const [textAreaM, setTextAreaM] = useState(''); //수정 텍스트

    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [postId, setPostId] = useState(null);

    useEffect(() => {
        try {
            axios.get(`http://localhost:3065/api/posts`)
                .then(res => {
                    setData(res.data);
                })
        } catch (error) {

        }
    }, [])

    const showPostModal = (item) => () => {
        setPostVisible(true);
        setModalTitle(item.User.nickname);
        setModalContent(item.content)
        setPostId(item.id);
    }

    const postHandleOk = (e) => {
        //만약 수정할 텍스트가 있다면 
        if(textAreaM || textAreaM.trim()){
            try {
                //axios
                console.log('hello')
            } catch (error) {
                
            }
        }
        setTextAreaM('');
        setPostVisible(false); //모달창 끄기
        setStatusM(false);
        setPostId(null);
    }

    const postHandleCancel = (e) => {
        setPostVisible(false);
        setStatusM(false);
        setTextAreaM('');
        setPostId(null);
    }

    const deletePost = () => {
        try {
            axios.delete(`http://localhost:3065/api/post?postId=${postId}`)
            window.location.reload();

        } catch (error) {
            console.error(error);
        }
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

    const onSearchReq = (value) =>{
        try {  
            axios.get(`http://localhost:3065/api/post/?search=${value}`)
                .then(res => {
                    setData(res.data)
                })
        } catch (error) {
            console.error(error)
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
                                        <img style={{ cursor: 'pointer', width: '100%', height: '250px' }} onClick={showPostModal(item)} src={`http://localhost:3065/` + item.Images[0].src} alt="Image" />
                                        <Modal
                                            title={[modalTitle, <div style={{float:'right', marginRight:'20px'}}>
                                            <Button type="ghost"  onClick={()=>{setStatusM(true)}}  shape="circle-outline" style={{marginRight:'5px'}}>수정</Button>
                                            <Button type="ghost"  onClick={deletePost} shape="circle-outline" >삭제</Button>
                                            </div>]}
                                            visible={postVisible}
                                            onOk={postHandleOk}
                                            onCancel={postHandleCancel}
                                            okButtonProps={{ type: 'ghost', shape: 'round'}}
                                            cancelButtonProps={{ type: 'ghost', shape: 'round' }}
                                        >
                                            <p>{modalContent}</p>
                                            {statusM?   //수정도움화면 출력
                                            <div>
                                            <Divider /> 
                                            <TextArea row={4} onChange={(e)=>{setTextAreaM(e.target.value)}} />
                                            </div>:
                                            <></>
                                            }
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
            <Col sm={8} xs={6}>
                <Affix style={{ textAlign:'center', marginLeft:'5%' }} offsetTop={860}>
                    <Search
                        placeholder="input search Content"
                        onSearch={onSearchReq}
                        style={{ width: 400 , borderWidth: '0px 0px 2px 0px', }}
                    />
                </Affix>
            </Col>
        </Row>
    )
}

export default post;
