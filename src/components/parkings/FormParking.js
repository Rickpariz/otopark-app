import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Row, Col, Icon, Select, Button, notification, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { updateParking, getParking, createParking } from '../../handlers/parkings';
import { getUsers } from '../../handlers/users';
const { Option } = Select;

function FormParking(props) {
    const { history, form, type } = props;
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const [modal, setModal] = useState(true);
    const [requestLoading, setRequestLoading] = useState(false);
    const [getUsersLoading, setGetUsersLoading] = useState(true);
    const parking = useSelector(state => state.parkings.parking);
    const users = useSelector(state => state.users.list);
    const parkingId = props.match.params.parking;

    useEffect(() => {
        dispatch(getUsers({
            tipo: 'Dono'
        })).then(res => {
            if(res) setGetUsersLoading(false);
        })
    }, [dispatch]);

    useEffect(() => {
        if (parkingId) {
            setRequestLoading(true);
            dispatch(getParking(parkingId)).then(res => {
                setRequestLoading(false);
            });
        }
    }, [dispatch, parkingId])


    const goBack = () => {
        setModal(false);
        setTimeout(() => {
            history.goBack();
        }, 500)
    }

    const create = () => {
        form.validateFields((err, values) => {
            if (!err) {
                setRequestLoading(true);
                dispatch(createParking(values)).then(res => {
                    setRequestLoading(false);
                    if(res){
                        goBack();
                        notification.success({
                            message: 'Estacionamento cadastrado com sucesso'
                        })
                    }
                });
            }
        })
    }

    const update = () => {
        form.validateFields((err, values) => {
            if (!err) {
                setRequestLoading(true);
                dispatch(updateParking({
                    ...values,
                    estacionamento: parking._id
                })).then(res => {
                    setRequestLoading(false);
                    if(res){
                        goBack();
                        notification.success({
                            message: `${parking.nome} atualizado com sucesso`
                        })
                    }
                });
            }
        })
    }

    const title = type === 'create' ? 'Novo estacionamento' : 'Editar estacionamento';

    return (
        <Modal visible={modal} title={title} width="790px" onCancel={goBack} footer={null}>
            <Spin spinning={getUsersLoading}>
                <Form>
                    <Row gutter={22}>
                        <Col lg={12}>
                            <Form.Item label="Nome">
                                {getFieldDecorator('nome', {
                                    initialValue: type === 'update' && parking && parking.nome ? parking.nome : '',
                                    rules: [{ required: true, message: 'Preencha o nome do estacionamento' }],
                                })(
                                    <Input
                                        prefix={<Icon theme="twoTone" type="font-colors" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Nome do estacionamento'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col lg={12}>
                            <Form.Item label="Endereço">
                                {getFieldDecorator('endereco', {
                                    initialValue: type === 'update' && parking && parking.endereco ? parking.endereco : '',
                                    rules: [{ required: true, message: 'Preencha o endereço do estacionamento' }],
                                })(
                                    <Input
                                        prefix={<Icon theme="twoTone" type="pic-center" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Endereeço do estacionamento'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={22}>
                        <Col lg={12}>
                            <Form.Item label="Quantidade de vagas">
                                {getFieldDecorator('numeroDeVagas', {
                                    initialValue: type === 'update' && parking && parking.numeroDeVagas ? parking.numeroDeVagas : '',
                                    rules: [{ required: true, message: 'Preencha a quantidade de vagas' }],
                                })(
                                    <Input
                                        placeholder={'Quantidade de vagas'}
                                        prefix={<Icon theme="twoTone" type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col lg={12}>
                            <Form.Item label="Dono">
                                {getFieldDecorator('dono', {
                                    initialValue: type === 'update' && parking && parking.dono && parking.dono._id ? parking.dono._id : undefined,
                                    rules: [{ required: true, message: 'Preencha o tipo do usuário' }],
                                })(
                                    <Select
                                        placeholder="Selecione o dono"
                                        loading={getUsersLoading}
                                    >
                                        {users.filter(user => user.tipo === 'Dono').map((user, index) => (
                                            <Option key={user._id} value={user._id}>{user.nome}</Option>
                                        ))}
                                    </Select>,
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row type='flex' justify='end' gutter={22}>
                        <Button key="cancelar" onClick={goBack} style={{ marginRight: '10px' }}>
                            Cancelar
                        </Button>
                        <Button key="salvar" type="primary" loading={requestLoading} onClick={type === 'create' ? create : update}>
                            Salvar
                        </Button>
                    </Row>
                </Form>
            </Spin>
        </Modal>
    )
}

export default Form.create({ name: 'form-parking' })(FormParking)

