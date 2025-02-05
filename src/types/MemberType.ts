export type Member = {
    id?: string
    personal: {
        avatar?: string | null
        name: string
        cpf: string
        reservistNumber?: string
        retirementDate?: string
        birthDate: string
        civilStatus: string
        sex: string
        profession: string
        bloodType: string
    }
    military: {
        unitServed: string
        nickname: string
        yearServed: string
        number: string
        company: string
        armedForces: 'exercito' | 'aeronaltica' | 'marinha'
        patent: string
    }
    contact: {
        emails: Array<{ email: string; isPrimary?: boolean }>
        phones: Array<{ phone: string; isPrimary?: boolean }>
        addresses: Array<{
            cep: string
            uf: string
            city: string
            street: string
            number: string
            isPrimary?: boolean
        }>
        socialMedias: Array<{
            username: string
            socialMedia: string
            isPrimary?: boolean
        }>
    }
    association: {
        category: string
        associationDate: string
        validityDate: string
        status: string
    }
}
