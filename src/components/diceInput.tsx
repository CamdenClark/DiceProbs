import * as React from "react";

import { Adv, DiceState } from "../interfaces";
/* { console.log(e); onChange(Adv.Disadvantage)(diceState.nDice)} */
export const DiceInput = ({dice, diceState, onChange}) =>
    <div className="col-sm-1">
        <h3>{dice}</h3>
        <input
            type="text"
            defaultValue={diceState.nDice.toString()}
            onChange={(e) => onChange(diceState.adv)(parseInt(e.target.value))} />
        <br />
        Disadv: <input
            type="radio"
            checked={diceState.adv === Adv.Disadvantage}
            onChange={(e) => onChange(Adv.Disadvantage)(diceState.nDice)} />
        <br />
        Flat: <input
        type="radio"
        checked={diceState.adv === Adv.Flat}
        onChange={(e) => onChange(Adv.Flat)(diceState.nDice)} />
        <br />
        Adv: <input
        type="radio"
        checked={diceState.adv === Adv.Advantage}
        onChange={(e) => onChange(Adv.Advantage)(diceState.nDice)} />
    </div>;