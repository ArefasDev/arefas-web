import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import Auth from './components/pages/Auth/Auth'
import MemberDetails from './components/pages/Dashboard/Association/Members/MemberDetails/MemberDetails'
import Members from './components/pages/Dashboard/Association/Members/Members'
import NewMember from './components/pages/Dashboard/Association/NewMember/NewMember'
import PanelMembers from './components/pages/Dashboard/Association/Panel/Panel'
import Dashboard from './components/pages/Dashboard/Dashboard'
import Accounts from './components/pages/Dashboard/Financial/Accounts/Accounts'
import Beneficiaries from './components/pages/Dashboard/Financial/Beneficiaries/Beneficiaries'
import Categories from './components/pages/Dashboard/Financial/Categories/Categories'
import PanelFinancial from './components/pages/Dashboard/Financial/Panel/Panel'

export default function AppRouter() {
    const routes = [
        {
            path: '/',
            element: <Auth />,
        },
        {
            path: '/auth/:redirect',
            element: <Auth />,
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
            children: [
                {
                    index: true,
                    element: <PanelMembers />,
                },
                {
                    path: 'association',
                    element: <PanelMembers />,
                },
                {
                    path: 'association/members',
                    element: <Members />,
                },
                {
                    path: 'association/members/:id',
                    element: <MemberDetails />,
                },
                {
                    path: 'association/members/new',
                    element: <NewMember />,
                },
                {
                    path: 'financial',
                    element: <PanelFinancial />,
                },
                {
                    path: 'financial/categories',
                    element: <Categories />,
                },
                {
                    path: 'financial/beneficiaries',
                    element: <Beneficiaries />,
                },
                {
                    path: 'financial/accounts',
                    element: <Accounts />,
                },
            ],
        },
        {
            path: '*',
            element: <div>404</div>,
        },
    ]

    return (
        <Router>
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    >
                        {route.children?.map((child, index) => (
                            <Route
                                key={index}
                                index={child.index}
                                path={child.path}
                                element={child.element}
                            />
                        ))}
                    </Route>
                ))}
            </Routes>
        </Router>
    )
}
