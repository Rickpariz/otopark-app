import React, { useState, useEffect } from 'react'
import { Typography, Table, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../handlers/users';
import { Route, Switch } from 'react-router-dom';
import FormUsers from './FormUsers';

const { Title } = Typography;
const ButtonGroup = Button.Group;

export default function AdminManageUsers(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.list);
    const [getUsersLoading, setGetUsersLoading] = useState(true);

    useEffect(() => {
        dispatch(getUsers()).then(res => {
            setGetUsersLoading(false);
        })
    }, [dispatch])

    return (
        <div>
            <Row type='flex' justify='space-between' align='middle'>
                <Title level={2}> Gerenciar donos </Title>
                <Button type="primary" onClick={() => history.push('/admin/dashboard/usuarios/novo')}>Novo dono</Button>
            </Row>

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
                                    <Button icon="edit" onClick={() => history.push(`/admin/dashboard/usuarios/editar/${row._id}`)}/>
                                    <Button icon="delete" />
                                </ButtonGroup>
                            </span>
                        ),
                    },
                ]}
            />

            <Switch>
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
            </Switch>
        </div>
    )
}
