import { type IBaseEvent, defineParser } from './parser';
import { concatPattern } from '../helpers';

export type GameOverEventPayload = {
    mode: string;
    matchId: string;
    map: string;
    scoreCt: number;
    scoreT: number;
    durationMin: number;
};

export type GameOverEvent = IBaseEvent<'game_over', GameOverEventPayload>;

export const gameOverParser = defineParser<GameOverEvent>({
    type: 'game_over',

    patterns: [
        concatPattern`^Game Over: (?<mode>\\w+) (?<matchId>\\d+) (?<map>\\w+) score (?<scoreCt>\\d+):(?<scoreT>\\d+) after (?<durationMin>\\d+) min$`,
    ],

    parse({ mode, matchId, map, scoreCt, scoreT, durationMin }) {
        return {
            mode,
            matchId,
            map,
            scoreCt: Number(scoreCt),
            scoreT: Number(scoreT),
            durationMin: Number(durationMin),
        };
    },
});
