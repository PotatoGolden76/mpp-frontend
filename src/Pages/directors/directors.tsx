import React, { useEffect, useRef, useState } from 'react';
import CustomNavbar from "../../Components/Navbar";
import Container from 'react-bootstrap/Container';
import { Alert, Button, Col, Form, Pagination, Row, Stack, Table } from 'react-bootstrap';
import TableItem from './directorItem';

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

    const endpoint = "/directors/"

    // fetch directors please >.<
    const fetchData = (page: number) => {
        fetch(process.env.REACT_APP_API_URL + endpoint + "?page=" + page, {

        })
            .then(response => response.json())
            .then(json => {
                setData(json.directors)
                setLast(json["last_page"])
            })
    }
    useEffect(() => {
        fetchData(1)
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
        fetch(process.env.REACT_APP_API_URL + endpoint + (selection!.id ? selection!.id : ""), {
            method: selection!.id ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(selection),
        }).then(response => {showAlert("[" + response.status + "] " + response.statusText, (400 <= response.status && response.status < 600) ? false : true)})
            .then(() => { fetchData(page) })
    }

    const deleteDirector = (id: any) => {
        if (id) {
            fetch(process.env.REACT_APP_API_URL + endpoint + id, {
                method: "DELETE"
            }).then(response => console.log(response))
                .then(() => { 
                    fetchData(page) 
                    showAlert("Delete successful", true)
                })
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


    const [page, setPage] = useState(1)
    const [lastPage, setLast] = useState(10)

    const changePage = (nr: number) => {
        nr = Math.min(Math.max(nr, 1), lastPage);
        setPage(nr)
        fetchData(nr)
    }

    const [response, setResponse] = useState("")
    const [isOk, setOk] = useState(true)

    const showAlert = (alert: any, ok: boolean) => {
        setResponse("Response: " + alert)
        setOk(ok)
        setTimeout(() => {
            setResponse("")
            setOk(true)
        }, 3000)
    }

    return (
        <>
            <CustomNavbar />
            <Container fluid className="pt-5">
                <Form className='my-3' ref={form}>
                    <Container>
                        <Row>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-3" controlId="formId">
                                    <Form.Label>Id:</Form.Label>
                                    <Form.Control value={selection ? selection!.id : ""} type="text" placeholder="" disabled readOnly />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control value={selection ? selection!.name : ""} onChange={e => setSelection({ ...selection!, name: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Age:</Form.Label>
                                    <Form.Control value={selection ? selection!.age : ""} onChange={e => setSelection({ ...selection!, age: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formRating">
                                    <Form.Label>Nationality:</Form.Label>
                                    <Form.Control value={selection ? selection!.nationality : ""} onChange={e => setSelection({ ...selection!, nationality: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formReleaseYear">
                                    <Form.Label>Birth Date:</Form.Label>
                                    <Form.Control required value={(selection != undefined && selection != null && selection.birthDate) ? (new Date(selection!.birthDate).toISOString().split('T')[0]) : ""} onChange={e => setSelection({ ...selection!, birthDate: new Date(e.target.value).toISOString() })} type="date" placeholder="" />
                                </Form.Group>
                            </Col>

                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formCompany">
                                    <Form.Label>Death Date:</Form.Label>
                                    <Form.Control value={(selection != undefined && selection != null && selection.deathDate) ? (new Date(selection!.deathDate).toISOString().split('T')[0]) : ""} onChange={e => setSelection({ ...selection!, deathDate: new Date(e.target.value).toISOString() })} type="date" placeholder="" />
                                </Form.Group>
                            </Col>


                        </Row>

                        <Row className='my-3'>
                            <Col sm={12}>
                                <Alert variant={response == "" ? "primary" : (isOk ? "success" : "danger")}>{response == "" ? "Response: " : response}</Alert>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} lg={6}>
                                <Button type="submit" className="p-2 my-2 w-100" onClick={updateDirector}>Modify</Button>
                            </Col>

                            <Col md={12} lg={6}>
                                <Button className="p-2 my-2 w-100 btn-danger" onClick={clearSelection}>Clear</Button>
                            </Col>
                        </Row>
                    </Container>
                </Form>
                <Stack className='w-100 mx-auto' direction="horizontal">
                    <Pagination className='w-100 mx-auto d-flex justify-content-center'>
                        <Pagination.Prev onClick={() => {
                            changePage(page - 1)
                        }} />
                        <Pagination.Item active={page == 1} onClick={() => {
                            changePage(1)
                        }}>{1}</Pagination.Item>
                        {page > 3 ? <Pagination.Ellipsis /> : null}
                        {page > 2 ? <Pagination.Item className="d-none d-lg-block" onClick={() => {
                            changePage(page - 1)
                        }}>{page - 1}</Pagination.Item> : null}


                        {page > 1 && page < lastPage ? <Pagination.Item active onClick={() => {
                            changePage(page)
                        }}>{page}</Pagination.Item> : null}

                        {page < lastPage - 1 ? <Pagination.Item className="d-none d-lg-block" onClick={() => {
                            changePage(page + 1)
                        }}>{page + 1}</Pagination.Item> : null}
                        {page < lastPage - 2 ? <Pagination.Ellipsis /> : null}
                        <Pagination.Item active={page == lastPage} onClick={() => {
                            changePage(lastPage)
                        }}>{lastPage}</Pagination.Item>
                        <Pagination.Next onClick={() => {
                            changePage(page + 1)
                        }} />
                    </Pagination>
                </Stack>

                <Table responsive hover>
                    <thead>
                        <tr>
                            <th onClick={handleSort}>Name</th>
                            <th onClick={() => { changePage(page + 1) }}>Age</th>
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
            </Container >
        </>
    );
}
