import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col'
import Row from "react-bootstrap/Row";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faEye} from "@fortawesome/free-regular-svg-icons";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Menu from "./menu";
import Modal from "react-bootstrap/Modal";
import Api from '../services/api';

export default class Index extends Component {
    state = {
        show: false,
        cep: [],
        endereco: '',
        enderecobuscado: {},
        id: ''
    };
    handleClose = () => {
        this.setState({show: false});
    };

    handleShowPesquisa = () => {
        this.setState({show: true})
    }

    async handleClosedel() {
        const del = await Api.delete(`/endereco/` + this.state.id);
        this.setState({show: false});
        window.location.reload();
    };

    handleShow = id => () => {
        this.setState({id: id});
        this.setState({show: true});

    };
    modal() {
        return (
            <Modal show={this.state.show} onhide={this.handleClose}>
                <Modal.Header>
                    <Modal.Title>Editar</Modal.Title>
                </Modal.Header>
                <Modal.Body>Deseja realmente deletar as informações?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.handleClose}>
                        Não
                    </Button>
                    <Button variant="success" onClick={() => this.handleClosedel()}>
                        Sim
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    async componentDidMount() {
        const selecao = await Api.get(`/enderecos`);
        this.setState({cep: selecao.data});
    }

    pesquisa = () => {
        if (this.state.endereco.length === 8) {
            Api.get(`/endereco/busca/` + this.state.endereco)
                .then(res => {
                    this.setState({cep: [res.data]});
                })
                .catch(e => {
                        window.alert('Cep não encontrado');
                        window.location.reload();
                    }
                    )

        } else if (this.state.endereco.length < 8) {
            window.alert('Cep inválido');
        }


    };


    render() {
        return (<>
                {this.modal()}
                <Menu/>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md={{span: 0, offset: 0}}>
                            <Form inline onSubmit={this.handleInputSubmit}>
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-default">CEP</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl
                                    maxlength="8"
                                    onChange={e => this.setState({endereco: e.target.value})}
                                    aria-label="Default"
                                    aria-describedby="inputGroup-sizing-default"
                                    placeholder="49087000"
                                />
                                <Button
                                    variant="outline-success"
                                    className="ml-2"
                                    onClick={this.pesquisa}
                                >Pesquisar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Table striped bordered hover className="mt-5">
                            <thead>
                            <tr>
                                <th>CEP</th>
                                <th>Logradouro</th>
                                <th>Complemento</th>
                                <th>Bairro</th>
                                <th>Cidade</th>
                                <th>Estado</th>
                                <th>Data Cadastro</th>
                                <th>Data Modificação</th>
                                <th>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.cep.map(v => (
                                    <tr>
                                        <td>{v.CEP}</td>
                                        <td>{v.Logradouro}</td>
                                        <td>{v.Complemento}</td>
                                        <td>{v.Bairro}</td>
                                        <td>{v.cidade.Cidade}</td>
                                        <td>{v.cidade.estado.UF}</td>
                                        <td>{v.Data_Cadastro}</td>
                                        <td>{v.Data_Modificacao}</td>
                                        <td className="text-center">
                                            <Link to="view"><FontAwesomeIcon icon={faEye}
                                                                             className="mr-2 text-success"/></Link>
                                            <Link to={`edit/${v.ID}`}><FontAwesomeIcon icon={faEdit}
                                                                             className="mr-2 text-info"/></Link>
                                            <a href="#"><FontAwesomeIcon
                                                icon={faTrash}
                                                className="mr-2 text-danger"
                                                onClick={this.handleShow(v.ID)
                                                }/></a>
                                        </td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </>
        )
    }
}