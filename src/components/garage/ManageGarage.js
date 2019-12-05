import React, { useState, useEffect } from 'react'
import { Button, Spin, Popover, Icon, Avatar, Card, Modal, Row, Col, Tooltip, Switch, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLots } from '../../handlers/lots';
import * as ReactRouter from 'react-router-dom';
import FormReservation from '../reservations/FormReservation';
import { getReservations } from '../../handlers/reservations';
import { getReservationDurationFormatted, RESERVATION_STATUS } from '../../helpers/reservation';
import { colors } from '../../helpers/vehicles';
import ModalReservationDetails from '../reservations/ModalReservationDetails';
import { RESERVATION_INITIAL } from '../../helpers/system';

export default function ManageGarage(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const lots = useSelector(state => state.lots.list);
    const reservations = useSelector(state => state.reservations.list);
    const systemParking = useSelector(state => state.system.parking);

    const [modal, setModal] = useState(false);
    const [reservationSelected, setReservationSelected] = useState(RESERVATION_INITIAL);
    const [getLotsLoading, setGetLotLoading] = useState(true);
    const [getReservationsLoading, setGetReservationsLoading] = useState(true);
    const [reservationDuration, setReservationDuration] = useState('--');
    const [displayCard, setDisplayCard] = useState(false);
    const [customerFilter, setCustomerFilter] = useState('');
    const [colorFilter, setColorFilter] = useState(undefined);
    const [placaFilter, setPlacaFilter] = useState('');

    useEffect(() => {
        dispatch(getLots({
            estacionamento: systemParking._id
        })).then(res => {
            setGetLotLoading(false);
        })
    }, [dispatch, systemParking])

    useEffect(() => {
        dispatch(getReservations({
            estacionamento: systemParking._id,
            status: RESERVATION_STATUS.OPEN
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
            const reservation = reservations.find(r => r.vaga._id === lot._id);
            setReservationSelected(reservation || null);
            setModal(true);
        }
    }

    const filterLots = (lots) => {
        if(customerFilter || placaFilter || colorFilter){
            const lotsCompleted = lots.filter(l => !l.status);

            let list = lotsCompleted;

            // filtrando por informações do cliente
            if(customerFilter && customerFilter != ''){
                list = lotsCompleted.filter(l => {
                    const reservation = reservations.find(r => r.vaga._id === l._id);
                    return reservation.cliente.nome.match(new RegExp(customerFilter, 'gi')) || reservation.cliente.telefone.match(new RegExp(customerFilter, 'gi')) || reservation.cliente.rg.match(new RegExp(customerFilter, 'gi'));
                })
            }
            

            if(placaFilter){
                // filtrando por informações do veiculo
                list = list.filter(l => {
                    const reservation = reservations.find(r => r.vaga._id === l._id);
                    return reservation.veiculo.placa.match(new RegExp(placaFilter, 'gi')) || reservation.veiculo.modelo.match(new RegExp(placaFilter, 'gi'))
                })
            }
            
            if(colorFilter){
                // filtrando por cor do veiculo
                list = list.filter(l => {
                    const reservation = reservations.find(r => r.vaga._id === l._id);
                    return reservation.veiculo.cor === colorFilter;
                })
            }
            
            return list;
        } else return lots;
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

    const renderCards = (lot) => {
        const reservation = reservations.find(r => r.vaga._id == lot._id);
        
        console.log(reservation)
        return (
            <div key={lot._id} className={`garage-items ${!lot.status ? 'item-completed' : ''}`}
                style={{
                    background: reservation ? `#${reservation.veiculo.cor}` : 'white'
                }}
            onClick={() => lotClick(lot)}>
                {lot.status ? lot.codigo : 
                    <Tooltip placement="topLeft" onVisibleChange={() => {
                        setReservationDuration(getReservationDurationFormatted(reservation))
                    }} title={reservationDuration} arrowPointAtCenter>
                        <Icon type="car" style={{fontSize: '20px'}} />
                    </Tooltip>
                }
            </div>

        )
    }

    const renderVehicle = (lot) => {
        const reservation = reservations.find(r => r.vaga._id == lot._id);

        if (reservation) {
            return (
                <Tooltip placement="topLeft" onVisibleChange={() => {
                    setReservationDuration(getReservationDurationFormatted(reservation))
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
            <div className='card-filter'>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}> 
                    Filtros:
                    <div>
                        <Tooltip placement="topLeft" title="Filtre por nome, rg e telefone do cliente" arrowPointAtCenter>
                            <Input
                                value={customerFilter}
                                placeholder="Clientes"
                                style={{width: '200px', marginRight: '10px'}}
                                onChange={(e) => setCustomerFilter(e.target.value)}
                            />
                        </Tooltip>

                        <Tooltip placement="topLeft" title="Filtre por placa e modelo do veículo" arrowPointAtCenter>
                            <Input
                                value={placaFilter}
                                placeholder="Veículos"
                                style={{width: '200px'}}
                                onChange={(e) => setPlacaFilter(e.target.value)}
                            />
                        </Tooltip>
                        
                        <Select
                            value={colorFilter}
                            placeholder="Selecione a cor"
                            style={{minWidth: '200px', marginLeft: '10px', marginRight: '10px'}}
                            onChange={(value) => setColorFilter(value)}
                        >
                            {colors.map((c, index) => (
                                <Select.Option key={c.value} value={c.value}>{getCircleColor(c.value, c.name)}</Select.Option>
                            ))}
                        </Select>

                        <Button type="link" onClick={() => { 
                            setColorFilter(undefined);
                            setPlacaFilter('');
                            setCustomerFilter('');
                        }}>
                            Limpar filtros
                        </Button>
                    </div>
                    <div>
                        <Switch
                            style={{ marginRight: '12px' }}
                            checkedChildren={<Icon type="container" />}
                            unCheckedChildren={<Icon type="idcard" />}
                            defaultChecked
                            onChange={() => setDisplayCard(!displayCard)}
                        />

                        Visualização
                    </div>
                </div> 
                    
            </div>
            <Spin spinning={getLotsLoading || getReservationsLoading}>
                <div className='garage-wrapper'>
                    { filterLots(lots).map(lot => 
                        displayCard ? renderCards(lot) : (
                            <div key={lot._id} className='lot-item' onClick={() => lotClick(lot)}>
                                {lot.status ? lot.codigo : renderVehicle(lot)}
                            </div>
                        )
                    )}
                </div>
            </Spin>

            <ModalReservationDetails
                visible={modal}
                onCancel={() => {
                    setModal(false);
                    setReservationSelected(RESERVATION_INITIAL);
                }}
                reservation={reservationSelected}
                width='600px'
            />


            <ReactRouter.Switch>
                <ReactRouter.Route
                    path={['/dashboard/garagem/reserva/nova']}
                    render={(router) => {
                        return <FormReservation {...router} {...props} type='create' />
                    }}
                />
            </ReactRouter.Switch>
        </>
    )
}
