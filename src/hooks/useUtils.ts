function useUtils() {
    const firstUppercase = (str: string) =>
        str[0]?.toUpperCase() + str?.substring(1)

    const formatCurrency = (value: string): string => {
        if (!value) return ''
        const numericValue = parseFloat(value.replace(/[^0-9]/g, '')) / 100
        return numericValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
    }

    return { firstUppercase, formatCurrency }
}

export { useUtils }
