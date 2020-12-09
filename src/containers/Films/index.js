import { Layout } from "../../components/Layout";
import { Container, Row, Col, Modal, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Input } from "../../components/UI/Input";
import { getAllCategory, addFilm, getAllActor, getAllCountry } from "../../actions";

export const Film = (props) => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState('')
    const [ename, setEname] = useState('')
    const [img, setImg] = useState('')
    const [largerImg, setLargerImg] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [categoryId, setCategoryId] = useState("");
    const [actorId, setActorId] = useState("");
    const [countryId, setCountryId] = useState("");
    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const actor = useSelector(state => state.actor)
    const country = useSelector((state) => state.country);
    console.log(product)
    const dispatch = useDispatch();
    console.log(category)
    useEffect(() => {
        console.log('category.js')
        dispatch(getAllCategory())
        dispatch(getAllActor())
        dispatch(getAllCountry())
    }, [])
    const handleClose = () => {

        const newFilm = {
            name: name,
            ename: ename,
            img: img,
            largerImg: largerImg,
            url: url,
            description: description,
            category: categoryId,
            actor: actorId,
            country: countryId
        } 
        dispatch(addFilm(newFilm))
        // console.log(cat)
        setEname('')
        setName('')
        setImg('')
        setLargerImg('')
        setUrl('')
        setDescription('')
        setCategoryId('')
        setCountryId('')
        setActorId('')
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
        }
        return options;
    };
    const createCountryList = (countries, options = []) => {
        for (let country of countries) {
            options.push({ value: country._id, name: country.name });
        }
        return options;
    };

    const createActorList = (actors, options = []) => {
        for (let actor of actors) {
            options.push({ value: actor._id, name: actor.name });
        }
        return options;
    };

    const renderFilms = () => {
        return (
          <Table style={{ fontSize: 12 }} responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>English name</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {product.products.length > 0
                ? product.products.map((film) => (
                    <tr
                    //   onClick={() => showProductDetailsModal(product)}
                      key={film._id}
                    >
                      <td>2</td>
                      <td>{film.name}</td>
                      <td>{film.ename}</td>
                      <td>{film.category.name}</td>
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
                    {/* {renderFilms()} */}
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        label="Name"
                        value={name}
                        placeholder='Enter new name film'
                        onChange={(e) => { setName(e.target.value) }}
                    />
                    <Input
                        label="English name"
                        value={ename}
                        placeholder='Enter new english name film'
                        onChange={(e) => { setEname(e.target.value) }}
                    />
                    <Input
                        label="image"
                        value={img}
                        placeholder='Enter new img'
                        onChange={(e) => { setImg(e.target.value) }}
                    />
                    <Input
                        label="Larger img"
                        value={largerImg}
                        placeholder='Enter new larger img film'
                        onChange={(e) => { setLargerImg(e.target.value) }}
                    />
                    <Input
                        label="URL film"
                        value={url}
                        placeholder='Enter url'
                        onChange={(e) => { setUrl(e.target.value) }}
                    />
                    <Input
                        label="Description"
                        value={description}
                        placeholder='Enter new description'
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                    Select category
                    <select
                        className="form-control"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option>select category</option>
                        {createCategoryList(category.categoryList).map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    Select country
                    <select
                        className="form-control"
                        value={countryId}
                        onChange={(e) => setCountryId(e.target.value)}
                    >
                        <option>select country</option>
                        {createCountryList(country.countryList).map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    Select actor
                    <select
                        className="form-control"
                        value={actorId}
                        onChange={(e) => setActorId(e.target.value)}
                    >
                        <option>select actor</option>
                        {createActorList(actor.actorList).map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    )
} 