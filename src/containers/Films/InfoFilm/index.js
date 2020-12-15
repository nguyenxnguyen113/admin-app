import React, { useEffect, useState } from 'react'

import { Col, Image, ListGroup, Figure, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getFilmById } from '../../../actions'
import { Layout } from '../../../components/Layout'

function InfoFilm(props) {

    const { id } = useParams()
    console.log(id)
    const [viewFilm,setViewFilm] = useState()
    const [viewComment,setComment] = useState()
    const category = useSelector((state) => state.category);
    const actor = useSelector(state => state.actor)
    const country = useSelector((state) => state.country);
    const product = useSelector((state) => state.product)
    console.log(product.product)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getFilmById(id))
    },[])
    return (
        <Layout sidebar>
            <Col style={{
                display: 'flex',
                justifyContent: 'center'
            }} xs={12} md={12}>
                <Image style={{
                    width: "40%"
                }} src={product.product.largerImg} rounded />
            </Col>
            <div className="col-12 d-flex justify-content-center" >
                <ListGroup className="col-8 mt-2">
                    <ListGroup.Item>VieName: {product.product.name}</ListGroup.Item>
                    <ListGroup.Item>EngName: {product.product.ename}</ListGroup.Item>
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
                        Release year: {product.product.year}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Categories: {product.product.nameCategories}
                    </ListGroup.Item>
                    <ListGroup.Item style={{
                        width:'100%'
                    }}>
                        Description: 
                        <p>
                            {product.product.description}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Country: <span>{product.product.nameCountries}</span>
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
