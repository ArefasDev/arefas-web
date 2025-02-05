import { Table } from 'antd'

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

interface BeneficiariesTableProps {
    beneficiaries: Beneficiary[]
    onEdit: (beneficiary: Beneficiary) => void
    onDelete: (id: string) => void
}

export default function BeneficiariesTable({
    beneficiaries,
    onEdit,
    onDelete,
}: BeneficiariesTableProps) {
    const renderAddress = (address: Contact['addresses'][0]) => {
        return `${address.street}, ${address.number} - ${address.city}/${address.uf} - CEP: ${address.cep}`
    }
    const columns = [
        {
            title: 'Nome',
            dataIndex: ['personal', 'name'],
            key: 'name',
        },
        {
            title: 'CPF/CNPJ',
            dataIndex: ['personal', 'document'],
            key: 'document',
        },
        {
            title: 'Email',
            dataIndex: ['contact', 'emails'],
            key: 'email',
            render: (_: unknown, record: Beneficiary) => (
                <span>
                    {record.contact.emails.find((e) => e.isPrimary)?.email}
                </span>
            ),
        },
        {
            title: 'Telefone',
            dataIndex: ['contact', 'phones'],
            key: 'phone',
            render: (_: unknown, record: Beneficiary) => (
                <span>
                    {record.contact.phones.find((p) => p.isPrimary)?.phone}
                </span>
            ),
        },
        {
            title: 'Endereço',
            dataIndex: ['contact', 'addresses'],
            key: 'address',
            render: (_: unknown, record: Beneficiary) => (
                <span>
                    {renderAddress(
                        record.contact.addresses.find((a) => a.isPrimary) ||
                            ({} as Contact['addresses'][0])
                    )}
                </span>
            ),
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_: unknown, record: Beneficiary) => (
                <span>
                    <a
                        onClick={() => onEdit(record)}
                        style={{ marginRight: 8 }}
                    >
                        Editar
                    </a>
                    <a
                        onClick={() => onDelete(record.id || '')}
                        style={{ color: 'red' }}
                    >
                        Excluir
                    </a>
                </span>
            ),
        },
    ]

    return (
        <Table
            rowKey='id'
            columns={columns}
            dataSource={beneficiaries}
            className='border rounded bg-white'
            scroll={{ x: 'max-content' }}
        />
    )
}
