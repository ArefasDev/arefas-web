import { Empty } from 'antd'
import React from 'react'
import { FaHome } from 'react-icons/fa'
import PageHeader from '../../../../template/PageHeader/PageHeader'

export default function Panel() {
    return (
        <React.Fragment>
            <PageHeader
                title='Painel'
                icon={<FaHome />}
                path={[
                    {
                        icon: <FaHome />,
                        value: 'dashboard/association',
                        label: 'Painel',
                    },
                ]}
            />
            <div className='p-3 d-flex justify-content-center align-items-center h-100'>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
        </React.Fragment>
    )
}
