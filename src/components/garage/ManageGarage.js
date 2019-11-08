import React, { useState, useEffect } from 'react'
import { Button, Spin, Popover } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getLots } from '../../handlers/lots';
import { Route, Switch } from 'react-router-dom';
import FormReservation from '../reservations/FormReservation';

export default function ManageGarage(props) {
    const { history } = props;
    const dispatch = useDispatch();
    const lots = useSelector(state => state.lots.list);
    const systemParking = useSelector(state => state.system.parking);
    const [getLotsLoading, setGetLotLoading] = useState(true);

    useEffect(() => {
        dispatch(getLots({
            estacionamento: systemParking._id
        })).then(res => {
            setGetLotLoading(false);
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
        return <p>{lot.codigo} Ocupada </p>
    }

    return (
        <>

            <Spin spinning={getLotsLoading}>
                <div className='garage-wrapper'>
                    {lots.map(lot =>
                        <Popover key={lot.codigo} content={content(lot)} trigger="hover">
                            <div className='garage-items'>
                                {lot.codigo}
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
