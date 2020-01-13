import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getParkings } from '../handlers/parkings';
import { Spin, List, Avatar, Typography } from 'antd';
import { setSystemParking } from '../handlers/system';

const { Title } = Typography;

export default function LoginParking({ history }) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.system.user);
    const parkings = useSelector(state => state.parkings.list);
    const [requestLoading, setRequestLoading] = useState(true);
    // if(!user._id) history.push('/login');

    useEffect(() => {
        dispatch(getParkings({
            usuario: user._id
        })).then(res => setRequestLoading(false))
    }, [dispatch, user])

    const setParking = (parking) => {
        dispatch(setSystemParking(parking));
        history.push('/dashboard');
    }

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            minWidth: '100vw',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Spin spinning={requestLoading} style={{ width: '100%' }}>
                <div className='card-login-parking' style={{ padding: 24, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <Title level={3}>Escolha um estacionamento</Title>
                    <List
                        style={{ width: '100%' }}
                        itemLayout="horizontal"
                        dataSource={parkings}
                        renderItem={item => (
                            <List.Item style={{ cursor: 'pointer' }} onClick={ () => { setParking(item) }}>
                                <List.Item.Meta
                                    avatar={<Avatar style={{ background: '#1890ff' }} icon='container' />}
                                    title={item.nome}
                                    description={item.endereco}
                                />
                            </List.Item>
                        )}
                    />
                </div>
            </Spin>
        </div>
    )
}
