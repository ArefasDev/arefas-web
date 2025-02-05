import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BsFillPhoneFill } from 'react-icons/bs'
import {
    FaChartPie,
    FaDollarSign,
    FaExclamationTriangle,
    FaFileAlt,
    FaHome,
    FaList,
    FaUserPlus,
    FaUsers,
} from 'react-icons/fa'
import {
    FaChartColumn,
    FaCircleNodes,
    FaRightLeft,
    FaScaleBalanced,
    FaUserGroup,
} from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router'
import { useEmitter } from '../../../hooks/useEmitter'
import { StyledMenu } from './Sidebar.styles'

interface MenuItem {
    key: string
    icon: JSX.Element
    label: string
    path?: string
    onClick?: () => void
    children?: MenuItem[]
}

export default function Sidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const sidebarRef = useRef<HTMLDivElement>(null)
    const [openKeys, setOpenKeys] = useState<string[]>([])
    const [open, setOpen] = useState<boolean>(false)
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [activeKey, setActiveKey] = useState<string>('')
    const { emitter } = useEmitter()
    const isMobile = window.innerWidth <= 768

    const toggleCollapsed = useCallback(
        (value: boolean) => {
            if (!isMobile) setCollapsed(value)
            else {
                setCollapsed(false)
                setOpen(!open)
            }
        },
        [isMobile, open]
    )

    useEffect(() => {
        emitter('sidebar').on('toggle', toggleCollapsed)
    }, [emitter, toggleCollapsed])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node) &&
                !(event.target as HTMLElement).closest('[data-sidebar-toggle]')
            ) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleOpenChange = (keys: string[]) =>
        setOpenKeys(keys.length > 1 ? [keys[keys.length - 1]] : keys)

    const createMenuItem = useCallback(
        (
            key: string,
            icon: JSX.Element,
            label: string,
            path?: string,
            children?: MenuItem[]
        ): MenuItem => ({
            key,
            icon,
            label,
            onClick: path
                ? () => {
                      navigate(path)
                      setOpen(false)
                  }
                : undefined,
            path,
            children,
        }),
        [navigate]
    )

    const menuItemsFinanceiro = useMemo(
        () => [
            createMenuItem(
                'panel',
                <FaChartColumn />,
                'Painel',
                '/dashboard/financial'
            ),
            createMenuItem(
                'contas',
                <FaDollarSign />,
                'Contas',
                '/dashboard/financial/accounts'
            ),
            createMenuItem('reports', <FaFileAlt />, 'Relatórios', undefined, [
                createMenuItem(
                    'balancete',
                    <FaScaleBalanced />,
                    'Balancete',
                    '/dashboard/financial/balancete'
                ),
                createMenuItem(
                    'fluxo-caixa',
                    <FaCircleNodes />,
                    'Fluxo de Caixa',
                    '/dashboard/financial/cash-flow'
                ),
                createMenuItem(
                    'graficos',
                    <FaChartPie />,
                    'Gráficos',
                    '/dashboard/financial/graphs'
                ),
            ]),
            createMenuItem(
                'beneficiaries',
                <FaUsers />,
                'Beneficiários',
                '/dashboard/financial/beneficiaries'
            ),
            createMenuItem(
                'conciliacao-bancaria',
                <FaRightLeft />,
                'Conciliação Bancária',
                '/dashboard/financial/bank-reconciliation'
            ),
            createMenuItem(
                'categories',
                <FaList />,
                'Categorias',
                '/dashboard/financial/categories'
            ),
        ],
        [createMenuItem]
    )

    const menuItemsAppMobile = useMemo(
        () => [
            createMenuItem(
                'alerts',
                <FaExclamationTriangle />,
                'Avisos',
                '/dashboard/mobile/warnings'
            ),
            createMenuItem(
                'news',
                <FaFileAlt />,
                'Notícias',
                '/dashboard/mobile/news'
            ),
        ],
        [createMenuItem]
    )

    const menuItems = useMemo(() => {
        if (location.pathname.startsWith('/dashboard/financial'))
            return menuItemsFinanceiro
        else if (location.pathname.startsWith('/dashboard/mobile'))
            return menuItemsAppMobile
        return [
            createMenuItem(
                'panel',
                <FaHome />,
                'Painel',
                '/dashboard/association'
            ),
            createMenuItem(
                'new-member',
                <FaUserPlus />,
                'Associado',
                '/dashboard/association/members/new'
            ),
            createMenuItem('reports', <FaFileAlt />, 'Relatórios', undefined, [
                createMenuItem(
                    'members',
                    <FaUsers />,
                    'Associados',
                    '/dashboard/association/members'
                ),
                createMenuItem(
                    'member-dependents',
                    <FaUserGroup />,
                    'Dependentes',
                    '/dashboard/association/member/dependents'
                ),
            ]),
            createMenuItem(
                'member-area',
                <BsFillPhoneFill />,
                'Área do Associado',
                undefined,
                [
                    createMenuItem(
                        'warnings',
                        <FaExclamationTriangle />,
                        'Avisos',
                        '/dashboard/association/app/warnings'
                    ),
                ]
            ),
        ]
    }, [
        location.pathname,
        createMenuItem,
        menuItemsFinanceiro,
        menuItemsAppMobile,
    ])

    useEffect(() => {
        const activeItem = menuItems.find((item) => {
            const test = location.pathname === item.path
            return !!test
        })

        setActiveKey(activeItem ? activeItem.key : '')
    }, [menuItems, location.pathname])

    return (
        <div
            ref={sidebarRef}
            className='h-100'
        >
            <StyledMenu
                $collapsed={collapsed}
                $open={open}
                className='p-3 h-100 border-end'
                mode='inline'
                style={{ width: collapsed ? '80px' : '280px' }}
                openKeys={openKeys}
                onOpenChange={handleOpenChange}
                inlineCollapsed={collapsed}
                selectedKeys={activeKey ? [activeKey] : []}
                items={menuItems}
            />
        </div>
    )
}
