import React, { useState, useEffect } from 'react'
import { Button, Spin, Popover, Icon, Avatar, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLots } from '../../handlers/lots';
import { Route, Switch } from 'react-router-dom';
import FormReservation from '../reservations/FormReservation';
import { getReservations } from '../../handlers/reservations';

export default function ManageGarage(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const lots = useSelector(state => state.lots.list);
    const reservations = useSelector(state => state.reservations.list);
    const systemParking = useSelector(state => state.system.parking);

    const [getLotsLoading, setGetLotLoading] = useState(true);
    const [getReservationsLoading, setGetReservationsLoading] = useState(true);


    useEffect(() => {
        dispatch(getLots({
            estacionamento: systemParking._id
        })).then(res => {
            setGetLotLoading(false);
        })
    }, [dispatch, systemParking])

    useEffect(() => {
        dispatch(getReservations({
            estacionamento: systemParking._id
        })).then(res => {
            setGetReservationsLoading(false);
        })
    }, [dispatch, systemParking])

    const content = (lot) => {
        if (lot.status) return renderLotAvailable(lot);
        else return renderLotUnavailable(lot)
    }

    const renderLotAvailable = (lot) => (
        <div>
            <p style={{ textAlign: 'center' }}>
                {lot.codigo}
            </p>
            <Button type='primary' onClick={() => history.push({
                pathname: '/dashboard/garagem/reserva/nova',
                state: {
                    lot: lot._id
                }
            })}>Preencher</Button>
        </div>
    )

    
    const renderLotUnavailable = (lot) => {
        const reservation = reservations.find(r => r.vaga._id == lot._id);
        if(reservation){
            let vehicle = reservation.veiculo;
            let cliente = reservation.cliente;

            return (
                <Card
                    key={vehicle._id}
                    style={{ width: '300px' }}
                    actions={[
                        <Icon type="edit" key="edit" onClick={() => history.push(`/dashboard/veiculo/editar/${vehicle._id}`)} />,
                        <Icon type="delete" key="delete" />
                    ]}
                >
                    <Card.Meta
                        avatar={<Avatar style={{ background: '#6f7c88' }} icon='car' />}
                        title={vehicle.modelo}
                        description={(
                            <>
                                {vehicle.placa}
                                <br />
                                {cliente.nome}
                            </>
                        )}
                    />
                </Card>
            )
        } else return;
    }

    return (
        <>
            <Spin spinning={getLotsLoading || getReservationsLoading}>
                <div className='garage-wrapper'>
                    {lots.map(lot =>
                        <Popover key={lot.codigo} content={content(lot)} trigger="hover">
                            <div className='garage-items' style={{
                                background: lot.status ? 'white' : '#1890ff',
                                color: lot.status ? 'inherit' : 'white'
                            }}>
                                {lot.status ? lot.codigo : <Icon type="car" style={{fontSize: '20px'}} />}
                            </div>
                        </Popover>
                    )}
                </div>
            </Spin>

            <Switch>
                <Route
                    path={['/dashboard/garagem/reserva/nova']}
                    render={(router) => {
                        return <FormReservation {...router} {...props} type='create' />
                    }}
                />

                <Route
                    path={['/dashboard/garagem/reserva/editar/:reservation']}
                    render={(router) => {
                        return <FormReservation {...props} {...router} type='update' />
                    }}
                />
            </Switch>
        </>
    )
}
