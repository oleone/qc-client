/**
 * Criado por Bruno Leone
 * Modulo criado para tratar resultados vindos da api e criação de parametros para envio
 *
 */
// export declare namespace Results {
export interface ApiResult<T> {
    ok: boolean;
    data?: any;
    message?: string;
    error?: any;
    nTotal?: number;
}

export interface PaginationParams {
    current?: number;
    perPage?: number;
    select?: Select[];
    where?: Where[];
    orderBy?: string;
    direction?: 'asc' | 'desc';
}

export interface ErrorResult {
    code: number;
    errors: Array<Input>;
    hasError: boolean;
}

export interface Input {
    field: string;
    message: string;
}

export interface Where {
    field: string;
    condition: '==' | '>' | '<';
    value: string | boolean | number | Date;
}

export interface Select {
    field: string;
}

export class Url {
    params: string;

    constructor(_params: string) {
        this.params = _params;
    }

    static mountUrl() { }
}

export class ErrorMessage {
    message: string;
    field: string;

    constructor() {
        this.message = '';
        this.field = '';
    }
}

export interface ServerError {
    hasError: boolean;
    errors: ErrorMessage | ErrorMessage[];
    code: number;
}
