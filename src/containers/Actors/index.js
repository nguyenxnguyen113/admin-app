import { Layout } from "../../components/Layout";
import { Container, Row, Col, Modal, Button, Table,Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
// import { getAllCategory, addCategory } from "../../actions";
import { Input } from "../../components/UI/Input";
import { storage } from '../../firebase'
import { getAllActor, addActor } from "../../actions";

export const Actor = (props) => {
    const [show, setShow] = useState(false);
    const [nameActor, setNameActor] = useState('')
    const [avatar, setAvatar] = useState('')
    const [region, setRegion] = useState('')
    const [age, setAge] = useState('')
    const [imagegUrl, setImageUrl] = useState(null)
    const [isUploadedImage, setIsUploadedImage] = useState(false)
    const actor = useSelector(state => state.actor)
    const imageUploadedRef = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        // console.log('category.js')
        dispatch(getAllActor())
    }, [])

    const handleClose = () => {
        console.log(imageUploadedRef.current);
        if (!checkNull()) {
            const uploadTask = storage.ref(`images/${imageUploadedRef.current.name}`).put(imageUploadedRef.current)
            uploadTask.on(
                "state_changed",
                snapshot => { },
                err => {
                    console.log(err)
                },
                () => {
                    storage
                        .ref("images")
                        .child(imageUploadedRef.current.name)
                        .getDownloadURL()
                        .then(url => {
                            setAvatar(url)
                        })
                        .then(() => {
                            setTimeout(() => {
                                console.log('ok');
                                setIsUploadedImage(true)
                                imageUploadedRef.current = null
                                setImageUrl(null)
                            }, 1000)
                        })
                }
            )
        } else {
            alert('you have to enter valid Values')
            setNameActor('')
            setAvatar('')
            setRegion('')
            setShow(false)
        }


    };
    const handleShow = () => setShow(true);
    const handleChangeImage = (e) => {
        console.log(e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            imageUploadedRef.current = e.target.files[0]
            e.target.files = null
            setImageUrl(URL.createObjectURL(e.target.files[0]))
        }
    }
    const renderActorList = (actors) => {
        let actorList = []
        for (let actor of actors) {
            actorList.push(
                <tr key={actor._id}>
                    <td>{actor.name}</td>
                    <td>{actor.region}</td>
                    <td>{actor.age}</td>
                    <td style={{
                        width: "5%"
                    }}>
                        <Image style={{
                            width: '100%',
                        }} src={actor.avatar} rounded />
                    </td>
                    <td style={{
                        width: "15%",

                    }}>
                        <Button  size="md">Edit</Button> &nbsp;
                        <Button  size="md">Remove</Button>
                    </td>
                </tr>
            )
        }
        return actorList
    }
    const checkNull = () => {
        console.log(avatar);
        if (nameActor === "") {
            return true
        }
        if (imagegUrl === null) {
            return true
        }
        if (region === "") {
            return true
        }
        if (age === "") {
            return true
        }
        return false
    }
    useEffect(() => {
        console.log('zoday');
        if (isUploadedImage) {
            const actor = {
                name: nameActor,
                avatar: avatar,
                region: region,
                age: age
            }
            if (!checkNull()) {
                dispatch(addActor(actor));
                alert('add successfull')
                setNameActor('')
                setAvatar('')
                setRegion('')
                setShow(false)
            }
        }
    }, [isUploadedImage])
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
                        <Table striped bordered hover style={{ fontSize: 20 }} responsive="sm">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>region</th>
                                    <th>age</th>
                                    <th>Image</th>
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
                        placeholder='age'
                        onChange={(e) => { setAge(e.target.value) }}
                    />
                    <Input
                        label="Avatar"
                        type="file"
                        onChange={handleChangeImage}
                    />
                    {
                        imagegUrl && <img style={{ width: '100px' }} src={imagegUrl} />
                    }
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
