import React, { useEffect, useRef, useState } from 'react';
import CustomNavbar from "../Components/Navbar";
import Container from 'react-bootstrap/Container';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import TableItem from '../Components/TableItem';

export interface Director {
    id: string,
    name: string,
    age: string,
    birthDate: string,
    deathDate: string,
    nationality: string
}

export default function Directors() {
    const [data, setData] = useState([])
    const [selection, setSelection] = useState<Director | undefined>({} as Director)
    const form = useRef(null)

    const fetchData = () => {
        fetch(process.env.REACT_APP_API_URL + "/directors/")
            .then(response => response.json())
            .then(json => { setData(json.directors) })
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        console.log(selection)
    }, [selection])

    const selectDirector = (dir_sel: any) => {
        console.log(dir_sel)
        setSelection(dir_sel)
    }

    const updateDirector = (e: any) => {
        e.preventDefault()
        if (selection == undefined)
            return
        console.log(selection)
        fetch(process.env.REACT_APP_API_URL + "/directors/" + (selection!.id ? selection!.id : ""), {
            method: selection!.id ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selection),
        }).then(response => console.log(response))
            .then(() => { fetchData() })
    }

    const deleteDirector = (id: any) => {
        if (id) {
            fetch(process.env.REACT_APP_API_URL + "/directors/" + id, {
                method: "DELETE"
            }).then(response => console.log(response))
                .then(() => { fetchData() })
        }
    }

    const clearSelection = () => {
        setSelection(undefined)
    }

    let [direction, setDir] = useState(true)
    const handleSort = () => {
        let temp = [...data]

        console.log(temp)
        temp.sort((a: Director, b: Director) => { return a.name.localeCompare(b.name) })
        setData(direction ? temp : temp.reverse())
        setDir(!direction)
    }


    return (
        <>
            <CustomNavbar />
            <Container className="pt-5">
                <Form className='my-3' ref={form}>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3" controlId="formId">
                                    <Form.Label>Id:</Form.Label>
                                    <Form.Control value={selection ? selection!.id : ""} type="text" placeholder="" disabled readOnly />
                                </Form.Group>
                            </Col>
                            <Col >
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control value={selection ? selection!.name : ""} onChange={e => setSelection({ ...selection!, name: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Age:</Form.Label>
                                    <Form.Control value={selection ? selection!.age : ""} onChange={e => setSelection({ ...selection!, age: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Form.Group className="mb-1" controlId="formReleaseYear">
                                    <Form.Label>Birth Date:</Form.Label>
                                    <Form.Control required value={(selection != undefined && selection != null && selection.birthDate) ? (new Date(selection!.birthDate).toISOString().split('T')[0]) : ""} onChange={e => setSelection({ ...selection!, birthDate: new Date(e.target.value).toISOString() })} type="date" placeholder="" />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-1" controlId="formCompany">
                                    <Form.Label>Death Date:</Form.Label>
                                    <Form.Control value={(selection != undefined && selection != null && selection.deathDate) ? (new Date(selection!.deathDate).toISOString().split('T')[0]) : ""} onChange={e => setSelection({ ...selection!, deathDate: new Date(e.target.value).toISOString() })} type="date" placeholder="" />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group className="mb-1" controlId="formRating">
                                    <Form.Label>Nationality:</Form.Label>
                                    <Form.Control value={selection ? selection!.nationality : ""} onChange={e => setSelection({ ...selection!, nationality: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Button type="submit" className="p-2 m-2 w-100" onClick={updateDirector}>Modify</Button>
                            </Col>

                            <Col>
                                <Button className="p-2 my-2 w-100 btn-danger" onClick={clearSelection}>Clear</Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>



                <Table hover>
                    <thead>
                        <tr>
                            <th onClick={handleSort}>Name</th>
                            <th>Age</th>
                            <th>Birth Date</th>
                            <th>Death Date</th>
                            <th>Nationality</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((e: any) =>
                            <TableItem key={e.id} object={e} onClick={selectDirector} deleteGame={deleteDirector} />
                        ) : null}
                    </tbody>
                </Table>
            </Container>

        </>
    );
}
