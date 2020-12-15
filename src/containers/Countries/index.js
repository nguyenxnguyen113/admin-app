import { Layout } from "../../components/Layout";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCountry, addCountry, deleteCountryById, getCountryById, editCountryById } from "../../actions";
import { Input } from "../../components/UI/Input";
import './style.css'
export const Country = (props) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [nameCountry, setNameCountry] = useState('')
    const country = useSelector(state => state.country)
    console.log(country.country)
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log('category.js')
        dispatch(getAllCountry(pageNumber))
        setNumberOfPages(country.totalPages)
    }, [pageNumber])
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
        console.log(pageNumber)
        // dispatch(getAllCategory(pageNumber))
    };

    const gotoNext = () => {
        setPageNumber(Math.min( numberOfPages - 1, pageNumber + 1));
        // dispatch(getAllCategory(pageNumber))
        console.log(pageNumber)
    };
    const handleClose = () => {
        const country = {
            name: nameCountry
        }
        if (nameCountry === "") {
            alert('Country name is required');
            setShow(false);
            return;
        }

        // form.append('name', nameCategory);
        dispatch(addCountry(country));
        alert('add successfull')
        setNameCountry('')
        setShow(false)
    };
    const handleShow = () => setShow(true);
    const handleShowEdit = async (id) => { 
        await dispatch(getCountryById(id)) 
        setShowEdit(true)      
    };
    const handleCloseEdit = () => {
        const editedCountry = {
            name: nameCountry === '' ? country.country.name : nameCountry
        }

        // form.append('name', nameCategory);
        dispatch(editCountryById(editedCountry, country.country._id));
        alert('edit successfull')
        setNameCountry('')
        setShowEdit(false)
    };
    const renderCountryList = (countries) => {
        let countryList = []
        for (let country of countries) {
            countryList.push(
                <li key={country._id}>
                    <div className="category">
                        <h4 className="name-category">{country.name}</h4>
                        <Button onClick={() => { handleShowEdit(country._id) }} size="sm">Edit</Button> &nbsp;
                        <Button onClick={() => {
                            const payload = {
                                countryId: country._id,
                            };
                            dispatch(deleteCountryById(payload));
                        }} size="sm">Remove</Button>
                    </div>

                </li>
            )
        }
        return countryList
    }
    const pages = new Array(country.totalPages).fill(null).map((v, i) => i);
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Country list:</h3>
                            <button className="btn btn-primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderCountryList(country.countryList)}
                    </Col>
                    <Button onClick={gotoPrevious}>Previous</Button>
                    {pages.map((pageIndex) => (
                        <Button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
                            {pageIndex + 1}
                        </Button>
                    ))}
                    <Button onClick={gotoNext}>Next</Button>
                </Row>
            </Container>
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header>
                    <Modal.Title>Edit Country</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={nameCountry}
                        placeholder={country.country.name}
                        onChange={(e) => { setNameCountry(e.target.value) }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseEdit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add New Country</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={nameCountry}
                        placeholder='Enter new category'
                        onChange={(e) => { setNameCountry(e.target.value) }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
};
