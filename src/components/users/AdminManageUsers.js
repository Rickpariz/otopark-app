import React, { useState, useEffect } from 'react'
import { Typography, Table, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../handlers/users';
const { Title } = Typography;

export default function AdminManageUsers() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.list);
    const [getUsersLoading, setGetUsersLoading] = useState(true);

    useEffect(() => {
        dispatch(getUsers()).then(res => {
            setGetUsersLoading(false);
        })
    }, [])

    return (
        <div>
            <Row type='flex' justify='space-between' align='middle'>
                <Title level={2}> Gerenciar usuários </Title>
                <Button type="primary">Novo usuário</Button>
            </Row>

            <Table 
                loading={getUsersLoading}
                dataSource={users}
                scroll={{x: true}}
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
                        render: (value, row) => ( value ? 'Ativado' : 'Desativado' )
                    }
                ]}
            />
        </div>
    )
}
