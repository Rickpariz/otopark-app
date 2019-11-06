import React, { useState, useEffect } from 'react'
import { Typography, Table, Row, Button, Card, Icon, Avatar, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../handlers/users';
import * as ReactRouter from 'react-router-dom';
import { getCustomers } from '../../handlers/customers';
import { getVehicles } from '../../handlers/vehicles';

const { Title } = Typography;
const ButtonGroup = Button.Group;
const { Meta } = Card;

export default function ManageVehicles(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const vehicles = useSelector(state => state.vehicles.list);
    const systemParking = useSelector(state => state.system.parking);
    const [viewDisplayTable, setViewDisplayTable] = useState(true);
    const [getRequestLoading, setGetRequestLoading] = useState(true);

    useEffect(() => {
        dispatch(getVehicles({
            estacionamento: systemParking._id
        })).then(res => {
            setGetRequestLoading(false);
        })
    }, [dispatch, systemParking])

    return (
        <div>
            <Row type='flex' justify='space-between' align='middle'>
                <Title level={2}> Gerenciar veículos </Title>
                <div>
                    <Switch
                        style={{ marginRight: '12px' }}
                        checkedChildren={<Icon type="table" />}
                        unCheckedChildren={<Icon type="idcard" />}
                        defaultChecked
                        onChange={() => setViewDisplayTable(!viewDisplayTable)}
                    />
                    <Button type="primary" onClick={() => history.push('/dashboard/veiculos/novo')}>Novo veiculo</Button>
                </div>
            </Row>

            {viewDisplayTable ?
                <Table
                    rowKey='_id'
                    loading={getRequestLoading}
                    dataSource={vehicles}
                    scroll={{ x: true }}
                    columns={[
                        {
                            title: 'Placa',
                            dataIndex: 'placa',
                            key: 'placa',
                        },
                        {
                            title: 'Modelo',
                            dataIndex: 'modelo',
                            key: 'modelo',
                        },
                        {
                            title: 'Cor',
                            dataIndex: 'cor',
                            key: 'cor',
                        },
                        {
                            title: 'Cliente',
                            dataIndex: 'cliente.nome',
                            key: 'cliente',
                        },
                        {
                            title: 'Ações',
                            key: 'action',
                            render: (value, row) => (
                                <span>
                                    <ButtonGroup>
                                        <Button icon="edit" onClick={() => history.push(`/dashboard/veiculo/editar/${row._id}`)} />
                                        <Button icon="delete" />
                                    </ButtonGroup>
                                </span>
                            ),
                        },
                    ]}
                />
                :
                (
                    vehicles.map(v => (
                        <Card
                            key={v._id}
                            style={{ width: '300px' }}
                            actions={[
                                <Icon type="edit" key="edit" onClick={() => history.push(`/dashboard/veiculo/editar/${v._id}`)} />,
                                <Icon type="delete" key="delete" />
                            ]}
                        >
                            <Meta
                                avatar={<Avatar style={{ background: '#6f7c88' }} icon='car' />}
                                title={v.modelo}
                                description={(
                                    <>
                                        {v.placa}
                                        <br />
                                        {v.cliente.nome}
                                    </>
                                )}
                            />
                        </Card>
                    ))
                )
            }




            {/* <ReactRouter.Switch>
                <ReactRouter.Route
                    path={['/dashboard/clientes/novo']}
                    render={(router) => {
                        return <FormCustomers {...router} {...props} type='create' />
                    }}
                />

                <ReactRouter.Route
                    path={['/dashboard/clientes/editar/:customer']}
                    render={(router) => {
                        return <FormCustomers {...props} {...router} type='update' />
                    }}
                />
            </ReactRouter.Switch> */}
        </div>
    )
}
