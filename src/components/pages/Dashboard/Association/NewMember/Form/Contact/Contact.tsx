import { Divider, Typography } from 'antd'
import { formatToCEP, formatToPhone } from 'brazilian-values'
import React, { useEffect, useState } from 'react'
import { Member } from '../../../../../../../types/MemberType'
import FormList from '../../../../../../template/FormList/FormList'

type ContactData = Member['contact']
type Sections = 'personal' | 'military' | 'contact' | 'association'

export default function Contact({
    onChange,
}: {
    onChange: (v: ContactData, t: Sections) => void
}) {
    const [data, setData] = useState<ContactData>({} as ContactData)

    useEffect(() => {
        onChange(data, 'contact')
    }, [data, onChange])

    return (
        <React.Fragment>
            <Typography.Title level={4}>Contato</Typography.Title>
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
                        emails: d as ContactData['emails'],
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
                        phones: d as ContactData['phones'],
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
                        addresses: d as ContactData['addresses'],
                    }))
                }
            />
            <Divider className='my-2 border-dark-subtle' />
            <Typography.Title level={5}>Redes Sociais</Typography.Title>
            <FormList
                config={{
                    fields: [
                        {
                            name: 'username',
                            label: 'Seu nome de usuário',
                            type: 'text',
                            span: {
                                sm: 24,
                                md: 12,
                                lg: 12,
                            },
                        },
                        {
                            name: 'social-media',
                            label: 'Rede Social',
                            type: 'select',
                            span: {
                                sm: 24,
                                md: 12,
                                lg: 12,
                            },
                            options: [
                                { label: 'Instagram', value: 'instagram' },
                                { label: 'Facebook', value: 'facebook' },
                                { label: 'Linkedin', value: 'linkedin' },
                                { label: 'Tiktok', value: 'tiktok' },
                                { label: 'X', value: 'x' },
                                { label: 'Youtube', value: 'youtube' },
                                { label: 'Twitch', value: 'twitch' },
                                { label: 'Snapchat', value: 'snapchat' },
                            ],
                        },
                    ],
                    hasPrimary: true,
                }}
                onChange={(d) =>
                    setData((p) => ({
                        ...p,
                        socialMedias: d as ContactData['socialMedias'],
                    }))
                }
            />
            <div className='mb-3' />
        </React.Fragment>
    )
}
