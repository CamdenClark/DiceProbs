import { adjust, append, assocPath, concat, countBy, curry, identity, fromPairs, lift, map, mapObjIndexed, pipe, prop, range, reduce, repeat, sum, toPairs, unnest, xprod } from "ramda";

import { DiceAction } from "../actions";

enum Adv {
    Advantage = 1,
    Flat = 0,
    Disadvantage = -1
}

export interface Store {
    d4: number;
    d6: number;
    d8: number;
    d10: number;
    d12: number;
    d20: number;
    d100: number;
    modifier: number;
    advantage: Adv;
    data: {[index: number]: number};
}

const initialState: Store = {
    d4: 0,
    d6: 2,
    d8: 0,
    d10: 0,
    d12: 0,
    d20: 0,
    d100: 0,
    modifier: 0,
    advantage: Adv.Flat,
    data: {}
};

function _changeDice(state: Store = initialState, action: DiceAction): Store {
    console.log("_changeDice reducer called with state ", state, " and action ", action);
    switch (action.type) {
        case "DICE_CHANGE":
            return assocPath([action.dice], action.value, state);
        default:
            console.log("Original state.");
            return state;
    }
}

const getNumDice = (die: number, state: Store): number =>{
    const temp: number = prop("d" + die, state);
    return temp;
}

const convolve = (arr1: number[], arr2: number[]): number[] => {
    var acc = [];
    if (allZeros(arr1)) return arr2;
    if (allZeros(arr2)) return arr1;
    for(var i = 0; i < arr1.length + arr2.length; i++) {
        acc[i] = 0;
    }
    for(var i = 0; i < arr1.length; i++) {
        for(var j = 0; j < arr2.length; j++) {
            acc[i + j] = acc[i + j] + (arr1[i] * arr2[j]);
        }
    }
    return acc;
}

const allZeros = (arr: number[]): boolean => {
    for(var i = 0; i < arr.length; i++)
        if (arr[i] != 0) return false;
    return true;
}

const toDataObj = (arr: number[]) => {
    var acc = {}
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != 0)
            acc[i] = arr[i];
    }
    return acc;
}
function getProbs(state: Store) {
    function probability(faces: number, num: number, diceNr: number) {
        if (num < 0 || num > ((diceNr + 1) * faces))
            return 0;
        return probas[diceNr][num];
    }
    var maxVal = 0;
    const dice = [4, 6, 8, 10, 12, 20, 100];
    const finalProbs = []
    for (var iterDice = 0; iterDice < dice.length; iterDice++)
    {
        var probas = [];
        probas[0] = [];
        probas[0][0] = 0;    
        var baseProb = 1 / dice[iterDice];
        var numDice = getNumDice(dice[iterDice], state);
        if(numDice == 0) {
            baseProb = 0;
        }
        for (var i = 1; i <= dice[iterDice]; i++) {
            probas[0][i] = baseProb;
        }
        for (var i = 1; i < numDice; i++) {
            maxVal = (i + 1) * dice[iterDice] + 1;
            probas[i] = []
            for (var j = 0; j < maxVal; j++) {
                probas[i][j] = 0;
                for (var k = 0; k <= j; k++) {
                    probas[i][j] += probability(dice[iterDice], k, 0) * probability(dice[iterDice], j - k, i - 1);
                }
            }
        }
        finalProbs.push(probas[probas.length - 1]);
    }
    const veryFinal = reduce(convolve, finalProbs[0], finalProbs.slice(1));
    return toDataObj(veryFinal);
}

const incObj = (obj, mod: number, prevMod: number) => {
    var newObj = {};
    for (let key in obj) {
        newObj[parseInt(key) + mod - prevMod] = obj[key];
    }
    return newObj;
}

export function _rollDice(state: Store = initialState, action: DiceAction) {
    console.log("_rollDice reducer called with state ", state, " and action ", action);
    switch (action.type) {
        case "DICE_CHANGE":
            if (action.value > 100 || isNaN(action.value)) return state;
            state = assocPath([action.dice], action.value, state);
            const allRolls = getProbs(state);
            state = assocPath(["data"], allRolls, state);
            state = assocPath(["data"], incObj(state.data, state.modifier, 0), state);
            console.log(state);
            return assocPath(["data"], allRolls, state);
        case "MOD_CHANGE":
            console.log(isNaN(action.value));
            if (isNaN(action.value)) return state;
            state = assocPath(["data"], incObj(state.data, action.value, state.modifier), state);
            state = assocPath(["modifier"], action.value, state);
            console.log(state.data);
            return state;
        default:
            console.log("Original state.");
            const initRolls = getProbs(state);
            console.log(initRolls);
            return assocPath(["data"], initRolls, state);
    }
}