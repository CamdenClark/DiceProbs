export enum Adv {
    Advantage = 1,
    Flat = 0,
    Disadvantage = -1
}

export interface Range {
    lower: number;
    upper: number;
}

export interface DiceState {
    nDice: number;
    adv: Adv;
}

export interface Store {
    d4: DiceState;
    d6: DiceState;
    d8: DiceState;
    d10: DiceState;
    d12: DiceState;
    d20: DiceState;
    d100: DiceState;
    modifier: number;
    data: {[index: number]: number};
    range: Range;
    sum: number;
}