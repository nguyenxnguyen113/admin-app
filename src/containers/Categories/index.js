import { Layout } from "../../components/Layout";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCategory, addCategory, deleteCategoryById } from "../../actions";
import { Input } from "../../components/UI/Input";
import './style.css'

export const Category = (props) => {
    const [show, setShow] = useState(false);
    const [nameCategory, setNameCategory] = useState('')
    const category = useSelector(state => state.category)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('category.js')
        dispatch(getAllCategory())
    }, [])
    console.log(nameCategory)
    const handleClose = () => {
        // const form = new FormData()
        const cat = {
            name: nameCategory
        }
        if (nameCategory === "") {
            alert('Category name is required');
            setShow(false);
            return;
        }

        // form.append('name', nameCategory);
        dispatch(addCategory(cat));

        // console.log(cat)
        setNameCategory('')
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const renderCategoryList = (categories) => {
        let categoryList = []
        for (let category of categories) {
            categoryList.push(
                <li key={category.name}>
                    <div className="category">
                        <h4 className="name-category">{category.name}</h4>
                        <Button onClick={() => {
                            const payload = {
                                categoryId: category._id,
                            };
                            dispatch(deleteCategoryById(payload));
                        }} size="sm">Remove</Button>
                    </div>
                </li>
            )
        }
        return categoryList
    }
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
                        {renderCategoryList(category.categoryList)}
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add New Country</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={nameCategory}
                        placeholder='Enter new category'
                        onChange={(e) => { setNameCategory(e.target.value) }}
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
