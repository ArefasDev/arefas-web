import { Button, Input, message, Table, Tooltip } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import axios from 'axios'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { FaUserEdit, FaUsers } from 'react-icons/fa'
import { FaHouse } from 'react-icons/fa6'
import { Link } from 'react-router'
import { baseURL } from '../../../../../globals'
import { Member } from '../../../../../types/MemberType'
import PageHeader from '../../../../template/PageHeader/PageHeader'
import Form from '../NewMember/Form/Form'

export default function Members() {
    const [messageApi, contextHolder] = message.useMessage()
    const [members, setMembers] = useState<Member[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [isEditing, setIsEditing] = useState<boolean | { id: string }>(false)
    const [searchText, setSearchText] = useState('')

    const filteredMembers = members.filter((m) => {
        const idMatch = m.id?.toLowerCase().includes(searchText.toLowerCase())
        const nameMatch = m.personal.name
            .toLowerCase()
            .includes(searchText.toLowerCase())
        const cpfMatch = m.personal.cpf
            .toLowerCase()
            .includes(searchText.toLowerCase())
        return idMatch || nameMatch || cpfMatch
    })

    const columns: ColumnsType<Member> = [
        {
            title: 'Número do Associado',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => Number(a.id) - Number(b.id),
            render: (number: string) => <Link to={number}>{number}</Link>,
        },
        {
            title: 'Nome',
            dataIndex: ['personal', 'name'],
            key: 'name',
            sorter: (a, b) => a.personal.name.localeCompare(b.personal.name),
        },
        {
            title: 'CPF',
            dataIndex: ['personal', 'cpf'],
            key: 'cpf',
        },
        {
            title: 'Categoria',
            dataIndex: ['association', 'category'],
            key: 'category',
            filters: Array.from(
                new Set(members.map((m) => m.association.category))
            ).map((category) => ({
                text: category.charAt(0).toUpperCase() + category.slice(1),
                value: category,
            })),
            onFilter: (value, record) => record.association.category === value,
            render: (category: string) =>
                category.charAt(0).toUpperCase() + category.slice(1),
        },
        {
            title: 'Status',
            dataIndex: ['association', 'status'],
            key: 'status',
            filters: Array.from(
                new Set(members.map((m) => m.association.status))
            ).map((status) => ({
                text: status.charAt(0).toUpperCase() + status.slice(1),
                value: status,
            })),
            onFilter: (value, record) => record.association.status === value,
            render: (status: string) =>
                status.charAt(0).toUpperCase() + status.slice(1),
        },
        {
            title: 'Data de Associação',
            dataIndex: ['association', 'associationDate'],
            key: 'associationDate',
            sorter: (a, b) =>
                dayjs(a.association.associationDate).unix() -
                dayjs(b.association.associationDate).unix(),
            render: (date: string) => dayjs(date).format('DD/MM/YYYY'),
        },
        {
            title: 'Ações',
            key: 'actions',
            dataIndex: 'id',
            render: (number: string) => (
                <Tooltip title='Editar associado'>
                    <Button onClick={() => setIsEditing({ id: number })}>
                        <FaUserEdit />
                    </Button>
                </Tooltip>
            ),
        },
    ]

    useEffect(() => {
        const getMembers = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${baseURL}/docs`, {
                    params: { path: 'members' },
                })
                setMembers(response.data || [])
                setLoading(false)
            } catch (err: unknown) {
                setLoading(false)
                if (axios.isAxiosError(err)) {
                    const message = err.response?.data.message || err.message
                    messageApi.open({ type: 'error', content: message })
                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'Erro desconhecido',
                    })
                }
            }
        }
        getMembers()
    }, [messageApi])

    return (
        <React.Fragment>
            <PageHeader
                icon={<FaUsers />}
                title='Associados'
                path={[
                    {
                        label: 'Painel',
                        value: 'dashboard/association',
                        icon: <FaHouse />,
                    },
                    {
                        label: 'Associados',
                        value: 'members',
                        icon: <FaUsers />,
                    },
                ]}
            />
            <Input
                placeholder='Pesquisar'
                className='mt-3 w-100'
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ marginBottom: 16, width: 400 }}
            />
            {contextHolder}
            {isEditing && typeof isEditing === 'object' && (
                <Form
                    data={{
                        member: members.find(
                            (m) => m.id === isEditing.id
                        ) as Member,
                        id: isEditing.id,
                    }}
                    cancelEdit={() => setIsEditing(false)}
                />
            )}
            {!isEditing && (
                <Table
                    dataSource={filteredMembers.map((m) => ({
                        ...m,
                        key: m.id,
                    }))}
                    columns={columns}
                    className='border rounded-2 bg-white'
                    scroll={{ x: 'max-content' }}
                    loading={loading}
                />
            )}
        </React.Fragment>
    )
}
