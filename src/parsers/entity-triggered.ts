import { type Entity, entityRe, parseEntity } from '../entities';
import { concatPattern } from '../helpers';
import { type IBaseEvent, defineParser } from './parser';

export type EntityTriggeredEventPayload = {
    entity: Entity;

    kind:
        | 'game_commencing'
        | 'match_start'
        | 'round_start'
        | 'round_end'
        | 'restart_round_(1_second)'
        | 'restart_round_(3_seconds)'
        | 'begin_bomb_defuse_with_kit'
        | 'begin_bomb_defuse_without_kit'
        | 'bomb_begin_plant'
        | 'defused_the_bomb'
        | 'planted_the_bomb'
        | 'got_the_bomb'
        | 'dropped_the_bomb'
        | 'clantag';

    value?: string;
    bombsite?: string;
};

export type EntityTriggeredEvent = IBaseEvent<'entity_triggered', EntityTriggeredEventPayload>;

export const entityTriggeredParser = defineParser<EntityTriggeredEvent>({
    type: 'entity_triggered',

    patterns: [
        concatPattern`^(?<entity>${entityRe}) triggered "(?<kind>[^"]+)"(?: \\(value "(?<value>[^"]+)"\\))?(?: at bombsite (?<bombsite>[^"]+))?$`,
        concatPattern`^(?<entity>${entityRe}) triggered "(?<kind>[^"]+)" on "(?<value>[^"]+)"(?: at bombsite (?<bombsite>[^"]+))?$`,
    ],

    parse({ entity, kind, value, bombsite }) {
        return {
            entity: parseEntity(entity),
            kind: kind.toLowerCase() as EntityTriggeredEventPayload['kind'],
            value,
            bombsite,
        };
    },
});
