import { Card, Col, Row, Typography } from 'antd'
import React from 'react'
import { DashboardReport } from '../../../../../../../types/DashboardType'
import MovementsItem from './MovementsItem'

type BiggestMovements = DashboardReport['biggestMovements']
type TotalMovement = DashboardReport['totalMovement']
type BiggestMovementsComponentProps = {
    biggestMovements: BiggestMovements
    totalMovement: TotalMovement
}

export default function BiggestMovements({
    biggestMovements,
    totalMovement,
}: BiggestMovementsComponentProps) {
    return (
        <React.Fragment>
            <Typography.Title level={5}>Maiores Movimentações</Typography.Title>
            <Row gutter={[8, 8]}>
                {biggestMovements.map((m, i) => (
                    <Col
                        xs={12}
                        key={i}
                    >
                        <MovementsItem movement={m} />
                    </Col>
                ))}
                <Col xs={24}>
                    <Card
                        className='border'
                        styles={{
                            body: {
                                padding: '5px 15px',
                            },
                        }}
                    >
                        Movimentação total:{' '}
                        <strong>
                            {totalMovement.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </strong>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )
}