import React, { useEffect, useRef, useState } from 'react';
import CustomNavbar from "../../Components/Navbar";
import Container from 'react-bootstrap/Container';
import { Alert, Button, Col, Form, Pagination, Row, Stack, Table } from 'react-bootstrap';
import TableItem from './roleItem';

export interface Role {
    id: string, character_name: string, pay: string, movie: string, actor: string
}

export default function Roles() {
    const [data, setData] = useState([])
    const [selection, setSelection] = useState<Role | undefined>({} as Role)
    const form = useRef(null)

    const endpoint = "/roles/"

    // fetch directors please >.<
    const fetchData = (page: number) => {
        fetch(process.env.REACT_APP_API_URL + endpoint + "?page=" + page, {

        })
            .then(response => response.json())
            .then(json => {
                setData(json.roles)
                setLast(json["last_page"])
            })
    }
    useEffect(() => {
        fetchData(1)
    }, [])

    useEffect(() => {
        console.log(selection)
    }, [selection])

    const selectRole = (dir_sel: any) => {
        console.log(dir_sel)
        setSelection(dir_sel)
    }

    const updateRole = (e: any) => {
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
        }).then(response => { showAlert("[" + response.status + "] " + response.statusText, (400 <= response.status && response.status < 600) ? false : true) })
            .then(() => { fetchData(page) })
    }

    const deleteRole = (id: any) => {
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
        temp.sort((a: Role, b: Role) => { return a.pay.localeCompare(b.pay) })
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
                                    <Form.Label>Character Name:</Form.Label>
                                    <Form.Control value={selection ? selection!.character_name : ""} onChange={e => setSelection({ ...selection!, character_name: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Pay:</Form.Label>
                                    <Form.Control value={selection ? selection!.pay : ""} onChange={e => setSelection({ ...selection!, pay: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Movie:</Form.Label>
                                    <Form.Control value={selection ? selection!.movie : ""} onChange={e => setSelection({ ...selection!, movie: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Actor:</Form.Label>
                                    <Form.Control value={selection ? selection!.actor : ""} onChange={e => setSelection({ ...selection!, actor: e.target.value })} type="text" placeholder="" />
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
                                <Button type="submit" className="p-2 my-2 w-100" onClick={updateRole}>Modify</Button>
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
                            <th>Character Name</th>
                            <th>Pay</th>
                            <th>Movie</th>
                            <th>Actor</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((e: any) =>
                            <TableItem key={e.id} object={e} onClick={selectRole} deleteGame={deleteRole} />
                        ) : null}
                    </tbody>
                </Table>
            </Container >
        </>
    );
}
