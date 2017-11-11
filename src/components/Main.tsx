import * as React from "react";

import { diceChange, modChange } from "../actions";

import { Store } from "../reducers";

import { connect } from "react-redux";

const Main = ({onDiceChange, onModChange, ...props}) => 
    <div>
        <input type="text" defaultValue={props.d4} onChange={(e) => onDiceChange("d4")(parseInt(e.target.value))}></input>
        <input type="text" defaultValue={props.d6} onChange={(e) => onDiceChange("d6")(parseInt(e.target.value))}></input>
        <input type="text" defaultValue={props.d8} onChange={(e) => onDiceChange("d8")(parseInt(e.target.value))}></input>
        <input type="text" defaultValue={props.d10} onChange={(e) => onDiceChange("d10")(parseInt(e.target.value))}></input>
        <input type="text" defaultValue={props.d12} onChange={(e) => onDiceChange("d12")(parseInt(e.target.value))}></input>
        <input type="text" defaultValue={props.d20} onChange={(e) => onDiceChange("d20")(parseInt(e.target.value))}></input>
        <input type="text" defaultValue={props.d100} onChange={(e) => onDiceChange("d100")(parseInt(e.target.value))}></input>
        <br />
        <br />
        <input type="text" defaultValue={props.modifier} onChange={(e) => onModChange(parseInt(e.target.value))}></input>
        <h2>We're reloading baby!</h2>
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
        data: state._rollDice.data
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDiceChange: (die) => (value) => {
            dispatch(diceChange(die)(value));
        },
        onModChange: (value) => {
            dispatch(modChange(value));
        }
    };
};

const connectedMain = connect(mapStateToProps, mapDispatchToProps)(Main);

export default connectedMain;

