import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default class Menu extends Component {
    render() {
        return (
            <Navbar bg="light" variant="light" className="mb-3">
                <Container>
                    <Navbar.Brand href="#home" className="mx-auto">
                        Sistema de Consulta de CEP
                    </Navbar.Brand>
                </Container>
            </Navbar>
        )}
}