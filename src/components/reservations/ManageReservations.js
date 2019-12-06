import React from 'react'
import { Row, Typography } from 'antd'

const { Title } = Typography;

export default function ManageReservations() {
    return (
        <div>
            <div className='d-flex justify-content-start'>
                <Title level={2}>Reservas fechadas</Title>
            </div>
        </div>
    )
}
