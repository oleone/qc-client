export interface AuthResult {
    accessToken: string;
    cpf: string;
    key: string;
    lojaId: string;
    numPropLoja: string;
    redeId: string;
    valor: number;
    xKeyI: string;
    xKeyII: string;

    fone: string;
    ddd: string;

    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
    cep?: string;
}