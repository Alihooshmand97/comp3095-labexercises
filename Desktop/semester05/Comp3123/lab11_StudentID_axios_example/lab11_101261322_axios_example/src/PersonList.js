import React, { Component } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

class PersonList extends Component {
    state = {
        persons: []
    };

    componentDidMount() {
        axios.get(`https://randomuser.me/api/?results=10`)
            .then(res => {
                console.log('API Response:', res.data);
                const persons = res.data.results;
                this.setState({ persons });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }


    render() {
        if (this.state.persons.length === 0) {
            return <h2 className="text-center my-4">Loading users...</h2>;
        }

        return (
            <Container>
                <h1 className="text-center my-4">User List</h1>
                <Row>
                    {this.state.persons.map(person => (
                        <Col md={6} lg={4} className="mb-4" key={person.login.uuid}>
                            <Card className="shadow-sm">
                                <Card.Img
                                    variant="top"
                                    src={person.picture.large}
                                    alt={`${person.name.first} ${person.name.last}`}
                                    className="rounded-circle mx-auto mt-3"
                                    style={{ width: "150px", height: "150px" }}
                                />
                                <Card.Body>
                                    <Card.Title className="text-center">
                                        {`${person.name.title} ${person.name.first} ${person.name.last}`}
                                    </Card.Title>
                                    <Card.Text>
                                        <strong>Username:</strong> {person.login.username} <br />
                                        <strong>Gender:</strong> {person.gender} <br />
                                        <strong>Email:</strong> {person.email} <br />
                                        <strong>Phone:</strong> {person.phone}
                                    </Card.Text>
                                    <div className="d-flex justify-content-center">
                                        <Button variant="primary">Details</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }

}

export default PersonList;
