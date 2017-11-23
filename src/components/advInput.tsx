import * as React from "react";

import { Adv, DiceState } from "../interfaces";

export const AdvInput = ({diceState, adv, onChange}) =>
        <input
            type="radio"
            checked={diceState.adv === adv}
            onChange={(e) => onChange(adv)(diceState.nDice)}
            />;