/** Описывает возможные виды пакетов */
export enum PacketType {
    REQUEST,
    RESPONSE,
}

/** Описывает структуру тела Data при запросе */
export type RequestBody = {
    method: string,
    fields: object;
}

/** Описывает структуру тела Data при ответе */
export type ResponseBody = {
    is_error: boolean,
    data: object | undefined,
};

/** Описывает общую структуру пакета */
export type Packet = {
    id: number,
    type: PacketType,
    data: ResponseBody | RequestBody,
};

/** Описывает структуру ошибки не правильного пакета */
export class InvalidPacketError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "InvalidPacketError";
    }
}