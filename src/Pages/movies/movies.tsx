import React, { useEffect, useRef, useState } from 'react';
import CustomNavbar from "../../Components/Navbar";
import Container from 'react-bootstrap/Container';
import { Alert, Button, Col, Form, Pagination, Row, Stack, Table } from 'react-bootstrap';
import TableItem from './movieItem';

export interface Movie {
    id: string,
    title: string,
    genre: string,
    releaseDate: string,
    language: string,
    rating: string,
    director: string,
    synopsis: string,
}

export default function Movies() {
    const [data, setData] = useState([])
    const [selection, setSelection] = useState<Movie | undefined>({} as Movie)
    const form = useRef(null)

    const endpoint = "/movies/"

    // fetch directors please >.<
    const fetchData = (page: number) => {
        fetch(process.env.REACT_APP_API_URL + endpoint + "?page=" + page, {

        })
            .then(response => response.json())
            .then(json => {
                setData(json.movies)
                setLast(json["last_page"])
            })
    }
    useEffect(() => {
        fetchData(1)
    }, [])

    useEffect(() => {
        console.log(selection)
    }, [selection])

    const selectMovie = (dir_sel: any) => {
        console.log(dir_sel)
        setSelection(dir_sel)
    }

    const updateMovie = (e: any) => {
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

    const deleteMovie = (id: any) => {
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
        temp.sort((a: Movie, b: Movie) => { return a.title.localeCompare(b.title) })
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
                                    <Form.Label>Title:</Form.Label>
                                    <Form.Control value={selection ? selection!.title : ""} onChange={e => setSelection({ ...selection!, title: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Genre:</Form.Label>
                                    <Form.Control value={selection ? selection!.genre : ""} onChange={e => setSelection({ ...selection!, genre: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Language:</Form.Label>
                                    <Form.Control value={selection ? selection!.language : ""} onChange={e => setSelection({ ...selection!, language: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Rating:</Form.Label>
                                    <Form.Control value={selection ? selection!.rating : ""} onChange={e => setSelection({ ...selection!, rating: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Director:</Form.Label>
                                    <Form.Control value={selection ? selection!.director : ""} onChange={e => setSelection({ ...selection!, director: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formName">
                                    <Form.Label>Synopsis:</Form.Label>
                                    <Form.Control value={selection ? selection!.synopsis : ""} onChange={e => setSelection({ ...selection!, synopsis: e.target.value })} type="text" placeholder="" />
                                </Form.Group>
                            </Col>
                            
                            <Col md={12} lg={6}>
                                <Form.Group className="mb-1" controlId="formCompany">
                                    <Form.Label>Release Date:</Form.Label>
                                    <Form.Control value={(selection != undefined && selection != null && selection.releaseDate) ? (new Date(selection!.releaseDate).toISOString().split('T')[0]) : ""} onChange={e => setSelection({ ...selection!, releaseDate: new Date(e.target.value).toISOString() })} type="date" placeholder="" />
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
                                <Button type="submit" className="p-2 my-2 w-100" onClick={updateMovie}>Modify</Button>
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
                            <th onClick={handleSort}>Title</th>
                            <th onClick={() => { changePage(page + 1) }}>Rating</th>
                            <th>Genre</th>
                            <th>Release Date</th>
                            <th>Language</th>
                            <th>Director</th>
                            <th>Synopsis</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((e: any) =>
                            <TableItem key={e.id} object={e} onClick={selectMovie} deleteGame={deleteMovie} />
                        ) : null}
                    </tbody>
                </Table>
            </Container >
        </>
    );
}
