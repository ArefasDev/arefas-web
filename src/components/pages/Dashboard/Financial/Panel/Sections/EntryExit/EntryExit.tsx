import { Line, LineConfig } from '@ant-design/charts'
import { Card, Typography } from 'antd'
import React from 'react'
import { DashboardReport } from '../../../../../../../types/DashboardType'

type EntryExit = DashboardReport['entryExit']

export default function EntryExit({ entryExit }: { entryExit: EntryExit }) {
    const columnConfig: LineConfig = {
        data: entryExit,
        xField: 'date',
        yField: 'value',
        colorField: 'category',
        sizeField: 3,
        scale: {
            color: {
                palette: ['green', 'red'],
            },
        },
        animate: {
            enter: {
                type: 'growInX',
                duration: 1500,
            },
        },
        height: 229,
    }

    return (
        <React.Fragment>
            <Typography.Title level={5}>Entrada e Saída</Typography.Title>
            <Card
                className='border'
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >
                <Line {...columnConfig} />
            </Card>
        </React.Fragment>
    )
}
