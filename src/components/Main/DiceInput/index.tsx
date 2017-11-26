import * as React from "react";

import { Adv, DiceState } from "../../../interfaces";

/* { console.log(e); onChange(Adv.Disadvantage)(diceState.nDice)} */
export const DiceInput = ({dice, diceState, onChange}): JSX.Element =>
    <div className="col-sm-1">
        <h3>{dice}</h3>
        <input
            type="text"
            defaultValue={diceState.nDice.toString()}
            onChange={(e) => onChange(diceState.adv)(parseInt(e.target.value))} />
        <br />
        <select className="form-control form-control-sm" data-width="fit" value={diceState.adv}
            onChange={(e) => onChange(parseInt(e.target.value))(diceState.nDice)}>
            <option value={Adv.Disadvantage}>Disadvantage</option>
            <option value={Adv.Flat}>Flat</option>
            <option value={Adv.Advantage}>Advantage</option>
        </select>
    </div>;