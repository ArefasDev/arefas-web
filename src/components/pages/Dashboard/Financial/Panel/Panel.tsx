import { Col, Row } from 'antd'
import React from 'react'
import { FaChartColumn } from 'react-icons/fa6'
import { DashboardReport } from '../../../../../types/DashboardType'
import PageHeader from '../../../../template/PageHeader/PageHeader'
import BiggestMovements from './Sections/BiggestMovements/BiggestMovements'
import Categories from './Sections/Categories/Categories'
import EntryExit from './Sections/EntryExit/EntryExit'
import Insights from './Sections/Insights/Insights'
import Movements from './Sections/Movements/Movements'

export default function Panel() {
    const report: DashboardReport = {
        biggestMovements: [
            {
                name: 'Mensalidades',
                value: 15450,
                percentage: 26.08,
                variation: 10,
            },
            {
                name: 'Doações',
                value: 10183.21,
                percentage: 17.19,
                variation: -5,
            },
            {
                name: 'Eventos',
                value: -1869.35,
                percentage: 3.16,
                variation: -23,
            },
            {
                name: 'Reativações',
                value: 6586,
                percentage: 11.12,
                variation: 8,
            },
            {
                name: 'Convênios',
                value: 4726.62,
                percentage: 7.98,
                variation: 1,
            },
            {
                name: 'Salários',
                value: -13450,
                percentage: 22.7,
                variation: 3,
            },
        ],
        totalMovement: 59249.79,
        accountsReceivable: [
            { category: 'Mensalidades', value: 15450.0, label: '41%' },
            { category: 'Eventos', value: 893.0, label: '2%' },
            { category: 'Doações', value: 10183.21, label: '27%' },
            { category: 'Reativações', value: 6586.0, label: '17%' },
            { category: 'Convênios', value: 4726.62, label: '13%' },
        ],
        entryExit: [
            { date: '01/01/2025', value: 800, category: 'Entrada' },
            { date: '01/01/2025', value: 200, category: 'Saída' },
            { date: '02/01/2025', value: 1000.0, category: 'Entrada' },
            { date: '02/01/2025', value: 100, category: 'Saída' },
            { date: '03/01/2025', value: 1200.0, category: 'Entrada' },
            { date: '03/01/2025', value: 150, category: 'Saída' },
            { date: '04/01/2025', value: 700, category: 'Entrada' },
            { date: '04/01/2025', value: 300, category: 'Saída' },
            { date: '05/01/2025', value: 1000.0, category: 'Entrada' },
            { date: '05/01/2025', value: 0, category: 'Saída' },
            { date: '06/01/2025', value: 1100.0, category: 'Entrada' },
            { date: '06/01/2025', value: 200, category: 'Saída' },
            { date: '07/01/2025', value: 500, category: 'Entrada' },
            { date: '07/01/2025', value: 0, category: 'Saída' },
            { date: '08/01/2025', value: 800, category: 'Entrada' },
            { date: '08/01/2025', value: 100, category: 'Saída' },
            { date: '09/01/2025', value: 950, category: 'Entrada' },
            { date: '09/01/2025', value: 300, category: 'Saída' },
            { date: '10/01/2025', value: 450, category: 'Entrada' },
            { date: '10/01/2025', value: 150, category: 'Saída' },
            { date: '11/01/2025', value: 1000.0, category: 'Entrada' },
            { date: '11/01/2025', value: 500, category: 'Saída' },
            { date: '12/01/2025', value: 400, category: 'Entrada' },
            { date: '12/01/2025', value: 200, category: 'Saída' },
            { date: '13/01/2025', value: 1000.0, category: 'Entrada' },
            { date: '13/01/2025', value: 100, category: 'Saída' },
            { date: '14/01/2025', value: 850, category: 'Entrada' },
            { date: '14/01/2025', value: 300, category: 'Saída' },
            { date: '15/01/2025', value: 1200.0, category: 'Entrada' },
            { date: '15/01/2025', value: 600, category: 'Saída' },
            { date: '16/01/2025', value: 1500.0, category: 'Entrada' },
            { date: '16/01/2025', value: 0, category: 'Saída' },
            { date: '17/01/2025', value: 600, category: 'Entrada' },
            { date: '17/01/2025', value: 350, category: 'Saída' },
            { date: '18/01/2025', value: 2000.0, category: 'Entrada' },
            { date: '18/01/2025', value: 300, category: 'Saída' },
            { date: '19/01/2025', value: 2500.0, category: 'Entrada' },
            { date: '19/01/2025', value: 100, category: 'Saída' },
            { date: '20/01/2025', value: 2200.0, category: 'Entrada' },
            { date: '20/01/2025', value: 400, category: 'Saída' },
            { date: '21/01/2025', value: 2400.0, category: 'Entrada' },
            { date: '21/01/2025', value: 250, category: 'Saída' },
            { date: '22/01/2025', value: 2500.0, category: 'Entrada' },
            { date: '22/01/2025', value: 300, category: 'Saída' },
            { date: '23/01/2025', value: 2600.0, category: 'Entrada' },
            { date: '23/01/2025', value: 600, category: 'Saída' },
            { date: '24/01/2025', value: 2000.0, category: 'Entrada' },
            { date: '24/01/2025', value: 0, category: 'Saída' },
            { date: '25/01/2025', value: 3000.0, category: 'Entrada' },
            { date: '25/01/2025', value: 500, category: 'Saída' },
            { date: '26/01/2025', value: 600, category: 'Entrada' },
            { date: '26/01/2025', value: 0, category: 'Saída' },
            { date: '27/01/2025', value: 1100.0, category: 'Entrada' },
            { date: '27/01/2025', value: 300, category: 'Saída' },
            { date: '28/01/2025', value: 900, category: 'Entrada' },
            { date: '28/01/2025', value: 0, category: 'Saída' },
            { date: '29/01/2025', value: 850, category: 'Entrada' },
            { date: '29/01/2025', value: 250, category: 'Saída' },
            { date: '30/01/2025', value: 1000.0, category: 'Entrada' },
            { date: '30/01/2025', value: 300, category: 'Saída' },
            { date: '31/01/2025', value: 1500.0, category: 'Entrada' },
            { date: '31/01/2025', value: 450, category: 'Saída' },
        ],
        insights: [
            '📈 Alta nos recebimentos de 23%.',
            '📉 Queda nos gastos de 15%.',
            '💰 Categoria com maior caixa: Mensalidades.',
            '💸 Categoria com mais gastos: Salários.',
            '📊 Entradas: 62%, Saídas: 38% do total.',
        ],
        movements: [
            {
                key: '1102',
                description: 'Mensalidade Antônio',
                value: 1200.0,
                category: 'Arrecadação',
                flow: 'Entrada',
                date: '01/01/2025',
            },
            {
                key: '2356',
                description: 'Salário dos colaboradores',
                value: 2500.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '05/01/2025',
            },
            {
                key: '1854',
                description: 'Mensalidade Roberto',
                value: 1000.0,
                category: 'Arrecadação',
                flow: 'Entrada',
                date: '10/01/2025',
            },
            {
                key: '4012',
                description: 'Produtos de limpeza',
                value: 300.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '15/01/2025',
            },
            {
                key: '5087',
                description: 'Suprimentos',
                value: 450.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '20/01/2025',
            },
            {
                key: '3215',
                description: 'Mensalidade Carlos',
                value: 1300.0,
                category: 'Arrecadação',
                flow: 'Entrada',
                date: '02/01/2025',
            },
            {
                key: '4023',
                description: 'Aluguel do imóvel',
                value: 1800.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '04/01/2025',
            },
            {
                key: '7031',
                description: 'Doação de membro',
                value: 700.0,
                category: 'Doações',
                flow: 'Entrada',
                date: '06/01/2025',
            },
            {
                key: '9350',
                description: 'Seguro do veículo',
                value: 450.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '07/01/2025',
            },
            {
                key: '1024',
                description: 'Mensalidade João',
                value: 1100.0,
                category: 'Arrecadação',
                flow: 'Entrada',
                date: '08/01/2025',
            },
            {
                key: '2231',
                description: 'Manutenção do equipamento',
                value: 800.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '09/01/2025',
            },
            {
                key: '4510',
                description: 'Doação para eventos',
                value: 1200.0,
                category: 'Doações',
                flow: 'Entrada',
                date: '11/01/2025',
            },
            {
                key: '2895',
                description: 'Consultoria externa',
                value: 1500.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '12/01/2025',
            },
            {
                key: '6674',
                description: 'Mensalidade Maria',
                value: 1050.0,
                category: 'Arrecadação',
                flow: 'Entrada',
                date: '13/01/2025',
            },
            {
                key: '1458',
                description: 'Equipamento de escritório',
                value: 900.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '14/01/2025',
            },
            {
                key: '3026',
                description: 'Material de escritório',
                value: 400.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '16/01/2025',
            },
            {
                key: '5110',
                description: 'Doação de beneficente',
                value: 950.0,
                category: 'Doações',
                flow: 'Entrada',
                date: '17/01/2025',
            },
            {
                key: '6342',
                description: 'Despesas com internet',
                value: 250.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '18/01/2025',
            },
            {
                key: '8937',
                description: 'Mensalidade Lucas',
                value: 1300.0,
                category: 'Arrecadação',
                flow: 'Entrada',
                date: '19/01/2025',
            },
            {
                key: '7430',
                description: 'Troca de piso',
                value: 1500.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '20/01/2025',
            },
            {
                key: '3247',
                description: 'Mensalidade Patrícia',
                value: 950.0,
                category: 'Arrecadação',
                flow: 'Entrada',
                date: '21/01/2025',
            },
            {
                key: '5209',
                description: 'Luz e energia elétrica',
                value: 600.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '22/01/2025',
            },
            {
                key: '1572',
                description: 'Parcela de manutenção',
                value: 300.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '23/01/2025',
            },
            {
                key: '2387',
                description: 'Doação especial',
                value: 2000.0,
                category: 'Doações',
                flow: 'Entrada',
                date: '24/01/2025',
            },
            {
                key: '3456',
                description: 'Mensalidade Felipe',
                value: 1200.0,
                category: 'Arrecadação',
                flow: 'Entrada',
                date: '25/01/2025',
            },
            {
                key: '4589',
                description: 'Telefone fixo',
                value: 150.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '26/01/2025',
            },
            {
                key: '5894',
                description: 'Despesas com transporte',
                value: 350.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '27/01/2025',
            },
            {
                key: '7112',
                description: 'Mensalidade Tatiane',
                value: 1100.0,
                category: 'Arrecadação',
                flow: 'Entrada',
                date: '28/01/2025',
            },
            {
                key: '8237',
                description: 'Manutenção da estrutura',
                value: 800.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '29/01/2025',
            },
            {
                key: '9084',
                description: 'Conserto do ar condicionado',
                value: 600.0,
                category: 'Despesas Operacionais',
                flow: 'Saída',
                date: '30/01/2025',
            },
            {
                key: '3218',
                description: 'Mensalidade João Paulo',
                value: 1050.0,
                category: 'Arrecadação',
                flow: 'Entrada',
                date: '31/01/2025',
            },
        ],
    }

    return (
        <React.Fragment>
            <PageHeader
                icon={<FaChartColumn />}
                title='Painel'
                path={[
                    {
                        icon: <FaChartColumn />,
                        label: 'Painel',
                        value: '/dashboard/financial',
                    },
                ]}
            />
            <div className='my-3' />
            <Row gutter={[16, 16]}>
                <Col
                    xs={24}
                    lg={14}
                >
                    <BiggestMovements
                        biggestMovements={report.biggestMovements}
                        totalMovement={report.totalMovement}
                    />
                </Col>
                <Col
                    xs={24}
                    lg={10}
                >
                    <Categories
                        accountsReceivable={report.accountsReceivable}
                    />
                </Col>
            </Row>
            <div className='my-3' />
            <Row gutter={[16, 16]}>
                <Col
                    xs={24}
                    md={12}
                >
                    <EntryExit entryExit={report.entryExit} />
                </Col>
                <Col
                    xs={24}
                    md={12}
                >
                    <Insights insights={report.insights} />
                </Col>
            </Row>
            <div className='my-3' />
            <Movements movements={report.movements} />
        </React.Fragment>
    )
}
