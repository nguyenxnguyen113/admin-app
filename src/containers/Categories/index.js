import { Layout } from "../../components/Layout";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllCategory, addCategory, deleteCategoryById, editCategoryById, getCategoryById } from "../../actions";
import { Input } from "../../components/UI/Input";
import './style.css'


export const Category = (props) => {
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [nameCategory, setNameCategory] = useState('')
    const category = useSelector(state => state.category)
    console.log(category)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log('category.js')
        dispatch(getAllCategory(pageNumber))
        setNumberOfPages(category.totalPages)
        console.log(numberOfPages)
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

    const handleShowEdit = async (id) => {
        await dispatch(getCategoryById(id))
        setShowEdit(true)
    };
    const handleCloseEdit = () => {
        const editedCategory = {
            name: nameCategory === '' ? category.category.name : nameCategory
        }

        // form.append('name', nameCategory);
        dispatch(editCategoryById(editedCategory, category.category._id));
        alert('edit successfull')
        setNameCategory('')
        setShowEdit(false)
    };
    const renderCategoryList = (categories) => {
        let categoryList = []
        for (let category of categories) {
            categoryList.push(
                <li key={category.name}>
                    <div className="category">
                        <h4 className="name-category">{category.name}</h4>
                        <Button onClick={() => { handleShowEdit(category._id) }} size="sm">Edit</Button> &nbsp;
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
    const pages = new Array(category.totalPages).fill(null).map((v, i) => i);
    console.log(pages)
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Category list:</h3>
                            <button className="btn btn-primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderCategoryList(category.categoryList)}
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
                    <Modal.Title>Edit category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        value={nameCategory}
                        placeholder={category.category.name}
                        onChange={(e) => { setNameCategory(e.target.value) }}
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
