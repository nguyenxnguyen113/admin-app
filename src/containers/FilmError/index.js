import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteFilmError, getFilmError } from "../../actions";
import { Layout } from '../../components/Layout';
import { Table, Button, Image } from "react-bootstrap"


  function FilmError() {
    const errorFilms = useSelector(state => state.filmError)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getFilmError({
            limit:10
        }))
    }, [])

    useEffect(()=>{
        console.log("errfilm",errorFilms);
    },[errorFilms])
    return (
        <Layout sidebar>
             <Table striped bordered hover style={{ fontSize: 20 }} responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id</th>
                        <th>name</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                   {
                       errorFilms.filmErrorList.map((i,index)=>{
                           const item = i.film[0]
                           return (
                            <tr key={item._id}>
                                <td>{index+1}</td>
                                <td>{item._id}</td>
                                <td>{item.name}</td>
                                <td><Image style={{width:"100px"}} src={item.img} /> </td>
                                <td onClick={()=>{
                                    dispatch(deleteFilmError(i._id))
                                }}><Button>Remove</Button></td>
                            </tr>
                           )
                       })
                   }
                </tbody>
            </Table>
        </Layout>
    )
}

export default FilmError

