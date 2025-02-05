import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
    Button,
    Card,
    Form,
    Input,
    Select,
    Space,
    Spin,
    Table,
    message,
} from 'antd'
import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { FaChartBar, FaList } from 'react-icons/fa'
import { baseURL } from '../../../../../globals'
import PageHeader from '../../../../template/PageHeader/PageHeader'

interface Item {
    key: string
    name: string
    type: string
    parent?: string
}

export default function ChartAccounts() {
    const [items, setItems] = useState<Item[]>([])
    const [categories, setCategories] = useState<Item[]>([])
    const [form] = Form.useForm()
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [messageApi, contextHolder] = message.useMessage()

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${baseURL}/doc`, {
                params: { path: 'settings', id: 'categories' },
            })
            const data = response.data?.list || []
            setItems(data)
            setCategories(data.filter((item: Item) => !item.parent))
        } catch (error) {
            console.error('Erro ao buscar dados:', error)
            messageApi.error('Erro ao carregar os dados.')
        } finally {
            setLoading(false)
        }
    }, [messageApi])

    const saveData = async (newItems: Item[]) => {
        try {
            await axios.put(`${baseURL}/doc`, {
                path: 'settings',
                id: 'categories',
                data: { list: newItems },
            })
            messageApi.success('Dados salvos com sucesso!')
        } catch (error) {
            console.error('Erro ao salvar:', error)
            messageApi.error('Erro ao salvar os dados.')
        }
    }

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const handleFinish = (values: Item) => {
        const newItems =
            editingIndex !== null
                ? items.map((item, index) =>
                      index === editingIndex ? { ...item, ...values } : item
                  )
                : [...items, { ...values, key: String(Date.now()) }]
        setItems(newItems)
        saveData(newItems)
        setEditingIndex(null)
        form.resetFields()
    }

    const handleEdit = (index: number) => {
        form.setFieldsValue(items[index])
        setEditingIndex(index)
    }

    const handleDelete = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index)
        setItems(updatedItems)
        saveData(updatedItems)
    }

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Fluxo',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) =>
                type === 'pagar' ? 'Contas a Pagar' : 'Contas a Receber',
        },
        {
            title: 'Categoria Pai',
            dataIndex: 'parent',
            key: 'parent',
            render: (parentKey: string) =>
                categories.find((cat) => cat.key === parentKey)?.name || '',
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_: unknown, __: unknown, index: number) => (
                <Space>
                    <Button
                        type='link'
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(index)}
                    />
                    <Button
                        type='link'
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleDelete(index)}
                    />
                </Space>
            ),
        },
    ]

    return (
        <>
            {contextHolder}
            <PageHeader
                icon={<FaList />}
                title='Cadastro de Categorias'
                path={[
                    {
                        label: 'Painel',
                        value: 'dashboard/financial',
                        icon: <FaChartBar />,
                    },
                    {
                        label: 'Categorias',
                        value: 'dashboard/financial/categories',
                        icon: <FaList />,
                    },
                ]}
            />
            <Card className='border mt-3'>
                <Form
                    form={form}
                    layout='vertical'
                    onFinish={handleFinish}
                >
                    <Form.Item
                        name='name'
                        label='Nome'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o nome',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='type'
                        label='Fluxo'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, selecione o fluxo',
                            },
                        ]}
                    >
                        <Select>
                            <Select.Option value='pagar'>
                                Contas a Pagar
                            </Select.Option>
                            <Select.Option value='receber'>
                                Contas a Receber
                            </Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name='parent'
                        label='Categoria Pai'
                    >
                        <Select allowClear>
                            {categories.map((category) => (
                                <Select.Option
                                    key={category.key}
                                    value={category.key}
                                >
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Space>
                        <Button
                            type='primary'
                            htmlType='submit'
                        >
                            {editingIndex !== null ? 'Atualizar' : 'Adicionar'}
                        </Button>
                        <Button
                            onClick={() => {
                                form.resetFields()
                                setEditingIndex(null)
                            }}
                        >
                            Limpar
                        </Button>
                    </Space>
                </Form>
            </Card>
            <Spin spinning={loading}>
                <Table
                    dataSource={items}
                    columns={columns}
                    rowKey='key'
                    className='border bg-white rounded-2 mt-3'
                />
            </Spin>
        </>
    )
}
