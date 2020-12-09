import { Layout } from "../../components/Layout";
import { Container, Row, Col, Modal, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { getAllCategory, addCategory } from "../../actions";
import { Input } from "../../components/UI/Input";
import { getAllActor, addActor } from "../../actions";

export const Actor = (props) => {
    const [show, setShow] = useState(false);
    const [nameActor, setNameActor] = useState('')
    const [avatar, setAvatar] = useState('')
    const [region, setRegion] = useState('')
    const [age, setAge] = useState('')
    const actor = useSelector(state => state.actor)
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log('category.js')
        dispatch(getAllActor())
    }, [])

    const handleClose = () => {
        const actor = {
            name: nameActor,
            avatar: avatar,
            region: region,
            age: age
        }
        if (nameActor === "") {
            alert('name is required');
            setShow(false);
            return;
        }
        // form.append('name', nameCategory);
        dispatch(addActor(actor));
        alert('add successfull')
        setNameActor('')
        setAvatar('')
        setRegion('')
        setShow(false)
    };
    const handleShow = () => setShow(true);

    const renderActorList = (actors) => {
        let actorList = []
        for (let actor of actors) {
            actorList.push(
                <tr key={actor._id}>
                    <td>{actor.name}</td>
                    <td>{actor.region}</td>
                    <td>{actor.age}</td>
                    <td>
                        <span>
                            Delete
                        </span>
                        <span>
                            Edit
                        </span>
                    </td>
                    
                </tr>
            )
        }
        return actorList
    }
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Actor list</h3>
                            <button className="btn btn-primary" onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Table style={{ fontSize: 12 }} responsive="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>region</th>
                                    <th>age</th>
                                    <th>action</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {renderActorList(actor.actorList)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add New Actor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        label="Name actor"
                        value={nameActor}
                        placeholder='Name actor'
                        onChange={(e) => { setNameActor(e.target.value) }}
                    />
                    <Input
                        label="age actor"
                        value={age}
                        placeholder='Name actor'
                        onChange={(e) => { setAge(e.target.value) }}
                    />
                    <Input
                        label="Avatar"
                        value={avatar}
                        placeholder='Name actor'
                        onChange={(e) => { setAvatar(e.target.value) }}
                    />
                    <Input
                        label="Region"
                        value={region}
                        placeholder='Name actor'
                        onChange={(e) => { setRegion(e.target.value) }}
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
