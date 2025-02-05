import { List, Typography } from 'antd'
import React from 'react'
import { DashboardReport } from '../../../../../../../types/DashboardType'

type Insights = DashboardReport['insights']

export default function Insights({ insights }: { insights: Insights }) {
    return (
        <React.Fragment>
            <Typography.Title level={5}>Insights</Typography.Title>
            <List
                bordered
                dataSource={insights}
                className='bg-white'
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
        </React.Fragment>
    )
}
