import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


export default function RoleItem(props: any) {
    let { id, character_name, pay, movie, actor } = props.object

    const handleClick = (e: any) => {
        e.preventDefault()
        props.onClick({
            id, character_name: character_name, pay, movie, actor 
        })
    }

    const handleDelete = (e: any) => {
        e.preventDefault()
        props.deleteGame(id)
    }

    return (
        <tr key={id} onClick={handleClick}>
            <td>{character_name}</td>
            <td>{pay}</td>
            <td>{movie}</td>
            <td>{actor}</td>
            {!props.noDel ? <td><Button className="p-2 my-2 w-100 btn-danger" onClick={handleDelete}>Delete</Button></td> : null}
        </tr>
    );
}
