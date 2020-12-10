import React from 'react'
import { useParams } from 'react-router-dom'
import { Layout } from '../../../components/Layout'

function InfoFilm() {

    const {id} = useParams()

    return (
        <Layout sidebar>
                InfoFilm
        </Layout>
    )
}

export default InfoFilm
