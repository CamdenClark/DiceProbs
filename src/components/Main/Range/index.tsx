import { filter, keys, pick, sum, values } from "ramda";
import * as React from "react";

import { Range } from "../../../interfaces";

const getRangeChange = (range: Range, data) => {
    return sum(
            values(pick(
                filter((num: string) => parseInt(num) >= range.lower &&
                    parseInt(num) <= range.upper)(keys(data)),
                data
            ))
         );
};

export const RangeComponent = ({onRangeChange, range, data}): JSX.Element =>
    <div>
        Lower Target: <input type="text"
            defaultValue={range.lower}
            onChange={(e) => onRangeChange(parseInt(e.target.value))(range.upper) } /> <br />
        Upper Target: <input type="text"
            defaultValue={range.upper}
            onChange={(e) => onRangeChange(range.lower)(parseInt(e.target.value)) } />
        Probability in range: {getRangeChange(range, data).toPrecision(5)} <br />
        Probability out of range: {(1 - getRangeChange(range, data)).toPrecision(5)}
    </div>;