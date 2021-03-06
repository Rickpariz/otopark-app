import React, { useState, useEffect } from 'react'
import { Typography, Table, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../handlers/users';
import { Route, Switch } from 'react-router-dom';
import FormUsers from './FormUsers';

const { Title } = Typography;
const ButtonGroup = Button.Group;

export default function ManageEmployees(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const [getUsersLoading, setGetUsersLoading] = useState(true);

    const users = useSelector(state => state.users.list);
    const systemParking = useSelector(state => state.system.parking);


    useEffect(() => {
        dispatch(getUsers({
            tipo: 'Funcionario'
        })).then(res => {
            setGetUsersLoading(false);
        })
    }, [dispatch])

    return (
        <div>
            <div className='d-flex align-items-center justify-content-between'>
                <Title level={2}> Gerenciar funcionarios </Title>
                <Button type="primary" onClick={() => history.push('/dashboard/funcionarios/novo')}>Novo funcionario</Button>
            </div>

            <Table
                rowKey='_id'
                loading={getUsersLoading}
                dataSource={users}
                scroll={{ x: true }}
                columns={[
                    {
                        title: 'Nome',
                        dataIndex: 'nome',
                        key: 'nome',
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Tipo',
                        dataIndex: 'tipo',
                        key: 'tipo',
                    },
                    {
                        title: 'Status',
                        render: (value, row) => (value ? 'Ativado' : 'Desativado')
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

            <Switch>
                <Route
                    path={['/dashboard/funcionarios/novo']}
                    render={(router) => {
                        return <FormUsers {...router} {...props} type='create' target="owner" title="Novo funcionário" parking={systemParking._id} />
                    }}
                />

                <Route
                    path={['/dashboard/funcionarios/editar/:usuario']}
                    render={(router) => {
                        return <FormUsers {...props} {...router} type='update' target="owner" title="Editar funcionário"/>
                    }}
                />
            </Switch>
        </div>
    )
}
