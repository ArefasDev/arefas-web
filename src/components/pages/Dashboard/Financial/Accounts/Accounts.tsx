import {
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    message,
    Row,
    Select,
    Spin,
    Switch,
} from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaChartBar, FaDollarSign, FaSave } from 'react-icons/fa'
import { baseURL } from '../../../../../globals'
import { useUtils } from '../../../../../hooks/useUtils'
import PageHeader from '../../../../template/PageHeader/PageHeader'

type Account = {
    titleNumber: string
    description: string
    flow: 'pagar' | 'receber'
    category: string
    frequency: 'unico' | 'semanal' | 'mensal' | 'anual'
    value?: string
    installmentsValue?: string
    definedQuantity: boolean
    quantity?: number | null
    startDate?: string
    dueDate?: number | string | null
    payment: 'pix' | 'boleto' | 'cartão' | 'transferência'
    obs: string
}

type Item = {
    key: string
    name: string
    type: string
    parent?: string
}

export default function Accounts() {
    const [account, setAccount] = useState<Account>({
        definedQuantity: true,
    } as Account)
    const [categories, setCategories] = useState<Item[]>()
    const [loading, setLoading] = useState<boolean>(false)
    const { formatCurrency } = useUtils()
    const [messageApi, contextHolder] = message.useMessage()
    const [form] = Form.useForm()

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${baseURL}/doc`, {
                    params: {
                        path: 'settings',
                        id: 'categories',
                    },
                })
                setCategories(response.data?.list)
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
        getCategories()
    }, [messageApi])

    const saveAccount = async () => {
        try {
            await axios.post(`${baseURL}/doc`, {
                path: 'accounts',
                data: account,
                id: account.titleNumber,
                primaryKey: 'titleNumber',
            })
            messageApi.open({
                type: 'success',
                content: 'Conta salva com sucesso',
            })
            form.resetFields()
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data.message || err.message
                messageApi.open({ type: 'error', content: message })
            } else {
                messageApi.open({ type: 'error', content: 'Erro desconhecido' })
            }
        }
    }

    const onFinish = (values: Account) => {
        setAccount(values)
        saveAccount()
    }

    return (
        <React.Fragment>
            {contextHolder}
            <PageHeader
                icon={<FaDollarSign />}
                title='Contas'
                path={[
                    {
                        label: 'Painel',
                        value: 'dashboard/financial',
                        icon: <FaChartBar />,
                    },
                    {
                        label: 'Contas',
                        value: 'dashboard/financial/beneficiaries',
                        icon: <FaDollarSign />,
                    },
                ]}
            />
            <Spin spinning={loading}>
                <Card className='border mt-3'>
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                        form={form}
                    >
                        <Form.Item
                            name='titleNumber'
                            label='Número do Título'
                            rules={[
                                {
                                    required: true,
                                    message: 'Insira o número do título',
                                },
                            ]}
                            normalize={(value) => value.replace(/[^0-9]/g, '')}
                        >
                            <Input
                                onChange={(e) =>
                                    setAccount((p) => ({
                                        ...p,
                                        titleNumber: e.target.value,
                                    }))
                                }
                            />
                        </Form.Item>
                        <Row gutter={[16, 16]}>
                            <Col
                                xs={24}
                                md={8}
                            >
                                <Form.Item
                                    name='description'
                                    label='Descrição'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Insira uma descrição da conta',
                                        },
                                    ]}
                                >
                                    <Input
                                        onChange={(e) =>
                                            setAccount((p) => ({
                                                ...p,
                                                description: e.target.value,
                                            }))
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                md={8}
                            >
                                <Form.Item
                                    name='flow'
                                    label='Fluxo'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Selecione o fluxo da conta',
                                        },
                                    ]}
                                >
                                    <Select
                                        options={[
                                            {
                                                value: 'receber',
                                                label: 'Conta a Receber',
                                            },
                                            {
                                                value: 'pagar',
                                                label: 'Conta a Pagar',
                                            },
                                        ]}
                                        onChange={(e) =>
                                            setAccount((p) => ({
                                                ...p,
                                                flow: e,
                                            }))
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            <Col
                                xs={24}
                                md={8}
                            >
                                <Form.Item
                                    name='category'
                                    label='Categoria'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Informe a categoria',
                                        },
                                    ]}
                                >
                                    <Select
                                        options={categories?.map((c) => ({
                                            value: c.key,
                                            label: c.name,
                                        }))}
                                        onChange={(e) =>
                                            setAccount((p) => ({
                                                ...p,
                                                category: e,
                                            }))
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                            <Col
                                xs={24}
                                md={
                                    account.frequency !== 'unico' &&
                                    !account.definedQuantity
                                        ? 8
                                        : 6
                                }
                            >
                                <Form.Item
                                    name='frequency'
                                    label='Frequência'
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Selecione a frequência da conta',
                                        },
                                    ]}
                                >
                                    <Select
                                        options={[
                                            {
                                                value: 'unico',
                                                label: 'Pagamento único',
                                            },
                                            {
                                                value: 'semanal',
                                                label: 'Semanal',
                                            },
                                            {
                                                value: 'mensal',
                                                label: 'Mensal',
                                            },
                                            { value: 'anual', label: 'Anual' },
                                        ]}
                                        onChange={(e) =>
                                            setAccount((p) => ({
                                                ...p,
                                                frequency: e,
                                            }))
                                        }
                                    />
                                </Form.Item>
                            </Col>
                            {account.frequency === 'unico' && (
                                <Col
                                    xs={24}
                                    md={6}
                                >
                                    <Form.Item
                                        name='value'
                                        label='Valor'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Insira o valor',
                                            },
                                        ]}
                                        normalize={formatCurrency}
                                    >
                                        <Input
                                            onChange={(e) =>
                                                setAccount((p) => ({
                                                    ...p,
                                                    value: e.target.value,
                                                }))
                                            }
                                        />
                                    </Form.Item>
                                </Col>
                            )}
                            {account.frequency !== 'unico' && (
                                <>
                                    <Col
                                        xs={24}
                                        md={!account.definedQuantity ? 8 : 6}
                                    >
                                        <Form.Item
                                            name='installmentsValue'
                                            label='Valor da Parcela'
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Insira o valor da parcela',
                                                },
                                            ]}
                                            normalize={formatCurrency}
                                        >
                                            <Input
                                                onChange={(e) =>
                                                    setAccount((p) => ({
                                                        ...p,
                                                        installmentsValue:
                                                            e.target.value,
                                                    }))
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col
                                        xs={24}
                                        md={!account.definedQuantity ? 8 : 6}
                                    >
                                        <Form.Item
                                            name='definedQuantity'
                                            label='Parcelas Indeterminadas'
                                        >
                                            <Switch
                                                onChange={(e) =>
                                                    setAccount((p) => ({
                                                        ...p,
                                                        definedQuantity: !e,
                                                    }))
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                    {account.definedQuantity && (
                                        <Col
                                            xs={24}
                                            md={6}
                                        >
                                            <Form.Item
                                                name='quantity'
                                                label='Parcelas'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Informe a quantidade de parcelas',
                                                    },
                                                ]}
                                            >
                                                <InputNumber
                                                    min={1}
                                                    max={48}
                                                    onChange={(e) =>
                                                        setAccount((p) => ({
                                                            ...p,
                                                            quantity: e || null,
                                                        }))
                                                    }
                                                    className='w-100'
                                                />
                                            </Form.Item>
                                        </Col>
                                    )}
                                    <Col
                                        xs={24}
                                        md={
                                            account.frequency === 'mensal'
                                                ? 8
                                                : 12
                                        }
                                    >
                                        <Form.Item
                                            name='startDate'
                                            label='Data de Início'
                                        >
                                            <DatePicker
                                                onChange={(_date, dateString) =>
                                                    setAccount((p) => ({
                                                        ...p,
                                                        startDate:
                                                            dateString.toString(),
                                                    }))
                                                }
                                                format='DD/MM/YYYY'
                                                className='w-100'
                                            />
                                        </Form.Item>
                                    </Col>
                                    {account.frequency === 'mensal' && (
                                        <Col
                                            xs={24}
                                            md={
                                                account.frequency === 'mensal'
                                                    ? 8
                                                    : 6
                                            }
                                        >
                                            <Form.Item
                                                name='dueDate'
                                                label='Dia de Vencimento'
                                            >
                                                <InputNumber
                                                    onChange={(e) =>
                                                        setAccount((p) => ({
                                                            ...p,
                                                            dueDate: e,
                                                        }))
                                                    }
                                                    min={0}
                                                    max={31}
                                                    className='w-100'
                                                />
                                            </Form.Item>
                                        </Col>
                                    )}
                                </>
                            )}
                            {account.frequency === 'unico' && (
                                <Col
                                    xs={24}
                                    md={6}
                                >
                                    <Form.Item
                                        name='dueDate'
                                        label='Dia de Vencimento'
                                    >
                                        <DatePicker
                                            onChange={(_date, dateString) =>
                                                setAccount((p) => ({
                                                    ...p,
                                                    dueDate:
                                                        dateString.toString(),
                                                }))
                                            }
                                            format='DD/MM/YYYY'
                                            className='w-100'
                                        />
                                    </Form.Item>
                                </Col>
                            )}
                            <Col
                                xs={24}
                                md={
                                    account.frequency === 'unico'
                                        ? 6
                                        : account.frequency === 'mensal'
                                        ? 8
                                        : 12
                                }
                            >
                                <Form.Item
                                    name='payment'
                                    label='Método de Pagamento'
                                >
                                    <Select
                                        options={[
                                            { value: 'pix', label: 'Pix' },
                                            {
                                                value: 'boleto',
                                                label: 'Boleto',
                                            },
                                            {
                                                value: 'cartão',
                                                label: 'Cartão',
                                            },
                                            {
                                                value: 'transferência',
                                                label: 'Transferência Bancária',
                                            },
                                        ]}
                                        onChange={(e) =>
                                            setAccount((p) => ({
                                                ...p,
                                                payment: e,
                                            }))
                                        }
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            name='obs'
                            label='Observações'
                        >
                            <Input.TextArea />
                        </Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                        >
                            <FaSave /> Salvar conta
                        </Button>
                    </Form>
                </Card>
            </Spin>
        </React.Fragment>
    )
}
