import { Layout } from "../../components/Layout";
import { Container, Row, Col, Modal, Button, Table,Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddFilm from './AddFilm'
import { getAllCategory, addFilm, getAllActor, getAllCountry, getAllFilm } from "../../actions";
import './style.css'
import Select from 'react-select';
import { useHistory } from "react-router-dom";


export const Film = (props) => {

    const [show, setShow] = useState(false);
    
    const history = useHistory()
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
 
    const data = category.categoryList
    const dispatch = useDispatch();
    console.log(category)
    useEffect(() => {
        console.log('category.js')
        dispatch(getAllCategory())
        dispatch(getAllActor())
        dispatch(getAllCountry())
        dispatch(getAllFilm())
    }, [])
   
    const handleShow = () => setShow(true);
    // const handleChange = (e) => {
    //     setCategoryId(e => e.target.value)
    // }
 

    const renderFilms = () => {
        return (
            <Table striped bordered hover style={{ fontSize: 20 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>English name</th>
                        <th>Year of release</th>
                        <th>Image</th>
                        <th>Action</th>
            
                    </tr>
                </thead>
                <tbody>
                    {product.productList.length > 0
                        ? product.productList.map((film,index) => (
                            <tr
                                //   onClick={() => showProductDetailsModal(product)}
                                key={film._id}
                            >
                                <td>{index+1}</td>
                                <td>{film.name}</td>
                                <td>{film.ename}</td>
                                <td>{film.year}</td>
                                <td style={{
                                    width:"10%"
                                }}>
                                    <Image style={{
                                        width:'100%',
                                    }} src="https://icdn.dantri.com.vn/thumb_w/640/2019/06/23/ngo-duc-son-nam-than-truong-hoc-10-1561286588938.jpg" rounded />
                                </td>
                                <td  style={{
                                    width:"15%",

                                }} >
                                    <Button onClick={()=>{
                                        
                                        history.push(`/films/${film._id}`)
                                    }} style={{
                                        marginBottom:"10px"
                                    }} size="md">View More</Button><br></br> 
                                    <Button size="sm">Edit</Button> &nbsp;
                                    <Button size="sm">Remove</Button>
                                </td>
                            </tr>
                        ))
                        : null}
                </tbody>
            </Table>
        );
    };
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Films</h3>
                            <button className="btn btn-primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {renderFilms()}
                </Row>
            </Container>
            <AddFilm show={show} setShow={setShow}/>
        </Layout>
    )
} 