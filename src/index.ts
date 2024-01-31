/**
 * Основной код бинарного коммуникационного протокола
 * для общения между клиентом и сервером awamii.discus
 *
 * Author: @kanelecake
 */
import * as packet from "./packet";
import {InvalidPacketError, Packet, PacketType, RequestBody, ResponseBody} from "./types";

import * as types from "./types";

class v1 {
    /**
     * Используется для парсинга буфферов пакетов
     * @param data {ArrayBuffer}
     */
    static parse(data: ArrayBuffer): Packet {
        // проверяем общий размер пакета
        if (data.byteLength == 0)
            throw new InvalidPacketError("Empty packet provided");
        return packet.decode(data);
    }

    /**
     * Используется для формирование ответного пакета
     * @param packetId {number} идентификатор пакета
     * @param data {object | undefined | string} данные для отправки на клиент (строка если ошибка)
     */
    static response(packetId: number, data?: object | string): ArrayBuffer {
        return packet.encode(
            PacketType.RESPONSE,
            { is_error: typeof data === "string", data } as ResponseBody,
            packetId
        );
    }

    /**
     * Используется для формирование пакета запроса
     * @param method {string} вызываемый метод
     * @param fields {object} передаваемые поля с значениями
     */
    static request(method: string, fields?: object): ArrayBuffer {
        return packet.encode(
            PacketType.REQUEST,
            { method, fields } as RequestBody,
            packet.getRandomInt()
        );
    }
}

export {
    types,
    v1,
}
