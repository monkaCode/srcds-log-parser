import { type Entity, entityRe, parseEntity, parseVector, vectorRe } from '../entities';
import { concatPattern } from '../helpers';
import { type IBaseEvent, defineParser } from './parser';

export type ThrewEventPayload = {
    player: Entity;
    item: string;
    entindex?: number;
};

export type ThrewEvent = IBaseEvent<'threw', ThrewEventPayload>;

// "PlayerName<93><STEAM_1:0:12345><CT>" threw molotov [-2035 1521 35]
// "s1mple<30><STEAM_1:1:36968273><TERRORIST>" threw flashbang [672 -603 -194] flashbang entindex 457)
export const threwParser = defineParser<ThrewEvent>({
    type: 'threw',

    patterns: [concatPattern`^(?<player>${entityRe}) threw (?<item>.+) \\[(?<playerPosition>${vectorRe})\\].*?entindex (?<entindex>\\d+)\\)?$`],

    parse({
        player,
        playerPosition,
        item,
        entindex,
    }) {
        return {
            player: {
                ...parseEntity(player),

                position: parseVector(playerPosition),
            },
            item,
            entindex: entindex == null ? undefined : Number(entindex),
        };
    },
});
