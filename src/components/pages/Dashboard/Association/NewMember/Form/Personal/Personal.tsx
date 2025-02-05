import { Col, DatePicker, Input, Row, Select, Typography } from 'antd'
import { formatToCPF } from 'brazilian-values'
import React, { useEffect, useState } from 'react'
import { Member } from '../../../../../../../types/MemberType'
import UploadImage from '../../../../../../template/UploadImage/UploadImage'
import { StyledForm } from '../Form.styles'

type PersonalData = Member['personal']
type Sections = 'personal' | 'military' | 'contact' | 'association'

export default function Personal({
    onChange,
}: {
    onChange: (v: PersonalData, t: Sections) => void
}) {
    const [data, setData] = useState<PersonalData>({
        avatar: null,
    } as PersonalData)

    useEffect(() => {
        onChange(data, 'personal')
    }, [data, onChange])

    return (
        <React.Fragment>
            <Typography.Title level={4}>Dados Pessoais</Typography.Title>
            <div className='mb-3 d-flex justify-content-center'>
                <UploadImage
                    onChange={(URL) => setData((p) => ({ ...p, avatar: URL }))}
                />
            </div>
            <StyledForm
                label='Nome completo'
                name='name'
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                className='mb-3'
                rules={[
                    {
                        required: true,
                        message: 'Por favor, insira seu nome!',
                    },
                ]}
            >
                <Input
                    onChange={(e) =>
                        setData((p) => ({ ...p, name: e.target.value }))
                    }
                />
            </StyledForm>
            <Typography.Title level={5}>Documentos</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col
                    md={8}
                    xs={24}
                >
                    <StyledForm
                        name='cpf'
                        label='CPF'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira seu CPF!',
                            },
                        ]}
                        normalize={formatToCPF}
                    >
                        <Input
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    cpf: e.target.value,
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
                <Col
                    md={8}
                    xs={24}
                >
                    <StyledForm
                        label='Número da Reservista'
                        name='reservist-number'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                    >
                        <Input
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    reservistNumber: e.target.value,
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
                <Col
                    md={8}
                    xs={24}
                >
                    <StyledForm
                        label='Data da Baixa'
                        name='retirement-date'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                    >
                        <DatePicker
                            className='w-100'
                            format='DD/MM/YYYY'
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    retirementDate: e.format('DD/MM/YYYY'),
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
            </Row>
            <Typography.Title level={5}>Informações</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col
                    md={8}
                    xs={24}
                >
                    <StyledForm
                        label='Data de Nascimento'
                        name='birth-date'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Por favor, insira sua data de nascimento!',
                            },
                        ]}
                    >
                        <DatePicker
                            className='w-100'
                            format='DD/MM/YYYY'
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    birthDate: e.format('DD/MM/YYYY'),
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
                <Col
                    md={8}
                    xs={24}
                >
                    <StyledForm
                        label='Estado Civil'
                        name='civil-status'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira seu estado civil!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { label: 'Solteiro', value: 'solteiro' },
                                { label: 'Casado', value: 'casado' },
                                {
                                    label: 'Divorciado',
                                    value: 'divorciado',
                                },
                                { label: 'Viúvo', value: 'viúvo' },
                            ]}
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    civilStatus: e,
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
                <Col
                    md={8}
                    xs={24}
                >
                    <StyledForm
                        label='Sexo'
                        name='sex'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira seu sexo!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { label: 'Masculino', value: 'masculino' },
                                { label: 'Feminino', value: 'feminino' },
                            ]}
                            onChange={(e) => setData((p) => ({ ...p, sex: e }))}
                        />
                    </StyledForm>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col
                    md={12}
                    xs={24}
                >
                    <StyledForm
                        label='Profissão'
                        name='profession'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira sua profissão!',
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    profession: e.target.value,
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
                <Col
                    md={12}
                    xs={24}
                >
                    <StyledForm
                        label='Tipo Sanguíneo'
                        name='blood-type'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Por favor, insira seu tipo sanguíneo!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                { label: 'A+', value: 'A+' },
                                { label: 'A-', value: 'A-' },
                                { label: 'B+', value: 'B+' },
                                { label: 'B-', value: 'B-' },
                                { label: 'AB+', value: 'AB+' },
                                { label: 'AB-', value: 'AB-' },
                                { label: 'O+', value: 'O+' },
                                { label: 'O-', value: 'O-' },
                            ]}
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    bloodType: e,
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
            </Row>
        </React.Fragment>
    )
}
