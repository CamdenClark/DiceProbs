import * as React from "react";
import { connect } from "react-redux";

import { diceChange, modChange, rangeChange } from "../../actions";
import { Store } from "../../interfaces";

import { Link, Route } from "react-router-dom";

import { DiceInput } from "./DiceInput";
import { RangeComponent } from "./Range";

import { filter, keys, map, pick, sum, values } from "ramda";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, } from "victory";

const prepareData = (data, lower: number, upper: number) => {
    const arr = [];
    for (const key in data) {
        const color = (parseInt(key) >= lower) && (parseInt(key) <= upper) ? "green" : "red";
        arr.push({x: key, y: data[key], fill: color});
    }
    return arr;
};

const allDice = ["d4", "d6", "d8", "d10", "d12", "d20", "d100"];

const Main = ({onDiceChange, onModChange, onRangeChange, ...props}) =>
    <div className="container">
        <div className="row">
        {
            map((die) => <DiceInput diceState={props[die]} key={die}
                dice={die} onChange={onDiceChange(die)} />, allDice)
        }
        </div>
        <br />
        <div className="row">
            <div className="col-sm-9">
                <VictoryChart theme={VictoryTheme.material} domainPadding={1} height={200}>
                    <VictoryAxis tickCount={5} crossAxis={true} />
                    <VictoryAxis tickCount={5} crossAxis={true} dependentAxis={true} />
                    <VictoryBar data={prepareData(props.data, props.range.lower, props.range.upper)}
                        animate={{duration: 300}} />
                </VictoryChart>
            </div>
            <div className="col-sm-3">
                + <input type="text"
                    defaultValue={props.modifier}
                    onChange={(e) => onModChange(parseInt(e.target.value))} /><br />
                <RangeComponent onRangeChange={onRangeChange} range={props.range} data={props.data} />
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
        range: state._rollDice.range,
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
        onRangeChange: (lower) => (upper) => {
            dispatch(rangeChange(lower)(upper));
        }
    };
};

const connectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);

export default connectedMain;