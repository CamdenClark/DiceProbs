import { adjust, append, assocPath, concat,
    countBy, curry, fromPairs, identity, lift,
    map, mapObjIndexed, pipe, prop, range,
    reduce, repeat, sum, toPairs, unnest, xprod } from "ramda";

import { DiceAction } from "../actions";

import { Adv, DiceState, Store } from "../interfaces";

const defaultDice: DiceState = {
    nDice: 0,
    adv: Adv.Flat
};

const initialState: Store = {
    d4: defaultDice,
    d6: {nDice: 2, adv: Adv.Flat},
    d8: defaultDice,
    d10: defaultDice,
    d12: defaultDice,
    d20: defaultDice,
    d100: defaultDice,
    modifier: 0,
    data: {},
    sum: 0,
    targetNumber: 8
};

function handleAdv(arr: number[], adv: Adv): number[] {
    if (adv === Adv.Flat) {
        return arr;
    }
    const advArr = [];
    if (adv === Adv.Advantage) {
        advArr.push(arr[0] * arr[0]);
        let cumSum = arr[0];
        for (let i = 1; i < arr.length; i++) {
            const nbefore = cumSum * cumSum;
            cumSum = arr[i] + cumSum;
            const ninclusive = cumSum * cumSum;
            advArr.push(ninclusive - nbefore);
        }
    } else if (adv === Adv.Disadvantage) {
        const len = arr.length;
        advArr.push(arr[len - 1] * arr[len - 1]);
        let cumSum = arr[len - 1];
        for (let j = len - 2; j >= 0; j--) {
            const nafter = cumSum * cumSum;
            cumSum = arr[j] + cumSum;
            const ninclusive = cumSum * cumSum;
            advArr.unshift(ninclusive - nafter);
        }
    }
    return advArr;
}

const getNumDice = (die: number, state: Store): number =>
    state["d" + die].nDice;

const convolve = (arr1: number[], arr2: number[]): number[] => {
    const acc = [];
    if (allZeros(arr1)) {
        return arr2;
    }
    if (allZeros(arr2)) {
        return arr1;
    }
    for (let i = 0; i < arr1.length + arr2.length; i++) {
        acc[i] = 0;
    }
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            acc[i + j] = acc[i + j] + (arr1[i] * arr2[j]);
        }
    }
    return acc;
};

const allZeros = (arr: number[]): boolean => {
    for (const num of arr) {
        if (num !== 0) {
            return false;
        }
    }
    return true;
};

const toDataObj = (arr: number[]) => {
    const acc = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== 0) {
            acc[i] = arr[i];
        }
    }
    return acc;
};

function getProbs(state: Store) {
    let maxVal = 0;
    const dice = [4, 6, 8, 10, 12, 20, 100];
    const finalProbs = [];
    for (const die of dice) {
        const probas = [];
        function probability(faces: number, num: number, diceNr: number) {
            if (num < 0 || num > ((diceNr + 1) * faces)) {
                return 0;
            }
            return probas[diceNr][num];
        }
        probas[0] = [];
        probas[0][0] = 0;
        let baseProb = 1 / die;
        const numDice = getNumDice(die, state);
        if (numDice === 0) {
            baseProb = 0;
        }
        for (let i = 1; i <= die; i++) {
            probas[0][i] = baseProb;
        }
        for (let i = 1; i < numDice; i++) {
            maxVal = (i + 1) * die + 1;
            probas[i] = [];
            for (let j = 0; j < maxVal; j++) {
                probas[i][j] = 0;
                for (let k = 0; k <= j; k++) {
                    probas[i][j] += probability(die, k, 0) * probability(die, j - k, i - 1);
                }
            }
        }
        finalProbs.push(handleAdv(probas[probas.length - 1], state["d" + die].adv));
    }
    const veryFinal = reduce(convolve, finalProbs[0], finalProbs.slice(1));
    return toDataObj(veryFinal);
}

const incObj = (obj, mod: number, prevMod: number) => {
    const newObj = {};
    for (const key in obj) {
        newObj[parseInt(key) + mod - prevMod] = obj[key];
    }
    return newObj;
};

export function _rollDice(state: Store = initialState, action: DiceAction) {
    if (isNaN(action.value)) {
        return state;
    }
    switch (action.type) {
        case "DICE_CHANGE":
            if (action.value > 100) {
                return state;
            }
            state = assocPath([action.dice, "nDice"], action.value, state);
            state = assocPath([action.dice, "adv"], action.adv, state);
            state = assocPath(["data"], getProbs(state), state);
            state = assocPath(["data"], incObj(state.data, state.modifier, 0), state);
            return state;
        case "MOD_CHANGE":
            const changeData = assocPath(["data"], incObj(state.data, action.value, state.modifier), state);
            return assocPath(["modifier"], action.value, changeData);
        case "TN_CHANGE":
            return assocPath(["targetNumber"], action.value, state);
        default:
            const initRolls = getProbs(state);
            return assocPath(["data"], initRolls, state);
    }
}