import * as React from "react";

import { Adv, DiceState } from "../interfaces";

import { AdvInput } from "./advInput";

/* { console.log(e); onChange(Adv.Disadvantage)(diceState.nDice)} */
export const DiceInput = ({dice, diceState, onChange}) =>
    <div className="col-sm-1">
        <h3>{dice}</h3>
        <input
            type="text"
            defaultValue={diceState.nDice.toString()}
            onChange={(e) => onChange(diceState.adv)(parseInt(e.target.value))} />
        <br />
        Dis: <AdvInput diceState={diceState} onChange={onChange} adv={Adv.Disadvantage} />
        <br />
        Flat: <AdvInput diceState={diceState} onChange={onChange} adv={Adv.Flat} />
        <br />
        Adv: <AdvInput diceState={diceState} onChange={onChange} adv={Adv.Advantage} />
    </div>;