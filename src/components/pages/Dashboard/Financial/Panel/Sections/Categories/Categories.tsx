import { Pie, PieConfig } from '@ant-design/charts'
import { Card, Typography } from 'antd'
import React from 'react'
import { DashboardReport } from '../../../../../../../types/DashboardType'

type AccountsReceivable = DashboardReport['accountsReceivable']

export default function Categories({
    accountsReceivable,
}: {
    accountsReceivable: AccountsReceivable
}) {
    const pieConfig: PieConfig = {
        data: accountsReceivable,
        angleField: 'value',
        colorField: 'category',
        radius: 0.8,
        innerRadius: 0.4,
        label: {
            text: 'label',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
        scale: {
            color: {
                palette: [
                    '#3498db',
                    '#21618c',
                    '#2ecc71',
                    '#1e8449',
                    '#f39c12',
                ],
            },
        },
        height: 216,
    }

    return (
        <React.Fragment>
            <Typography.Title level={5}>
                Categorias (Contas a Receber)
            </Typography.Title>
            <Card
                className='border'
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >
                <Pie {...pieConfig} />
            </Card>
        </React.Fragment>
    )
}
