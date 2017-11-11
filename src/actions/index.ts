export type DiceAction = {
    type: "DICE_CHANGE";
    value: number;
    dice: number;
} | {
    type: "MOD_CHANGE";
    value: number;
    dice: number;
}

export const diceChange = (dice: number) => (value: number): DiceAction => 
    ({
        type: "DICE_CHANGE",
        value,
        dice
    });

export const modChange = (value: number): DiceAction =>
    ({
        type: "MOD_CHANGE",
        value,
        dice: 0
    })