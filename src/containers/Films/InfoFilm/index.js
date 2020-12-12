import React, { useEffect, useState } from 'react'
import { Col, Image, ListGroup, Figure, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Layout } from '../../../components/Layout'

function InfoFilm() {

    const { id } = useParams()
    const [viewFilm,setViewFilm] = useState()
    const [viewComment,setComment] = useState()
    useEffect(()=>{

    },[])
    return (
        <Layout sidebar>
            <Col style={{
                display: 'flex',
                justifyContent: 'center'
            }} xs={12} md={12}>
                <Image style={{
                    width: "40%"
                }} src="https://wallpaperaccess.com/full/546690.jpg" rounded />
            </Col>
            <div className="col-12 d-flex justify-content-center" >
                <ListGroup className="col-8 mt-2">
                    <ListGroup.Item>VieName: Iron man</ListGroup.Item>
                    <ListGroup.Item>EngName: Iron man</ListGroup.Item>
                    <ListGroup.Item>
                        <p>Actors:</p>
                        <div>
                            <Figure style={{
                                width: '100px',
                                margin: '10px'
                            }}>
                                <Figure.Image
                                    width={100}
                                    height={50}
                                    alt="171x180"
                                    src="https://cf.shopee.vn/file/6705ccbb67416a1dd07e00ec1eddd49b"
                                />
                                <Figure.Caption style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis"
                                }}>
                                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                            </Figure.Caption>
                            </Figure>
                            <Figure style={{
                                width: '100px',
                                margin: '10px'
                            }}>
                                <Figure.Image
                                    width={100}
                                    height={50}
                                    alt="171x180"
                                    src="https://cf.shopee.vn/file/6705ccbb67416a1dd07e00ec1eddd49b"
                                />
                                <Figure.Caption style={{
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis"
                                }}>
                                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                            </Figure.Caption>
                            </Figure>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Release year: 2020
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Categories: <span>Action</span> <span>Action</span>
                    </ListGroup.Item>
                    <ListGroup.Item style={{
                        width:'100%'
                    }}>
                        Description: 
                        <p>
                            Giờ đây thế giới đã biết nhà phát minh tỷ phú Tony Stark chính là siêu anh hùng Người Sắt. 
                            Dưới áp lực từ chính phủ, báo chí và công chúng về việc chia sẻ công nghệ của mình với quân đội, 
                            Tony không muốn tiết lộ bí mật đằng sau áo giáp Người Sắt vì anh sợ thông tin này sẽ rơi vào tay kẻ xấu... 
                            Iron Man 2 là siêu phẩm anh hùng chuyển thể từ truyện tranh trong vũ trụ điện ảnh của Marvel, 
                            hé lộ nhiều thông tin về các bộ phim siêu anh hùng khác
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Country: <span>VietNam</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Url: <span>VietNam</span> <Button>View</Button>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Comment: <Button>View</Button>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </Layout>
    )
}

export default InfoFilm
