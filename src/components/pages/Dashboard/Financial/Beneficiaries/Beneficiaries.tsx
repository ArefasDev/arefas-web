import { FloatButton } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaChartBar, FaPlus, FaUsers } from 'react-icons/fa'
import { baseURL } from '../../../../../globals'
import { useReload } from '../../../../../hooks/useReload'
import PageHeader from '../../../../template/PageHeader/PageHeader'
import BeneficiariesTable from './BeneficiariesTable'
import NewBeneficiary from './NewBeneficiary'

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

export default function Beneficiaries() {
    const [open, setOpen] = useState<boolean>(false)
    const [reload, reloading] = useReload()
    const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([])
    const [editingBeneficiary, setEditingBeneficiary] = useState<
        Beneficiary | undefined
    >()

    useEffect(() => {
        const fetchBeneficiaries = async () => {
            try {
                const response = await axios.get(`${baseURL}/docs`, {
                    params: {
                        path: 'beneficiaries',
                    },
                })
                setBeneficiaries(response.data)
            } catch (error) {
                console.error('Erro ao buscar beneficiários', error)
            }
        }

        fetchBeneficiaries()
    }, [reload])

    const onCloseModal = (updated?: Beneficiary | undefined) => {
        setOpen(false)
        setEditingBeneficiary(undefined)
        if (updated) reload()
    }

    const handleEdit = (record: Beneficiary) => {
        setEditingBeneficiary(record)
        setOpen(true)
    }

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`${baseURL}/doc`, {
                params: {
                    id,
                    path: 'beneficiaries',
                },
            })
            setBeneficiaries((prev) => prev.filter((b) => b.id !== id))
            reload()
        } catch (error) {
            console.error('Erro ao excluir beneficiário', error)
        }
    }

    return (
        <React.Fragment>
            <PageHeader
                icon={<FaUsers />}
                title='Cadastro de Beneficiários'
                path={[
                    {
                        label: 'Painel',
                        value: 'dashboard/financial',
                        icon: <FaChartBar />,
                    },
                    {
                        label: 'Beneficiários',
                        value: 'dashboard/financial/beneficiaries',
                        icon: <FaUsers />,
                    },
                ]}
            />
            <div className='my-3' />
            <BeneficiariesTable
                beneficiaries={beneficiaries}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            {reloading ? null : (
                <NewBeneficiary
                    open={open}
                    onClose={onCloseModal}
                    initialData={editingBeneficiary}
                />
            )}
            <FloatButton
                icon={<FaPlus />}
                onClick={() => setOpen(true)}
                className='border'
                type='primary'
                style={{
                    height: 50,
                    width: 50,
                }}
            />
        </React.Fragment>
    )
}
