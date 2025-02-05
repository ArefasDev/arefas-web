import axios from 'axios'

function useAPIs() {
    const getCep = async (cep: string) => {
        const url = `https://viacep.com.br/ws/${cep}/json/`
        const response = await axios.get(url)
        return response
    }

    return { getCep }
}

export { useAPIs }
