import { Adv } from "../interfaces";

export type DiceAction = {
    type: "DICE_CHANGE";
    value: number;
    adv: Adv;
    dice: number;
} | {
    type: "MOD_CHANGE";
    value: number;
    adv: Adv;
    dice: number;
} | {
    type: "TN_CHANGE";
    value: number;
    adv: Adv;
    dice: number;
}

export const diceChange = (dice: number) => (adv: Adv) => (value: number): DiceAction => 
    ({
        type: "DICE_CHANGE",
        value,
        adv,
        dice
    });

export const modChange = (value: number): DiceAction =>
    ({
        type: "MOD_CHANGE",
        value,
        adv: Adv.Flat,
        dice: 0
    })

export const tnChange = (value: number): DiceAction =>
    ({
        type: "TN_CHANGE",
        value,
        adv: Adv.Flat,
        dice: 0
    })