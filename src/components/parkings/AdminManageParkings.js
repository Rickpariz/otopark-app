import React, { useState, useEffect } from 'react'
import { Typography, Table, Row, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { getParkings } from '../../handlers/parkings';
import FormParking from './FormParking';

const { Title } = Typography;
const ButtonGroup = Button.Group;

export default function AdminManageParkings(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const parkings = useSelector(state => state.parkings.list);
    const [getRequestLoading, setGetRequestLoading] = useState(true);

    useEffect(() => {
        dispatch(getParkings()).then(res => {
            setGetRequestLoading(false);
        })
    }, [dispatch])

    return (
        <div>
            <Row type='flex' justify='space-between' align='middle'>
                <Title level={2}> Gerenciar estacionamentos </Title>
                <Button type="primary" onClick={() => history.push('/admin/dashboard/estacionamentos/novo')}>Novo estacionamento</Button>
            </Row>

            <Table
                rowKey='_id'
                loading={getRequestLoading}
                dataSource={parkings}
                scroll={{ x: true }}
                columns={[
                    {
                        title: 'Nome',
                        dataIndex: 'nome',
                        key: 'nome',
                    },
                    {
                        title: 'Endereço',
                        dataIndex: 'endereco',
                        key: 'endereco',
                    },
                    {
                        title: 'Número de vagas',
                        dataIndex: 'numeroDeVagas',
                        key: 'numeroDeVagas',
                    },
                    {
                        title: 'Funcionários',
                        render: (value, row) => `${row.funcionarios.length}`
                    },
                    {
                        title: 'Dono',
                        render: (value, row) => `${row.dono.nome}`
                    },
                    {
                        title: 'Ações',
                        key: 'action',
                        render: (value, row) => (
                            <span>
                                <ButtonGroup>
                                    <Button icon="edit" onClick={() => history.push(`/admin/dashboard/estacionamentos/editar/${row._id}`)}/>
                                    <Button icon="delete" />
                                </ButtonGroup>
                            </span>
                        ),
                    },
                ]}
            />

            <Switch>
                <Route
                    path={['/admin/dashboard/estacionamentos/novo']}
                    render={(router) => {
                        return <FormParking {...router} {...props} type='create' />
                    }}
                />

                <Route
                    path={['/admin/dashboard/estacionamentos/editar/:parking']}
                    render={(router) => {
                        return <FormParking {...props} {...router} type='update' />
                    }}
                />
            </Switch>
        </div>
    )
}
