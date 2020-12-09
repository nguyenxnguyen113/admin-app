import { Layout } from "../../components/Layout";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCountry, addCountry } from "../../actions";
import { Input } from "../../components/UI/Input";

export const Country = (props) => {
    const [show, setShow] = useState(false);
    const [nameCountry, setNameCountry] = useState('')
    const country = useSelector(state => state.country)
    console.log(country)
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log('category.js')
        dispatch(getAllCountry())
    }, [])
    
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

    const renderCountryList = (countries) => {
        let countryList = []
        for (let country of countries) {
            countryList.push(
                <li key={country.name}>
                    {country.name}
                </li>
            )
        }
        return countryList
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Country list</h3>
                            <button className="btn btn-primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderCountryList(country.countryList)}
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add New Country</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                       value={nameCountry}
                       placeholder='Enter new category'
                       onChange={(e) => {setNameCountry(e.target.value)}}
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
