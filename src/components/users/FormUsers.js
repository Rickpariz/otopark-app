import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Row, Col, Icon, Select, Button, notification, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { createUser, getUser, updateUser } from '../../handlers/users';
const { Option } = Select;

function FormUsers(props) {
    const { history, form, type } = props;
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();
    const [modal, setModal] = useState(true);
    const [requestLoading, setRequestLoading] = useState(false);
    const user = useSelector(state => state.users.user);
    const userId = props.match.params.usuario;

    useEffect(() => {
        if (userId) {
            setRequestLoading(true);
            dispatch(getUser(userId)).then(res => {
                setRequestLoading(false);
            });
        }
    }, [dispatch, userId])


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
                dispatch(createUser(values)).then(res => {
                    setRequestLoading(false);
                    if(res){
                        goBack();
                        notification.success({
                            message: 'Dono cadastrado com sucesso'
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
                dispatch(updateUser({
                    ...values,
                    usuario: user._id
                })).then(res => {
                    setRequestLoading(false);
                    if (res) {
                        goBack();
                        notification.success({
                            message: `${user.nome} atualizado com sucesso`
                        })
                    }
                });
            }
        })
    }

    const title = type === 'create' ? 'Novo dono' : 'Editar dono';

    console.log(user);
    return (
        <Modal visible={modal} title={title} width="790px" onCancel={goBack} footer={null}>
            <Spin spinning={false}>
                <Form>
                    <Row gutter={22}>
                        <Col lg={12}>
                            <Form.Item label="Nome">
                                {getFieldDecorator('nome', {
                                    initialValue: type === 'update' && user && user.nome ? user.nome : '',
                                    rules: [{ required: true, message: 'Preencha o nome do usuário' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Nome do usuário'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col lg={12}>
                            <Form.Item label="Email">
                                {getFieldDecorator('email', {
                                    initialValue: type === 'update' && user && user.email ? user.email : '',
                                    rules: [{ required: true, message: 'Preencha o email do usuário' }],
                                })(
                                    <Input
                                        prefix={<Icon type="google" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Email do usuário'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={22}>
                        {type === 'create' &&
                            <Col lg={12}>
                                <Form.Item label="Senha">
                                    {getFieldDecorator('senha', {
                                        type: 'password',
                                        rules: [{ required: true, message: 'Preencha a senha do usuário' }],
                                    })(
                                        <Input
                                            type='password'
                                            placeholder={'Senha do usuário'}
                                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        }

                        <Col lg={12}>
                            <Form.Item label="Tipo">
                                {getFieldDecorator('tipo', {
                                    initialValue: type === 'update' && user && user.tipo ? user.tipo : undefined,
                                    rules: [{ required: true, message: 'Preencha o tipo do usuário' }],
                                })(
                                    <Select placeholder="Selecione o tipo">
                                        <Option value="Dono">Dono</Option>
                                        <Option value="Funcionario">Funcionário</Option>
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

export default Form.create({ name: 'form-users' })(FormUsers)

