import { Col, DatePicker, Row, Select, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { Member } from '../../../../../../../types/MemberType'
import { StyledForm } from '../Form.styles'

type AssociationData = Member['association']
type Sections = 'personal' | 'military' | 'contact' | 'association'

export default function Association({
    onChange,
}: {
    onChange: (v: AssociationData, t: Sections) => void
}) {
    const [data, setData] = useState<AssociationData>({
        associationDate: new Date().toISOString(),
        validityDate: new Date(
            new Date().setFullYear(new Date().getFullYear() + 2)
        ).toISOString(),
        status: 'ativo',
    } as AssociationData)

    useEffect(() => onChange(data, 'association'), [data, onChange])

    return (
        <React.Fragment>
            <Typography.Title level={5}>
                Informações da Associação
            </Typography.Title>
            <Row gutter={[16, 16]}>
                <Col
                    md={6}
                    xs={24}
                >
                    <StyledForm
                        label='Categoria'
                        name='category'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira a categoria!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { value: 'diretor', label: 'Diretor' },
                                { value: 'presidente', label: 'Presidente' },
                                { value: 'secretário', label: 'Secretário' },
                                { value: 'tesoureiro', label: 'Tesoureiro' },
                                { value: 'associado', label: 'Associado' },
                                { value: 'colaborador', label: 'Colaborador' },
                                {
                                    value: 'amigo',
                                    label: 'Amigo',
                                },
                            ]}
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    category: e,
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
                <Col
                    md={6}
                    xs={24}
                >
                    <StyledForm
                        label={
                            <span>
                                <span style={{ color: 'red' }}>*</span> Data da
                                Associação
                            </span>
                        }
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Por favor, insira a data da associação!',
                            },
                        ]}
                    >
                        <DatePicker
                            className='w-100'
                            format='DD/MM/YYYY'
                            value={dayjs(data.associationDate)}
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    associationDate: e.format('DD/MM/YYYY'),
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
                <Col
                    md={6}
                    xs={24}
                >
                    <StyledForm
                        label={
                            <span>
                                <span style={{ color: 'red' }}>*</span> Validade
                            </span>
                        }
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira a validade!',
                            },
                        ]}
                    >
                        <DatePicker
                            className='w-100'
                            format='DD/MM/YYYY'
                            value={dayjs(data.validityDate)}
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    validityDate: e.format('DD/MM/YYYY'),
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
                <Col
                    md={6}
                    xs={24}
                >
                    <StyledForm
                        label={
                            <span>
                                <span style={{ color: 'red' }}>*</span> Status
                                do Associado
                            </span>
                        }
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Por favor, insira o status do associado!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { label: 'Ativo', value: 'ativo' },
                                { label: 'Inativo', value: 'inativo' },
                            ]}
                            value={data.status}
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    status: e,
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
            </Row>
        </React.Fragment>
    )
}
