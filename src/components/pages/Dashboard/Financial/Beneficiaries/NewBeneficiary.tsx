import {
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Row,
    Typography,
    message,
} from 'antd'
import axios from 'axios'
import {
    formatToCEP,
    formatToCPFOrCNPJ,
    formatToPhone,
    isCPFOrCNPJ,
} from 'brazilian-values'
import { useEffect, useState } from 'react'
import { baseURL } from '../../../../../globals'
import FormList from '../../../../template/FormList/FormList'
import Contact from '../../Association/Members/MemberDetails/Sections/Contact'

type Contact = {
    emails: Array<{ email: string; isPrimary?: boolean }>
    phones: Array<{ phone: string; isPrimary?: boolean }>
    addresses: Array<{
        cep: string
        uf: string
        city: string
        street: string
        number: string
        isPrimary?: boolean
    }>
}

type Beneficiary = {
    id?: string
    personal: {
        name: string
        document: string
    }
    contact: Contact
}

type NewBeneficiaryProps = {
    open: boolean
    onClose: (updated?: Beneficiary) => void
    initialData?: Beneficiary
}

export default function NewBeneficiary({
    open,
    onClose,
    initialData,
}: NewBeneficiaryProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<Beneficiary>(
        initialData || ({} as Beneficiary)
    )
    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (initialData) setData(initialData)
    }, [initialData])

    const validateBeneficiary = async () => {
        const { personal, contact } = data

        if (!personal?.name || !personal?.document) {
            messageApi.error('Preencha o nome e o CPF/CNPJ do beneficiário.')
            return false
        }

        if (!isCPFOrCNPJ(personal?.document)) {
            messageApi.error('Preencha um CPF/CNPJ válido.')
            return false
        }

        if (
            !contact?.emails.length ||
            !contact?.phones.length ||
            !contact?.addresses.length
        ) {
            messageApi.error(
                'É necessário preencher pelo menos um email, telefone e endereço.'
            )
            return false
        }

        const hasPrimaryEmail = contact.emails.find((e) => e.isPrimary)
        const hasPrimaryPhone = contact.phones.find((e) => e.isPrimary)
        const hasPrimaryAddress = contact.addresses.find(
            (e) => e.isPrimary === true
        )

        if (!hasPrimaryEmail || !hasPrimaryPhone || !hasPrimaryAddress) {
            messageApi.error(
                'É necessário que pelo menos um email, telefone e endereço sejam marcados como primários.'
            )
            return false
        }

        return true
    }

    const generateUniqueId = () =>
        (Math.floor(Math.random() * 10000000000) + Date.now())
            .toString()
            .slice(-10)

    const handleOk = async () => {
        setLoading(true)
        const isValid = await validateBeneficiary()
        if (isValid) {
            messageApi.info('Salvando...')
            try {
                if (data.id) {
                    // Editar beneficiário existente
                    await axios.put(`${baseURL}/doc`, {
                        path: 'beneficiaries',
                        id: data.id,
                        data,
                    })
                } else {
                    // Criar novo beneficiário
                    await axios.post(`${baseURL}/doc`, {
                        path: 'beneficiaries',
                        id: generateUniqueId(),
                        data,
                        primaryKey: 'personal.document',
                    })
                }

                messageApi.success('Beneficiário salvo.')
                setLoading(false)
                onClose(data)
            } catch (err: unknown) {
                setLoading(false)
                if (axios.isAxiosError(err)) {
                    const message = err.response?.data.message || err.message
                    messageApi.error(message)
                } else {
                    messageApi.error('Erro desconhecido')
                }
            }
        } else {
            setLoading(false)
        }
    }

    return (
        <Modal
            title='Cadastrar Beneficiário'
            open={open}
            confirmLoading={loading}
            onOk={handleOk}
            onCancel={() => onClose()}
            onClose={() => onClose()}
        >
            {contextHolder}
            <Form layout='vertical'>
                <Row gutter={[16, 16]}>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Form.Item
                            name='name'
                            label='Nome'
                            rules={[
                                {
                                    required: true,
                                    message: 'Preencha o nome do beneficiário',
                                },
                            ]}
                        >
                            <Input
                                onChange={(e) =>
                                    setData((p) => ({
                                        ...p,
                                        personal: {
                                            ...p.personal,
                                            name: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col
                        xs={24}
                        md={12}
                    >
                        <Form.Item
                            name='document'
                            label='CPF/CNPJ'
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Preencha o CPF/CNPJ do beneficiário',
                                },
                            ]}
                            normalize={formatToCPFOrCNPJ}
                        >
                            <Input
                                onChange={(e) =>
                                    setData((p) => ({
                                        ...p,
                                        personal: {
                                            ...p.personal,
                                            document: e.target.value,
                                        },
                                    }))
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider className='my-2 border-dark-subtle' />
                <Typography.Title level={5}>E-mail</Typography.Title>
                <FormList
                    config={{
                        fields: [
                            {
                                name: 'email',
                                label: 'E-mail',
                                type: 'text',
                                span: {
                                    md: 24,
                                    sm: 24,
                                    lg: 24,
                                },
                            },
                        ],
                        hasPrimary: true,
                    }}
                    onChange={(d) =>
                        setData((p) => ({
                            ...p,
                            contact: {
                                ...p.contact,
                                emails: d as Contact['emails'],
                            },
                        }))
                    }
                />
                <Divider className='my-2 border-dark-subtle' />
                <Typography.Title level={5}>Telefone</Typography.Title>
                <FormList
                    config={{
                        fields: [
                            {
                                name: 'phone',
                                label: 'Telefone',
                                type: 'text',
                                span: {
                                    sm: 24,
                                    md: 24,
                                    lg: 24,
                                },
                                format: (e) => formatToPhone(e),
                            },
                        ],
                        hasPrimary: true,
                    }}
                    onChange={(d) =>
                        setData((p) => ({
                            ...p,
                            contact: {
                                ...p.contact,
                                phones: d as Contact['phones'],
                            },
                        }))
                    }
                />
                <Divider className='my-2 border-dark-subtle' />
                <Typography.Title level={5}>Endereço</Typography.Title>
                <FormList
                    config={{
                        fields: [
                            {
                                name: 'cep',
                                label: 'CEP',
                                type: 'text',
                                span: {
                                    sm: 24,
                                    md: 12,
                                    lg: 12,
                                },
                                format: (e) => formatToCEP(e),
                            },
                            {
                                name: 'uf',
                                label: 'UF',
                                type: 'text',
                                span: {
                                    sm: 24,
                                    md: 12,
                                    lg: 12,
                                },
                            },
                            {
                                name: 'city',
                                label: 'Cidade',
                                type: 'text',
                                span: {
                                    sm: 24,
                                    md: 12,
                                    lg: 12,
                                },
                            },
                            {
                                name: 'street',
                                label: 'Logradouro',
                                type: 'text',
                                span: {
                                    sm: 24,
                                    md: 12,
                                    lg: 12,
                                },
                            },
                            {
                                name: 'number',
                                label: 'Número',
                                type: 'text',
                                span: {
                                    sm: 24,
                                    md: 24,
                                    lg: 24,
                                },
                            },
                        ],
                        hasPrimary: true,
                    }}
                    onChange={(d) =>
                        setData((p) => ({
                            ...p,
                            contact: {
                                ...p.contact,
                                addresses: d as Contact['addresses'],
                            },
                        }))
                    }
                />
            </Form>
        </Modal>
    )
}
