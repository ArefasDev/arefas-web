type DashboardReport = {
    biggestMovements: {
        name: string
        value: number
        percentage: number
        variation: number
    }[]
    totalMovement: number
    accountsReceivable: {
        category: string
        value: number
        label: string
    }[]
    entryExit: {
        date: string
        value: number
        category: 'Entrada' | 'Saída'
    }[]
    insights: string[]
    movements: {
        key: string
        description: string
        value: number
        category: string
        flow: string
        date: string
    }[]
}

export type { DashboardReport }
