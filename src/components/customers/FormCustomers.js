import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Row, Col, Icon, Button, notification, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getCustomer, createCustomer, updateCustomer } from '../../handlers/customers';

function FormUsers(props) {
    const { history, form, type } = props;
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const [modal, setModal] = useState(true);
    const [requestLoading, setRequestLoading] = useState(false);
    const [findLoading, setFindLoading] = useState(false);
    const customer = useSelector(state => state.customers.customer);
    const systemParking = useSelector(state => state.system.parking);
    const customerId = props.match.params.customer;

    useEffect(() => {
        if (customerId) {
            setFindLoading(true);
            dispatch(getCustomer(customerId)).then(res => {
                if(res){
                    setFindLoading(false);
                }
            });
        }
    }, [dispatch, customerId])


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
                dispatch(createCustomer({
                    ...values,
                    estacionamento: systemParking._id
                })).then(res => {
                    setRequestLoading(false);
                    if(res){
                        goBack();
                        notification.success({
                            message: 'Cliente cadastrado com sucesso'
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
                dispatch(updateCustomer({
                    ...values,
                    cliente: customer._id
                })).then(res => {
                    setRequestLoading(false);
                    if(res){
                        goBack();
                        notification.success({
                            message: `${customer.nome} atualizado com sucesso`
                        })
                    }
                });
            }
        })
    }

    const title = type === 'create' ? 'Novo cliente' : 'Editar cliente';

    return (
        <Modal visible={modal} title={title} width="790px" onCancel={goBack} footer={null}>
            <Spin spinning={findLoading}>
                <Form>
                    <Row gutter={22}>
                        <Col lg={12}>
                            <Form.Item label="Nome">
                                {getFieldDecorator('nome', {
                                    initialValue: type === 'update' && customer && customer.nome ? customer.nome : '',
                                    rules: [{ required: true, message: 'Preencha o nome' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Nome do cliente'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col lg={12}>
                            <Form.Item label="RG">
                                {getFieldDecorator('rg', {
                                    initialValue: type === 'update' && customer && customer.rg ? customer.rg : '',
                                    rules: [{ required: true, message: 'Preencha o RG' }],
                                })(
                                    <Input
                                        prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='RG do cliente'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={22}>
                        <Col lg={12}>
                            <Form.Item label="Telefone">
                                {getFieldDecorator('telefone', {
                                    initialValue: type === 'update' && customer && customer.telefone ? customer.telefone : '',
                                    rules: [{ required: true, message: 'Preencha o telefone' }],
                                })(
                                    <Input
                                        placeholder={'Telefone do cliente'}
                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
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

export default Form.create({ name: 'form-customers' })(FormUsers)

