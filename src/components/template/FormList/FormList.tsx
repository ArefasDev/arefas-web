import { Button, Col, Input, List, message, Row, Select, Space } from 'antd'
import ButtonGroup from 'antd/es/button/button-group'
import { useState } from 'react'
import { FaPlus, FaSave } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

const { Option } = Select

type FormValues = {
    [key: string]: string | number | boolean | undefined
    isPrimary?: boolean
}

type Field = {
    name: string
    label: string
    type: 'text' | 'select'
    span: {
        sm?: number
        md?: number
        lg?: number
    }
    options?: { label: string; value: string }[]
    format?: (e: string) => string
}

export default function FormList({
    config,
    onChange,
}: {
    config: {
        fields: Field[]
        hasPrimary?: boolean
    }
    onChange?: (items: FormValues[]) => void
}) {
    const [formData, setFormData] = useState<FormValues>({})
    const [items, setItems] = useState<FormValues[]>([])
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)
    const [messageApi, contextHolder] = message.useMessage()

    const handleAddOrUpdate = () => {
        const allFieldsFilled = config.fields.every((field) => {
            return (
                formData[field.name] !== undefined &&
                formData[field.name] !== ''
            )
        })

        if (!allFieldsFilled) {
            messageApi.open({
                type: 'error',
                content: 'Todos os campos são obrigatórios!',
            })
            return
        }

        const updatedFormData = config.hasPrimary
            ? { ...formData, isPrimary: !!formData.isPrimary }
            : formData

        let updatedItems: FormValues[]
        if (editingIndex !== null) {
            updatedItems = [...items]
            updatedItems[editingIndex] = updatedFormData
            setEditingIndex(null)
            messageApi.open({
                type: 'success',
                content: 'Item atualizado com sucesso!',
            })
        } else {
            updatedItems = [...items, updatedFormData]
            messageApi.open({
                type: 'success',
                content: 'Item adicionado com sucesso!',
            })
        }

        if (config.hasPrimary) {
            updatedItems = updatedItems.map((item, index) => ({
                ...item,
                isPrimary: index === updatedItems.findIndex((i) => i.isPrimary),
            }))
        }

        setItems(updatedItems)
        onChange?.(updatedItems)
        setFormData({})
        setIsFormVisible(false)
    }

    const handleEdit = (index: number) => {
        setFormData(items[index])
        setEditingIndex(index)
        setIsFormVisible(true)
    }

    const handleRemove = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index)
        setItems(updatedItems)
        onChange?.(updatedItems)
        messageApi.open({
            type: 'success',
            content: 'Item removido com sucesso!',
        })
    }

    const renderItem = (item: FormValues) => {
        const fieldsToShow = Object.entries(item)
            .filter(([key]) => key !== 'isPrimary')
            .map(([, value]) => value)
            .join(', ')

        return `${fieldsToShow}${item.isPrimary ? ' (Primário)' : ''}`
    }

    return (
        <div>
            {contextHolder}
            {items.length > 0 && (
                <List
                    header={<b>Itens</b>}
                    bordered
                    size='small'
                    dataSource={items}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[
                                <Button
                                    type='link'
                                    onClick={() => handleEdit(index)}
                                >
                                    Editar
                                </Button>,
                                <Button
                                    type='link'
                                    danger
                                    onClick={() => handleRemove(index)}
                                >
                                    Remover
                                </Button>,
                            ]}
                        >
                            {renderItem(item)}
                        </List.Item>
                    )}
                />
            )}
            {isFormVisible && (
                <div style={{ marginTop: 16 }}>
                    <Row gutter={[16, 16]}>
                        {config.fields.map((field) => (
                            <Col
                                key={field.name}
                                xs={24}
                                sm={field.span?.sm || 24}
                                md={field.span?.md || 12}
                                lg={field.span?.lg || 8}
                            >
                                <label className='w-100'>
                                    {field.label}
                                    {field.type === 'select' ? (
                                        <Select
                                            value={formData[field.name]}
                                            onChange={(value) =>
                                                setFormData({
                                                    ...formData,
                                                    [field.name]: value,
                                                })
                                            }
                                            className='w-100'
                                        >
                                            {field.options?.map(
                                                (option: {
                                                    value: string
                                                    label: string
                                                }) => (
                                                    <Option
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </Option>
                                                )
                                            )}
                                        </Select>
                                    ) : (
                                        <Input
                                            type={field.type}
                                            value={
                                                formData[field.name] as string
                                            }
                                            onChange={(e) => {
                                                let value = e.target.value
                                                if (field.format)
                                                    value = field.format(value)
                                                setFormData({
                                                    ...formData,
                                                    [field.name]: value,
                                                })
                                            }}
                                            className='w-100'
                                        />
                                    )}
                                </label>
                            </Col>
                        ))}
                    </Row>
                    {config.hasPrimary && (
                        <div style={{ marginBottom: 16 }}>
                            <label className='d-flex justify-content-start align-items-center'>
                                <Input
                                    className='me-2'
                                    style={{ width: 'auto' }}
                                    type='checkbox'
                                    checked={!!formData.isPrimary}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            isPrimary: e.target.checked,
                                        })
                                    }
                                />
                                Definir como primário
                            </label>
                        </div>
                    )}
                    <ButtonGroup>
                        <Button
                            type='primary'
                            danger
                            onClick={() => {
                                setFormData({})
                                setIsFormVisible(!isFormVisible)
                                setEditingIndex(null)
                            }}
                            size='small'
                        >
                            <FaX /> Cancelar
                        </Button>
                        <Button
                            type='primary'
                            onClick={handleAddOrUpdate}
                            size='small'
                        >
                            <FaSave /> Salvar
                        </Button>
                    </ButtonGroup>
                </div>
            )}
            <Space style={{ marginTop: 16 }}>
                {!isFormVisible && (
                    <Button
                        type='primary'
                        onClick={() => {
                            setFormData({})
                            setIsFormVisible(true)
                            setEditingIndex(null)
                        }}
                    >
                        <FaPlus /> Adicionar
                    </Button>
                )}
            </Space>
        </div>
    )
}
