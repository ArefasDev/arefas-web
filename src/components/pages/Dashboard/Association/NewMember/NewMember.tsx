import { FaHome, FaUserPlus } from 'react-icons/fa'
import PageHeader from '../../../../template/PageHeader/PageHeader'
import Form from './Form/Form'

export default function NewMember() {
    return (
        <div>
            <PageHeader
                icon={<FaUserPlus />}
                title='Cadastro de associados'
                path={[
                    {
                        icon: <FaHome />,
                        value: 'dashboard/association',
                        label: 'Painel',
                    },
                    {
                        icon: <FaUserPlus />,
                        value: 'members/new',
                        label: 'Novo membro',
                    },
                ]}
            />
            <Form />
        </div>
    )
}
