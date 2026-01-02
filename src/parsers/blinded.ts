import { type Entity, entityRe, parseEntity } from '../entities';
import { concatPattern } from '../helpers';
import { type IBaseEvent, defineParser } from './parser';

export type BlindedEventPayload = {
    player: Entity;
    attacker: Entity;
    duration: number;
    item: string;
    entindex: number;
};

export type BlindedEvent = IBaseEvent<'blinded', BlindedEventPayload>;

export const blindedParser = defineParser<BlindedEvent>({
    type: 'blinded',

    patterns: [
        concatPattern`^(?<player>${entityRe}) blinded for (?<duration>\\d+(?:\\.\\d+)?) by (?<attacker>${entityRe}) from (?<item>.+?) entindex (?<entindex>\\d+)$`,
    ],

    parse({ player, attacker, duration, item, entindex }) {
        return {
            player: parseEntity(player),
            attacker: parseEntity(attacker),
            duration: Number(duration),
            item,
            entindex: Number(entindex),
        };
    },
});
