import React, {Component} from 'react';
import Menu from "./menu";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Api from '../services/api';
import {Link} from "react-router-dom";

export default class Edit extends Component {
    state = {
        show: false,
        cep: {
            cidade: {
                Cidade: '',
                estado: {
                    UF: ''
                }
            }
        }
    };
    handleClose = () => {
        this.setState({show: false});
    };
    handleShow = () => {
        this.setState({show: true})
    };

    edit = () => {
        this.handleClose();
        Api.put(`/endereco/${this.state.cep.ID}`,
            {
                Logradouro: this.state.cep.Lougradouro,
                Complemento: this.state.cep.Complemento,
                Bairro: this.state.cep.Bairro,
            }).then(c => {
                window.location.href = "/";
        }).catch(e => {
                console.error(e);
        })

    }


    modal() {
        return (
            <Modal show={this.state.show} onhide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente salvar as informações?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Não
                    </Button>
                    <Button variant="success" onClick={this.edit}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>

        );
    }

    async componentDidMount() {
        await this.selecao();
    }

    async selecao() {
        const res = await Api.get(`/endereco/` + this.props.match.params.id);

        this.setState({cep: res.data});
    }

    handleChange = (e) => {
        const {value, name} = e.target;
        let state = this.state.cep;
        state[name] = value;
        this.setState({cep: state});
        console.log(value, name);
    };

    render() {
        return (
            <div>
                {this.modal()}
                <Menu/>
                <Container>
                    <Col md={{span: 10, offset: 3}}>
                        <Form className="mx-auto">
                            <Form.Group as={Col} md="4" controlId="formGridEmail">
                                <Form.Label>CEP</Form.Label>
                                <Form.Control type="text" value={this.state.cep.CEP} readOnly/>
                            </Form.Group>
                            <Form.Group as={Col} md="8" controlId="formGridPassword">
                                <Form.Label>Logradouro</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Logradouro"
                                    value={this.state.cep.Logradouro}
                                    onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group as={Col} md="8" controlId="formGridPassword">
                                <Form.Label>Complemento</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Complemento"
                                    value={this.state.cep.Complemento}
                                    onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="formGridEmail">
                                <Form.Label>Bairro</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Bairro"
                                    value={this.state.cep.Bairro}
                                    onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="formGridEmail">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control type="text" value={this.state.cep.cidade.Cidade} readOnly/>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="formGridPassword">
                                <Form.Label>Estado</Form.Label>
                                <Form.Control type="text" value={this.state.cep.cidade.estado.UF} readOnly/>
                            </Form.Group>
                            <Button variant="success" type="button" className="ml-3" onClick={this.handleShow}>Salvar
                            </Button>
                        </Form>
                    </Col>
                </Container>
            </div>
        )
    }
}
