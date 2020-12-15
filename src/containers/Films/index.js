import { Layout } from "../../components/Layout";
import { Container, Row, Col, Modal, Button, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AddFilm from './AddFilm'
import { getAllCategory, addFilm, getAllActor, getAllCountry, getAllFilm, deleteProductById, getFilmById } from "../../actions";
import './style.css'
import Select from 'react-select';
import { useHistory } from "react-router-dom";
import EditFilm from "./EditFilm";


export const Film = (props) => {

    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const history = useHistory()
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    console.log(product.product)

    const data = category.categoryList
    const dispatch = useDispatch();
    console.log(category)
    useEffect(() => {
        console.log('category.js')
        dispatch(getAllCategory())
        dispatch(getAllActor())
        dispatch(getAllCountry())
        dispatch(getAllFilm(pageNumber))
        setNumberOfPages(product.totalPages)

    }, [pageNumber])
    // console.log(Object.keys(product.product).length)
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
        console.log(pageNumber)
        // dispatch(getAllCategory(pageNumber))
    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
        // dispatch(getAllCategory(pageNumber))
        console.log(pageNumber)
    };
    console.log(showEdit)
    const handleShow = () => setShow(true);
    const handleShowEdit = async (id) => {
        await dispatch(getFilmById(id))
        setShowEdit(true)
    };
    // const handleChange = (e) => {
    //     setCategoryId(e => e.target.value)
    // }
    const getFilm = (id) => { dispatch(getFilmById(id)) }

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
                        ? product.productList.map((film, index) => (
                            <tr
                                //   onClick={() => showProductDetailsModal(product)}
                                key={film._id}
                            >
                                <td>{index + 1}</td>
                                <td>{film.name}</td>
                                <td>{film.ename}</td>
                                <td>{film.year}</td>
                                <td style={{
                                    width: "10%"
                                }}>
                                    <Image style={{
                                        width: '100%',
                                    }} src={film.img} rounded />
                                </td>
                                <td style={{
                                    width: "15%",

                                }} >
                                    <Button onClick={() => {

                                        history.push(`/films/${film._id}`)
                                    }} style={{
                                        marginBottom: "10px"
                                    }} size="md">View More</Button><br></br>
                                    <Button onClick={() => { handleShowEdit(film._id) }} size="sm">Edit</Button> &nbsp;
                                    <Button onClick={() => {
                                        const payload = {
                                            productId: film._id,
                                        };
                                        dispatch(deleteProductById(payload));
                                    }} size="sm">Remove</Button>
                                </td>
                            </tr>
                        ))
                        : null}
                </tbody>
            </Table>
        );
    };
    const pages = new Array(product.totalPages).fill(null).map((v, i) => i);
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Films</h3>
                            <h4>Page of {pageNumber + 1}/{product.totalPages}</h4>
                            <button className="btn btn-primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {renderFilms()}
                </Row>
                <Button onClick={gotoPrevious}>Previous</Button>
                {pages.map((pageIndex) => (
                    <Button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                        {pageIndex + 1}
                    </Button>
                ))}
                <Button onClick={gotoNext}>Next</Button>
            </Container>

            <EditFilm showEdit={showEdit} setShowEdit={setShowEdit} data={product.product} />
            <AddFilm show={show} setShow={setShow} />
        </Layout>
    )
} 