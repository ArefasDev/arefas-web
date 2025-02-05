import { Breadcrumb, Card, Typography } from 'antd'

interface PathItem {
    value: string
    label: string
    icon?: React.ReactNode
}

interface PageHeaderProps {
    icon?: React.ReactNode
    title: string
    path: PathItem[]
}

export default function PageHeader({ icon, title, path }: PageHeaderProps) {
    const breadcrumbItems = path.map((item, index) => {
        const fullPath = path
            .slice(0, index + 1)
            .map((p) => p.value)
            .join('/')

        return {
            key: item.value,
            href: `#/${fullPath}`,
            title: (
                <div className='d-flex align-items-center gap-2'>
                    {item.icon} {item.label}
                </div>
            ),
        }
    })

    return (
        <Card
            styles={{
                body: {
                    padding: '8px 20px',
                },
            }}
            className='border'
        >
            <div className='d-flex flex-sm-row flex-column gap-2'>
                <div className='d-flex align-items-center gap-2'>
                    {icon}
                    <Typography.Text>{title}</Typography.Text>
                </div>
                <Breadcrumb items={breadcrumbItems} />
            </div>
        </Card>
    )
}
