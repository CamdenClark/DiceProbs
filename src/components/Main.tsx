import * as React from "react";

import { diceChange, modChange, tnChange } from "../actions";

import { Store } from "../interfaces";

import { connect } from "react-redux";

import { DiceInput } from "./diceInput";

import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme } from "victory";

import { filter, keys, pick, sum, values } from "ramda";

const prepareData = (data, tn: number) => {
    const arr = [];
    for (const key in data) {
        const color = (parseInt(key) >= tn) ? "green" : "red";
        arr.push({x: key, y: data[key], fill: color});
    }
    return arr;
};

const Main = ({onDiceChange, onModChange, onTNChange, ...props}) =>
    <div className="container">
        <div className="row">
        <DiceInput diceState={props.d4} dice="d4" onChange={onDiceChange("d4")} />
        <DiceInput diceState={props.d6} dice="d6" onChange={onDiceChange("d6")} />
        <DiceInput diceState={props.d8} dice="d8" onChange={onDiceChange("d8")} />
        <DiceInput diceState={props.d10} dice="d10" onChange={onDiceChange("d10")} />
        <DiceInput diceState={props.d12} dice="d12" onChange={onDiceChange("d12")} />
        <DiceInput diceState={props.d20} dice="d20" onChange={onDiceChange("d20")} />
        <DiceInput diceState={props.d100} dice="d100" onChange={onDiceChange("d100")} />
        </div>
        <br />
        <div className="row">
        <div className="col-sm-9">

        <VictoryChart theme={VictoryTheme.material} domainPadding={1} height={200}>
            <VictoryAxis tickCount={5} crossAxis={true} />
            <VictoryAxis tickCount={5} crossAxis={true} dependentAxis={true} />
            <VictoryBar data={prepareData(props.data, props.targetNumber)} animate={{duration: 300}}/>
        </VictoryChart>
        </div>
        <div className="col-sm-3">
            + <input type="text"
            defaultValue={props.modifier}
            onChange={(e) => onModChange(parseInt(e.target.value))} /><br />
        Target Number: <input type="text"
            defaultValue={props.targetNumber}
            onChange={(e) => onTNChange(parseInt(e.target.value)) } /> <br />
        Chance greater or equal to TN: {sum(values(pick(
            filter((num: string) => parseInt(num) >= props.targetNumber)
            (keys(props.data)), props.data))).toPrecision(5)}
                <br />
                Chance less than TN: {(1 - sum(values(pick(
                    filter((num: string) => parseInt(num) >= props.targetNumber)
                    (keys(props.data)), props.data)))).toPrecision(5)}
            </div>
            </div>
    </div>;

const mapStateToProps = (state) => {
    return {
        d4: state._rollDice.d4,
        d6: state._rollDice.d6,
        d8: state._rollDice.d8,
        d10: state._rollDice.d10,
        d12: state._rollDice.d12,
        d20: state._rollDice.d20,
        d100: state._rollDice.d100,
        modifier: state._rollDice.modifier,
        targetNumber: state._rollDice.targetNumber,
        data: state._rollDice.data
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDiceChange: (die) => (adv) => (value) => {
            dispatch(diceChange(die)(adv)(value));
        },
        onModChange: (value) => {
            dispatch(modChange(value));
        },
        onTNChange: (value) => {
            dispatch(tnChange(value));
        }
    };
};

const connectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);

export default connectedMain;