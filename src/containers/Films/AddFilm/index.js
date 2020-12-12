import React, { useRef } from 'react'
import { useEffect, useState } from "react";
import { addFilm } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../../components/UI/Input";
import { storage } from '../../../firebase'


import { Modal, Button, Image } from "react-bootstrap";

function AddFilm(props) {
    const { show, setShow } = props

    const [isUploadedImage, setIsUploadedImage] = useState(false)
    const imageUploadedRef = useRef([])
    const [imageUrl, setImageUrl] = useState([])
    const [name, setName] = useState('')
    const [ename, setEname] = useState('')
    const [img, setImg] = useState('')
    const [largerImg, setLargerImg] = useState('')
    const [url, setUrl] = useState('')
    const [year, setYear] = useState('default')
    const [description, setDescription] = useState('')
    const [countryId, setCountryId] = useState('');
    const [categories, setCategories] = useState(["default"]);
    const [actors, setActors] = useState(["default"]);
    const category = useSelector((state) => state.category);
    const actor = useSelector(state => state.actor)
    const country = useSelector((state) => state.country);

    const dispatch = useDispatch();


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
    const checkNull = () => {
        if (name.trim() === "") {
            console.log(name);
            return true
        }
        if (ename.trim() === "") {
            console.log(2);
            return true
        }
        if (img.trim() === "") {
            console.log(3);
            return true
        }
        if (largerImg.trim === "") {
            console.log(4);
            return true
        }
        if (url.trim() === "") {
            console.log(5);
            return true
        }
        if (description.trim() === "") {
            console.log(6);
            return true
        }
        if (categories.find((item) => item === 'default')) {
            console.log(7);
            return true
        }
        if (actors.find((item) => item === 'default')) {
            console.log(8);
            return true
        }
        if (year === "default") {
            console.log(9);
            return true
        }
        if (countryId.trim() === "") {
            console.log(10);
            return true
        }
    }
    const handleClose =  () => {
            if (imageUploadedRef.current.length > 0) {
                for (let i = 0; i < imageUploadedRef.current.length; i++) {
                    
                        const uploadTask =  storage.ref(`images/${imageUploadedRef.current[i].img.name}`).put(imageUploadedRef.current[i].img)
                        uploadTask.on(
                            "state_changed",
                            snapshot => { },
                            err => {
                                console.log(err)
                            },
                            () => {
                                storage
                                    .ref("images")
                                    .child(imageUploadedRef.current[i].img.name)
                                    .getDownloadURL()
                                    .then(url => {
                                        if (imageUploadedRef.current[i].name === 'image') {
                                            setImg(url)
                                        }
                                        else setLargerImg(url)
                                    })
                                    .then(() => {
                                        setTimeout(() => {
                                            if (i === imageUploadedRef.current.length - 1) {
                                                setIsUploadedImage(true)
                                                imageUploadedRef.current = []
                                                setImageUrl([])
                                            }
                                        }, 1000)
                                    })
                            }
                        )
                    }
                    
                    
                
            }
            else{
                alert('you have to enter valid Values')
                setEname('')
                setName('')
                setImg('')
                setLargerImg('')
                setUrl('')
                setDescription('')
                setCategories(["default"])
                setCountryId('')
                setYear('default')
                setActors(["default"])
                setShow(false)
                setIsUploadedImage(false)
            }
        }


    useEffect(() => {
        if (isUploadedImage) {
            const newFilm = {
                name: name,
                ename: ename,
                img: img,
                largerImg: largerImg,
                url: url,
                description: description,
                categories: categories,
                actors: actors,
                countries: countryId,
                year: year
            }
            if (checkNull()) {
                alert('you have to enter valid Values')
            }
            else {
                dispatch(addFilm(newFilm))
            }
            setEname('')
            setName('')
            setImg('')
            setLargerImg('')
            setYear('default')
            setUrl('')
            setDescription('')
            setCategories(["default"])
            setCountryId('')
            setActors(["default"])
            setShow(false)
            setIsUploadedImage(false)
        }
    }, [isUploadedImage])
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{overflow:'hidden'}}>
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
                        {
                            imageUrl.length > 0 && imageUrl.map((item, index) =>
                                <Image key={index} style={{ width: "100px", marginRight: '10px' }} src={item} rounded />
                            )
                        }
                    </div>
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
                    Year of release
                    <div>
                        <select className="form-control" value={year} onChange={(e) => { setYear(e.target.value) }}  >
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
                                            setCategories([...newArr])
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
                        <Button onClick={(e) => {
                            handleClick('category')
                        }}>+</Button>
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

                    Select actor
                    <div>
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
                                            setActors([...newArr])
                                        }}
                                    >
                                        <option value="default">select actor</option>
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

export default AddFilm
