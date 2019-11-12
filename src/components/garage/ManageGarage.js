import React, { useState, useEffect } from 'react'
import { Button, Spin, Popover, Icon, Avatar, Card, Modal, Row, Col, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLots } from '../../handlers/lots';
import { Route, Switch } from 'react-router-dom';
import FormReservation from '../reservations/FormReservation';
import { getReservations } from '../../handlers/reservations';
import Moment from '../../helpers/CustomMoment';
import Title from 'antd/lib/typography/Title';
import { getReservationDuration } from '../../helpers/reservation';

export default function ManageGarage(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const lots = useSelector(state => state.lots.list);
    const reservations = useSelector(state => state.reservations.list);
    const systemParking = useSelector(state => state.system.parking);

    const [modal, setModal] = useState(false);
    const [reservationSelected, setReservationSelected] = useState(null);
    const [getLotsLoading, setGetLotLoading] = useState(true);
    const [getReservationsLoading, setGetReservationsLoading] = useState(true);
    const [reservationDuration, setReservationDuration] = useState('--');


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

    const lotClick = (lot) => {
        if (lot.status) {
            history.push({
                pathname: '/dashboard/garagem/reserva/nova',
                state: {
                    lot: lot._id
                }
            })
        } else {
            const reservation = reservations.find(r => r.vaga._id.toString() === lot._id);
            setReservationSelected(reservation || null);
            setModal(true);
        }
    }

    const renderVehicle = (lot) => {
        const reservation = reservations.find(r => r.vaga._id == lot._id);

        if (reservation) {
            return (
                <Tooltip placement="topLeft" onVisibleChange={() => {
                    setReservationDuration(getReservationDuration(reservation))
                }} title={reservationDuration} arrowPointAtCenter>
                    <svg width="350" height="150" viewBox="0 0 100 50" preserveAspectRatio="xMinYMid slice" >
                        <path style={{ fill: `#${reservation.veiculo.cor}` }} d="M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z"></path>
                    </svg>
                </Tooltip>

            )
        } else {
            return;
        }
    }

    return (
        <>
            <Spin spinning={getLotsLoading || getReservationsLoading}>
                <div className='garage-wrapper'>
                    {lots.map(lot =>
                        // <div className='garage-items' style={{
                        //     background: lot.status ? 'white' : '#1890ff',
                        //     color: lot.status ? 'inherit' : 'white'
                        // }} onClick={() => lotClick(lot)}>
                        //     {lot.status ? lot.codigo : <Icon type="car" style={{fontSize: '20px'}} />}
                        // </div>
                        // <p style={{textAlign: 'center'}}>{lot.codigo}</p>

                        <div key={lot._id} className='lot-item' onClick={() => lotClick(lot)}>
                            {lot.status ? lot.codigo : renderVehicle(lot)}
                        </div>
                    )}
                </div>
            </Spin>

            <Modal
                visible={modal}
                footer={null}
                title={null}
                onCancel={() => {
                    setModal(false);
                    setReservationSelected(null);
                }}
                width='600px'
            >
                <div level={4}
                    style={{
                        margin: '0 auto', padding: '20px', textAlign: 'center',
                        maxWidth: '300px',
                        background: '#f3f3f3',
                        marginTop: '20px',
                        marginBottom: '40px',
                        fontSize: '30px',
                        fontWeight: 600
                    }}
                >
                    <Tooltip placement="topLeft" title="Tempo de reserva" arrowPointAtCenter>
                        {reservationSelected && getReservationDuration(reservationSelected)}
                    </Tooltip>
                </div>
                <Row type='flex' gutter={22}>
                    <Col md={12}>
                        <Card.Meta
                            style={{ width: '100%' }}
                            avatar={<Icon type='user' style={{
                                background: '#1890ff',
                                padding: '10px',
                                borderRadius: '50px',
                                color: 'white'
                            }} />}
                            title={
                                <Tooltip placement="topLeft" title="Cliente" arrowPointAtCenter>
                                    {reservationSelected && reservationSelected.cliente.nome ? reservationSelected.cliente.nome : '--'}
                                </Tooltip>
                            }
                            description={
                                <Tooltip placement="topLeft" title="Telefone" arrowPointAtCenter>
                                    {reservationSelected && reservationSelected.cliente.nome ? reservationSelected.cliente.telefone : '--'}
                                </Tooltip>
                            }
                        />
                    </Col>
                    <Col md={12}>
                        <Card.Meta
                            style={{ width: '100%' }}
                            avatar={<Icon type='car' style={{
                                background: '#1890ff',
                                padding: '10px',
                                borderRadius: '50px',
                                color: 'white'
                            }} />}
                            title={
                                <Tooltip placement="topLeft" title="Modelo do veículo" arrowPointAtCenter>
                                    {reservationSelected && reservationSelected.veiculo.modelo ? reservationSelected.veiculo.modelo : '--'}
                                </Tooltip>
                                
                            }
                            description={
                                <Tooltip placement="topLeft" title="Placa do veículo" arrowPointAtCenter>
                                    {reservationSelected && reservationSelected.veiculo.placa ? reservationSelected.veiculo.placa : '--'}
                                </Tooltip>
                            }
                        />

                    </Col>
                </Row>
                <Row type='flex' align='middle' style={{ marginTop: '30px', marginBottom: '20px' }}>
                    <Col xs={4} md={2}>
                        <Icon type='download' style={{
                            background: '#1890ff',
                            padding: '10px',
                            borderRadius: '50px',
                            color: 'white'
                        }} />
                    </Col>
                    <Col xs={10}>
                        <Tooltip placement="topLeft" title="Entrada do veículo" arrowPointAtCenter>
                            {reservationSelected ? Moment(reservationSelected.entrada).format('lll') : ''}
                        </Tooltip>
                    </Col>
                </Row>
                <div style={{display: 'flex', justifyContent: 'space-between', margin: '40px auto 0 auto', width: '260px'}}>
                    <Button type='danger'> Cancelar </Button>
                    <Button > Editar </Button>
                    <Button type='primary'> Finalizar </Button>
                </div>
            </Modal>

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
