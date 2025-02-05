import { Col, DatePicker, Input, Row, Select, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Member } from '../../../../../../../types/MemberType'
import { StyledForm } from '../Form.styles'

type MilitaryData = Member['military']
type Sections = 'personal' | 'military' | 'contact' | 'association'

export default function Military({
    onChange,
}: {
    onChange: (v: MilitaryData, t: Sections) => void
}) {
    const [data, setData] = useState<MilitaryData>({} as MilitaryData)

    useEffect(() => {
        onChange(data, 'military')
    }, [data, onChange])

    const patents = {
        exercito: [
            { label: 'Soldado', value: 'soldado' },
            { label: 'Taifeiro de 2ª classe', value: 'taifeiro-de-2ª-classe' },
            { label: 'Taifeiro de 1ª classe', value: 'taifeiro-de-1ª-classe' },
            { label: 'Taifeiro-mor', value: 'taifeiro-mor' },
            { label: 'Cabo', value: 'cabo' },
            { label: '3º Sargento', value: '3º-sargento' },
            { label: '2º Sargento', value: '2º-sargento' },
            { label: '1º Sargento', value: '1º-sargento' },
            { label: 'Subtenente', value: 'subtenente' },
            { label: 'Aspirante a oficial', value: 'aspirante-a-oficial' },
            { label: '2º Tenente', value: '2º-tenente' },
            { label: '1º Tenente', value: '1º-tenente' },
            { label: 'Capitão', value: 'capitao' },
            { label: 'Major', value: 'major' },
            { label: 'Tenente-Coronel', value: 'tenente-coronel' },
            { label: 'Coronel', value: 'coronel' },
            { label: 'General de Brigada', value: 'general-de-brigada' },
            { label: 'General de Divisão', value: 'general-de-divisao' },
            { label: 'General do Exército', value: 'general-do-exercito' },
            { label: 'Marechal', value: 'marechal' },
        ],
        aeronaltica: [
            { label: 'Taifeiro 2ª Classe', value: 'taifeiro-2ª-classe' },
            { label: 'Taifeiro 1ª Classe', value: 'taifeiro-1ª-classe' },
            { label: 'Soldado 2ª Classe', value: 'soldado-2ª-classe' },
            { label: 'Soldado 1ª Classe', value: 'soldado-1ª-classe' },
            { label: 'Taifeiro Mor', value: 'taifeiro-mor' },
            { label: 'Cabo', value: 'cabo' },
            { label: '3º Sargento', value: '3º-sargento' },
            { label: '2º Sargento', value: '2º-sargento' },
            { label: '1º Sargento', value: '1º-sargento' },
            { label: 'Suboficial', value: 'suboficial' },
            { label: 'Cadete', value: 'cadete' },
            { label: 'Aspirante a Oficial', value: 'aspirante-a-oficial' },
            { label: '2º Tenente', value: '2º-tenente' },
            { label: '1º Tenente', value: '1º-tenente' },
            { label: 'Capitão', value: 'capitao' },
            { label: 'Major', value: 'major' },
            { label: 'Tenente Coronel', value: 'tenente-coronel' },
            { label: 'Coronel', value: 'coronel' },
            { label: 'Brigadeiro', value: 'brigadeiro' },
            { label: 'Major Brigadeiro', value: 'major-brigadeiro' },
            { label: 'Tenente Brigadeiro', value: 'tenente-brigadeiro' },
            { label: 'Marechal do Ar', value: 'marechal-do-ar' },
        ],
        marinha: [
            { label: 'Marinheiro', value: 'marinheiro' },
            { label: 'Cabo ', value: 'cabo' },
            { label: '3º Sargento', value: '3º-sargento' },
            { label: '2º Sargento', value: '2º-sargento' },
            { label: '1º Sargento', value: '1º-sargento' },
            { label: 'Suboficial', value: 'suboficial' },
            { label: 'Guarda-Marinha', value: 'guarda-marinha' },
            { label: '2º Tenente', value: '2º-tenente' },
            { label: '1º Tenente', value: '1º-tenente' },
            { label: 'Capitão-Tenente', value: 'capitao-tenente' },
            { label: 'Capitão de Corveta', value: 'capitao-de-corveta' },
            { label: 'Capitão de Fragata', value: 'capitao-de-fragata' },
            {
                label: 'Capitão de Mar e Guerra',
                value: 'capitao-de-mar-e-guerra',
            },
            { label: 'Contra-Almirante', value: 'contra-almirante' },
            { label: 'Vice-Almirante', value: 'vice-almirante' },
            { label: 'Almirante de Esquadra', value: 'almirante-de-esquadra' },
            { label: 'Almirante', value: 'almirante' },
        ],
    }

    return (
        <React.Fragment>
            <Typography.Title level={4}>Informações Militares</Typography.Title>
            <Row gutter={[16, 16]}>
                <Col
                    md={6}
                    xs={24}
                >
                    <StyledForm
                        label='Unidade que Serviu'
                        name='unit-served'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Por favor, insira a unidade que serviu!',
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    unitServed: e.target.value,
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
                        label='Ano que Serviu'
                        name='year-served'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o ano que serviu!',
                            },
                        ]}
                    >
                        <DatePicker
                            picker='year'
                            className='w-100'
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    yearServed: e.format('YYYY'),
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
                        label='Forças Armadas'
                        name='armed-forces'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Por favor, insira a sua força armada!',
                            },
                        ]}
                    >
                        <Select
                            className='w-100'
                            options={[
                                { label: 'Exercito', value: 'exercito' },
                                { label: 'Marinha', value: 'marinha' },
                                { label: 'Aeronáutica', value: 'aeronaltica' },
                            ]}
                            onChange={(e) =>
                                setData((p) => ({ ...p, armedForces: e }))
                            }
                        />
                    </StyledForm>
                </Col>
                <Col
                    md={6}
                    xs={24}
                >
                    <StyledForm
                        label='Patente'
                        name='patent'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira a sua patente!',
                            },
                        ]}
                    >
                        <Select
                            className='w-100'
                            options={patents[data.armedForces]}
                            onChange={(e) =>
                                setData((p) => ({ ...p, patent: e }))
                            }
                        />
                    </StyledForm>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col
                    md={8}
                    xs={24}
                >
                    <StyledForm
                        label='Nome de Guerra'
                        name='nickname'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Por favor, insira seu nome de guerra!',
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    nickname: e.target.value,
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
                        label='Número de Guerra'
                        name='number'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira o número!',
                            },
                        ]}
                    >
                        <Input
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    number: e.target.value,
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
                        label='Companhia'
                        name='company'
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        className='mb-3'
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, insira a companhia!',
                            },
                        ]}
                    >
                        <Select
                            options={[
                                {
                                    value: 'Primeira CIA',
                                    label: 'Primeira CIA',
                                },
                                { value: 'Segunda CIA', label: 'Segunda CIA' },
                                {
                                    value: 'CIA de Apoio',
                                    label: 'CIA de Apoio',
                                },
                                { value: 'CCS', label: 'CCS' },
                                { value: 'Outra', label: 'Outra' },
                            ]}
                            onChange={(e) =>
                                setData((p) => ({
                                    ...p,
                                    company: e,
                                }))
                            }
                        />
                    </StyledForm>
                </Col>
            </Row>
        </React.Fragment>
    )
}
