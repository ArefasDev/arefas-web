import { Table, Tag, Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router'
import { DashboardReport } from '../../../../../../../types/DashboardType'

type Movements = DashboardReport['movements']

export default function Movements({ movements }: { movements: Movements }) {
    const columns = [
        {
            title: 'Número',
            dataIndex: 'key',
            key: 'key',
            render: (n: number) => (
                <Link to={`/dashboard/financial/accounts/${n}`}>{n}</Link>
            ),
        },
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Valor',
            dataIndex: 'value',
            key: 'value',
            render: (v: number) =>
                v.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                }),
        },
        {
            title: 'Categoria',
            dataIndex: 'category',
            key: 'category',
            render: (c: string) => <Tag>{c}</Tag>,
        },
        {
            title: 'Fluxo',
            dataIndex: 'flow',
            key: 'flow',
            render: (f: string) => (
                <Typography.Text
                    style={{ color: f === 'Entrada' ? 'green' : 'red' }}
                >
                    {f}
                </Typography.Text>
            ),
        },
        {
            title: 'Data',
            dataIndex: 'date',
            key: 'date',
        },
    ]

    return (
        <React.Fragment>
            <Typography.Title level={5}>
                Resumo das Movimentações
            </Typography.Title>
            <Table
                dataSource={movements}
                columns={columns}
                className='border rounded bg-white'
                scroll={{ x: 'max-content' }}
                pagination={{
                    pageSize: 5,
                }}
            />
        </React.Fragment>
    )
}
