import React, { useEffect, useState } from 'react';
import CustomNavbar from "../Components/Navbar";
import { Container, Form, Table } from 'react-bootstrap';
import TableItem from '../Components/TableItem';
import { Director } from './directors';

export default function Filter() {
    const [data, setData] = useState([])
    const [value, setValue] = useState("")

    const fetchData = (query: string) => {
        fetch(process.env.REACT_APP_API_URL + "/directors/filter/" + (query == "" ? '\%20' : query))
            .then(response => response.json())
            .then(json => { setData(json) })
    }

    useEffect(() => {
        fetchData("")
    }, [])

    useEffect(() => {
        fetchData(value)
    }, [value])

    return (
        <>
            <CustomNavbar />
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formId">
                        <Form.Label>Search:</Form.Label>
                        <Form.Control type="text" placeholder="Search.." onChange={(e) => {setValue(e.target.value)}}/>
                    </Form.Group>
                </Form>

                <Table hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Birth Date</th>
                            <th>Death Date</th>
                            <th>Nationality</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((e: any) =>
                            <TableItem key={e.id} object={e} noDel />
                        ) : null}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}
