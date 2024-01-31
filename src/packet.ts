import sizeof from "object-sizeof";
import {InvalidPacketError, Packet, PacketType, RequestBody, ResponseBody} from "./types";

const packetBytesSize = {
    idSize: 4,
    typeSize: 4,
};

/**
 * Метод для декодирования пакета из бинарного вида
 * @param data {Uint8Array} буфер данных
 * @return {Packet}
 *
 * TODO: добавить шифрование
 */
export function decode(data: ArrayBuffer): Packet {
    const buffer = Buffer.from(data);
    console.log(buffer);

    const packetId = buffer.readUint32BE();
    const packetType = buffer.readUint32BE(packetBytesSize.idSize);

    // проверка на существование типа пакета
    if (!(packetType in PacketType)) {
        throw new InvalidPacketError(`'packetType' with id=${packetType} is not supported`);
    }

    const packetData = JSON.parse(
        buffer.subarray(packetBytesSize.idSize + packetBytesSize.typeSize).toString("utf-8")
    );

    return {
        id: packetId,
        type: packetType,
        data: packetData,
    } as Packet;
}

/**
 * Создает новый пакет для отправки
 * @param type {PacketType} тип пакета
 * @param data {object | undefined} данные пакета
 * @param packetId {number} случайное число полученное от клиента (если оно не переданно, то присваивается случайное)
 * @return {ArrayBuffer} результат для отправки
 *
 * | id (4 bytes) | type(4 bytes) | data (unlimited) |
 * TODO: добавить шифрование
 */
export function encode(type: PacketType, data: RequestBody | ResponseBody, packetId?: number): ArrayBuffer {
    const buffer = Buffer.alloc(sizeof(data) + packetBytesSize.idSize + packetBytesSize.typeSize);

    // записываем идентификатор в пакет
    // если он передан - то записываем переданный, иначе создаем новый
    buffer.writeUint32BE(packetId || getRandomInt());
    buffer.writeUint32BE(Number(type), packetBytesSize.idSize);
    buffer.write(JSON.stringify(data), packetBytesSize.typeSize + packetBytesSize.idSize, "utf-8");

    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
}

export function getRandomInt(): number {
    const min = Math.ceil(0);
    const max = Math.floor(4_294_967_295);
    return Math.floor(Math.random() * (max - min) + min);
}