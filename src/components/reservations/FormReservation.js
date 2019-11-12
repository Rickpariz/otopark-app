import React, { useState, useEffect } from 'react'
import { Modal, Form, Input, Row, Col, Icon, Button, Spin, Select, notification } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers } from '../../handlers/customers';
import { getLots } from '../../handlers/lots';
import { colors } from '../../helpers/vehicles';
import { getTablePrices } from '../../handlers/tableprice';
import { getFormattedMoney } from '../../helpers/money';
import { getVehicles } from '../../handlers/vehicles';
import { createReservation } from '../../handlers/reservations';

function FormReservation(props) {
    const { history, form, type } = props;
    const { getFieldDecorator } = form;
    const dispatch = useDispatch();

    const lots = useSelector(state => state.lots.list);
    const systemParking = useSelector(state => state.system.parking);
    const customers = useSelector(state => state.customers.list);
    const vehicles = useSelector(state => state.vehicles.list);
    const table = useSelector(state => state.tablePrices.list);

    const [modal, setModal] = useState(true);
    const [customer, setCustomer] = useState(null);
    const [vehicle, setVehicle] = useState(null);

    const lotSelected = history.location && history.location.state && history.location.state.lot ? history.location.state.lot : undefined;

    useEffect(() => {
        dispatch(getLots({
            estacionamento: systemParking._id
        }))
    }, [dispatch, systemParking])

    useEffect(() => {
        dispatch(getCustomers({
            estacionamento: systemParking._id
        }))
    }, [dispatch, systemParking])

    useEffect(() => {
        dispatch(getVehicles({
            estacionamento: systemParking._id
        }))
    }, [dispatch, systemParking])

    useEffect(() => {
        dispatch(getTablePrices({
            estacionamento: systemParking._id
        }))
    }, [dispatch, systemParking])

    const goBack = () => {
        setModal(false);
        setTimeout(() => {
            history.goBack();
        }, 500)
    }

    const findCustomer = () => {
        const rg = form.getFieldValue('rg');
        const c = customers.find(c => c.rg === rg);

        setCustomer(c || null);
    }

    const findVehicle = () => {
        const placa = form.getFieldValue('placa');
        const v = vehicles.find(v => v.placa === placa);

        setVehicle(v || null);
    }

    const create = async () => {
        form.validateFields(async (err, values) => {
            if (!err) {
                let res = await dispatch(createReservation({
                    ...values,
                    estacionamento: systemParking._id,
                    vaga: lotSelected
                }));

                if(res){
                    goBack();
                    notification.success({
                        message: 'Reserva criada com sucesso'
                    })
                }
            }
        })
    }

    const update = () => {
        form.validateFields((err, values) => {
            if (!err) {
                // setRequestLoading(true);

            }
        })
    }

    const getCircleColor = (color, name) => {
        color = `#${color}`;

        return <div style={{ display: 'flex', alignItems: 'center' }}>
            <svg height="20" width="20">
                <circle cx="10" cy="10" r="5" stroke={color} strokeWidth="2" fill={color} />
            </svg>
            <span style={{ textAlign: 'center', marginLeft: '5px' }}>{name}</span>
        </div>
    }

    const title = type === 'create' ? 'Nova reseva' : 'Editar reserva';

    return (
        <Modal visible={modal} title={title} width="590px" onCancel={goBack} footer={null}>
            <Spin spinning={false}>
                <Form>
                    <Row gutter={22} type='flex' justify="center">
                        {!lotSelected &&
                            <Col md={4}>
                                <Form.Item label="Vaga">
                                    {getFieldDecorator('vaga', {
                                        initialValue: lotSelected,
                                        rules: [{ required: true, message: 'Preencha a vaga' }],
                                    })(
                                        <Select
                                            placeholder="Selecione a vaga"
                                        >
                                            {lots.map((lot, index) => (
                                                <Select.Option key={lot._id} value={lot._id}>{lot.codigo}</Select.Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        }

                        <Col md={8}>
                            <Form.Item>
                                {getFieldDecorator('rg', {
                                    initialValue: '',
                                })(
                                    <Input
                                        onBlur={findCustomer}
                                        prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='RG do cliente'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item>
                                {getFieldDecorator('nome', {
                                    initialValue: customer && customer.nome ? customer.nome : '',
                                    rules: [{ required: true, message: 'Preencha o nome' }],
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Nome do cliente'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item>
                                {getFieldDecorator('telefone', {
                                    initialValue: customer && customer.telefone ? customer.telefone : '',
                                })(
                                    <Input
                                        placeholder={'Telefone do cliente'}
                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={22} type='flex' justify="center">
                        <Col md={8}>
                            <Form.Item>
                                {getFieldDecorator('placa', {
                                    rules: [{ required: true, message: 'Preencha a placa' }],
                                })(
                                    <Input
                                        onBlur={findVehicle}
                                        prefix={<Icon type="dash" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Placa do veículo'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item>
                                {getFieldDecorator('modelo', {
                                    initialValue: vehicle && vehicle.modelo ? vehicle.modelo : '',
                                })(
                                    <Input
                                        prefix={<Icon type="car" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder='Modelo do veículo'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col md={8}>
                            <Form.Item>
                                {getFieldDecorator('cor', {
                                    initialValue: vehicle && vehicle.cor ? vehicle.cor : undefined,
                                })(
                                    <Select
                                         placeholder="Selecione a cor"
                                    >
                                        {colors.map((c, index) => (
                                            <Select.Option key={c.value} value={c.value}>{getCircleColor(c.value, c.name)}</Select.Option>
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row type='flex' justify='end' gutter={22}>
                        <Button key="cancelar" onClick={goBack} style={{ marginRight: '10px' }}>
                            Cancelar
                        </Button>
                        <Button key="salvar" type="primary" loading={false} onClick={create}>
                            Salvar
                        </Button>
                    </Row>
                </Form>
            </Spin>
        </Modal>
    )
}

export default Form.create({ name: 'form-reservations' })(FormReservation)

