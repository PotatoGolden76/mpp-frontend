import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


export default function MovieItem(props: any) {
    let { id,
        title,
        genre,
        releaseDate,
        language,
        rating,
        director,
        synopsis } = props.object

    const handleClick = (e: any) => {
        e.preventDefault()
        props.onClick({
            id,
            title,
            genre,
            releaseDate,
            language,
            rating,
            director,
            synopsis
        })
    }

    const handleDelete = (e: any) => {
        e.preventDefault()
        props.deleteGame(id)
    }

    return (
        <tr key={id} onClick={handleClick}>
            <td>{title}</td>            
            <td>{rating}</td>
            <td>{genre}</td>
            <td>{releaseDate == null ? "" : new Date(releaseDate).toDateString()}</td>
            <td>{language}</td>
            <td>{director}</td>
            <td>{synopsis}</td>
            {!props.noDel ? <td><Button className="p-2 my-2 w-100 btn-danger" onClick={handleDelete}>Delete</Button></td> : null}
        </tr>
    );
}
