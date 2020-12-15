import React from 'react'
import { useEffect, useState, useRef } from "react";
import { addFilm, editProductById } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../../components/UI/Input";
import { storage } from '../../../firebase'


import { Modal, Button, Image } from "react-bootstrap";

function EditFilm(props) {
    const { showEdit, setShowEdit, data } = props
    console.log("data:", data);
    const [name, setName] = useState('')
    const [isUploadedImage, setIsUploadedImage] = useState(false)
    const imageUploadedRef = useRef([])
    const [imageUrl, setImageUrl] = useState([])
    const [ename, setEname] = useState('')
    const [img, setImg] = useState('')
    const [largerImg, setLargerImg] = useState('')
    const [url, setUrl] = useState('')
    const [streamTapeId, setStreamTapeId] = useState('')
    const [year, setYear] = useState('')
    const [description, setDescription] = useState('')
    const [countryId, setCountryId] = useState('');
    const [categories, setCategories] = useState(["default"]);
    const [actors, setActors] = useState(["default"]);
    const category = useSelector((state) => state.category);
    const actor = useSelector(state => state.actor)
    const country = useSelector((state) => state.country);
    const film = useSelector((state) => state.film)
    console.log(data)
    console.log(ename)
    const dispatch = useDispatch();
    const a = data.nameCategories
    const b = data.nameActors
    // Object.keys(film.product).length !== 0 ? setShowEdit(true) : setShowEdit(false)
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
    const handleClick = (value) => {
        if (value === 'category') setCategories([...categories, "default"])
        if (value === 'actors') setActors([...actors, "default"])
    }
    const handleUploadImg = async (e, name) => {
        console.log(e.target.files[0])
        if (e.target.files[0] !== undefined) {
            imageUploadedRef.current.push({
                name: name,
                img: e.target.files[0]
            })
            e.target.files = null
            console.log(imageUploadedRef.current);
            imageUploadedRef.current.forEach(
                (item) => {
                    console.log(item);
                    setImageUrl([...imageUrl, URL.createObjectURL(item.img)])
                }
            )
        }
    }
    // const checkNull = () => {
    //     if (name.trim() === "") return true
    //     if (ename.trim() === "") return true
    //     if (img.trim() === "") return true
    //     if (largerImg.trim === "") return true
    //     if (url.trim() === "") return true
    //     if (streamTapeId.trim() === "") return true
    //     if (description.trim() === "") return true
    //     if (categories.find((item) => item === 'default')) return true
    //     if (actors.find((item) => item === 'default')) return true
    //     if (year === "default") return true
    //     if (countryId.trim() === "") return true
    // }
    const handleClose = () => {

        const editedFilm = {
            name: name == '' ? data.name : name,
            ename: ename == '' ? data.ename : ename,
            img: img == '' ? data.img : img,
            largerImg: largerImg == '' ? data.largerImg : largerImg,
            url: url == '' ? data.url : url,
            streamTapeId: streamTapeId == '' ? data.streamTapeId : streamTapeId,
            description: description == '' ? data.description : description,
            categories: categories[0] == 'default' ? data.categories : categories,
            actors: actors[0] == 'default' ? data.actors : actors,
            countries: countryId == '' ? data.countries : country,
            year: year == '' ? data.year : year
        }
        console.log(editedFilm)

        dispatch(editProductById(editedFilm, data._id))

        setEname('')
        setName('')
        setImg('')
        setLargerImg('')
        setUrl('')
        setStreamTapeId('')
        setDescription('')
        setCategories(["default"])
        setCountryId('')
        setActors(["default"])
        setShowEdit(false)
    };
    const displayListAdded = (array) => {
        array.nameCategories.map((value, index) => <li key={index}>{value}</li>)
    }
    useEffect(() => {
        console.log(categories);
    }, [categories])
    return (

        <div>
            <Modal show={showEdit} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit film {data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        label="Name"
                        value={name}
                        placeholder={data.name}
                        onChange={(e) => { setName(e.target.value) }}
                    />
                    <Input
                        label="English name"
                        value={ename}
                        placeholder={data.ename}
                        onChange={(e) => { setEname(e.target.value) }}
                    />
                    <Input
                        type="file"
                        label="image"
                        placeholder='Enter new img'
                        onChange={(e) => {
                            handleUploadImg(e, 'image')
                        }}
                    />

                    <Input
                        label="Larger img"
                        type="file"
                        placeholder='Enter new larger img film'
                        onChange={(e) => {
                            handleUploadImg(e, 'largeImage')
                        }}
                    />
                    <div style={{
                        display: "flex",
                    }}>
                        <Image style={{ width: "100px", marginRight: '10px' }} src={data.img} rounded />
                        <Image style={{ width: "100px", marginRight: '10px' }} src={data.largerImg} rounded />
                    </div>
                    <Input
                        label="URL film"
                        value={url}
                        placeholder={data.url}
                        onChange={(e) => { setUrl(e.target.value) }}
                    />
                    <Input
                        label="Stream Tape Id"
                        value={streamTapeId}
                        placeholder={data.streamTapeId}
                        onChange={(e) => { setStreamTapeId(e.target.value) }}
                    />
                    <Input
                        label="Description"
                        value={description}
                        placeholder={data.description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                    Year of release
                    <div>
                        <select className="form-control" value={year == "" ? data.year : year} onChange={(e) => { setYear(e.target.value) }}  >
                            <option value="default">Select Year</option>
                            <option value="2020">2020</option>
                            <option value="2019">2019</option>
                            <option value="2018">2018</option>
                            <option value="2017">2017</option>
                            <option value="2016">2016</option>
                            <option value="2015">2015</option>
                            <option value="2014">2014</option>
                        </select>
                    </div>
                    Select category
                  <div>
                        {
                            categories.map((item, index) => {
                                console.log(item);
                                return (
                                    <select
                                        key={index}
                                        className="form-control"
                                        value={item}
                                        onChange={(e) => {
                                            let newArr = categories
                                            newArr[index] = e.target.value
                                            const a = newArr.filter((value, index) => newArr.indexOf(value) === index)
                                            setCategories([...a])
                                        }}
                                    >
                                        <option value="default">select category</option>
                                        {createCategoryList(category.categoryList).map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                )
                            })
                        }
                        <ul>

                        </ul>
                        <Button onClick={(e) => {
                            handleClick('category')
                        }}>+</Button>
                        <div className='list added'>
                            <ul>
                            <h3>Category list added</h3>
                            { showEdit ? data.categories.map((value, index) => <li key={index}>{value.name}</li>)  : null}
                            </ul>
                        </div>
                    </div>
                    Select country
                    <select
                        className="form-control"
                        value={countryId}
                        onChange={(e) => setCountryId(e.target.value)}
                    >
                        <option value="default">select country</option>
                        {createCountryList(country.countryList).map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    {/* {data.countries[0].name} */}

                    <div>
                        Select actor
                        {
                            actors.map((item, index) => {
                                return (
                                    <select
                                        key={index}
                                        className="form-control"
                                        value={item}
                                        onChange={(e) => {
                                            let newArr = actors
                                            newArr[index] = e.target.value
                                            const a = newArr.filter((value, index) => newArr.indexOf(value) === index)
                                            setActors([...a])
                                        }}
                                    >
                                        <option value="default">select actors</option>
                                        {createActorList(actor.actorList).map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.name}
                                            </option>
                                        ))}

                                    </select>
                                )
                            })
                        }

                        <Button onClick={(e) => {
                            handleClick('actors')
                        }}>+</Button>

                    </div>
                    <div className='list-added'>
                        <ul>
                        <h4> Actor list added</h4>
                        {showEdit ? data.actors.map((value, index) => <li key={index}>{value.name}</li>) : null}
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditFilm
