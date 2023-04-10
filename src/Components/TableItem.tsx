import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';


export default function TableItem(props: any) {
    let { id, name, age, birthDate, deathDate, nationality } = props.object

    const handleClick = (e: any) => {
        e.preventDefault()
        props.onClick({ id, name, age, birthDate, deathDate, nationality })
    }

    const handleDelete = (e: any) => {
        e.preventDefault()
        props.deleteGame(id)
    }

    return (
        <tr key={id} onClick={handleClick}>
            <td>{name}</td>
            <td>{age}</td>
            <td>{new Date(birthDate).toDateString()}</td>
            <td>{deathDate == null ? "" : new Date(deathDate).toDateString()}</td>
            <td>{nationality}</td>
            {!props.noDel ?  <td><Button  className="p-2 my-2 w-100 btn-danger" onClick={handleDelete}>Delete</Button></td> : null}
        </tr>
    );
}
