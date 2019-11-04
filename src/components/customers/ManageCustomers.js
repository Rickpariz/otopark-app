import React, { useState, useEffect } from 'react'
import { Typography, Table, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../handlers/users';
import { Route, Switch } from 'react-router-dom';
import { getCustomers } from '../../handlers/customers';

const { Title } = Typography;
const ButtonGroup = Button.Group;

export default function ManageCustomers(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const customers = useSelector(state => state.customers.list);
    const systemParking = useSelector(state => state.system.parking);
    const [getCustomersLoading, setGetCustomersLoading] = useState(true);

    useEffect(() => {
        dispatch(getCustomers({
            estacionamento: systemParking._id
        })).then(res => {
            setGetCustomersLoading(false);
        })
    }, [dispatch, systemParking])

    return (
        <div>
            <Row type='flex' justify='space-between' align='middle'>
                <Title level={2}> Gerenciar clientes </Title>
                <Button type="primary" onClick={() => history.push('/dashboard/clientes/novo')}>Novo cliente</Button>
            </Row>

            <Table
                rowKey='_id'
                loading={getCustomersLoading}
                dataSource={customers}
                scroll={{ x: true }}
                columns={[
                    {
                        title: 'Nome',
                        dataIndex: 'nome',
                        key: 'nome',
                    },
                    {
                        title: 'RG',
                        dataIndex: 'rg',
                        key: 'rg',
                    },
                    {
                        title: 'Telefone',
                        dataIndex: 'telefone',
                        key: 'telefone',
                    },
                    {
                        title: 'Ações',
                        key: 'action',
                        render: (value, row) => (
                            <span>
                                <ButtonGroup>
                                    <Button icon="edit" onClick={() => history.push(`/dashboard/funcionarios/editar/${row._id}`)}/>
                                    <Button icon="delete" />
                                </ButtonGroup>
                            </span>
                        ),
                    },
                ]}
            />

            {/* <Switch>
                <Route
                    path={['/admin/dashboard/usuarios/novo']}
                    render={(router) => {
                        return <FormUsers {...router} {...props} type='create' />
                    }}
                />

                <Route
                    path={['/admin/dashboard/usuarios/editar/:usuario']}
                    render={(router) => {
                        return <FormUsers {...props} {...router} type='update' />
                    }}
                />
            </Switch> */}
        </div>
    )
}
