import * as React from "react";

export const About = (): JSX.Element =>
    <div>
        <p>Ever wonder what the probability of rolling above a 12 when you have Advantage, Bless,
        and a d8 Bardic Inspiration?</p>

        <p>This is a tool that will allow you to inspect the probability of complex rolls like this.
        It's meant for DMs and players to get a better understanding of their power and balancing
        players.</p>

        <p>The only thing that should be explained is that "Advantage" refers to the max of two rolls
        of the same type. For example, if you select "Adv" on a 1d20 roll, it will compute the traditional
        advantage from DnD 5e (roll twice, take the max of the rolls). However, advantage on 2d20 will compute
        the probability of taking the maximum of two independent 2d20 rolls.</p>

        <p>I hope someone gets some use out of this! <a href="https://github.com/CamdenClark/DiceProbs">
            The code lives here</a>, pull requests are welcome.
        </p>

        <h3>Changelog:</h3>
        <ul>
            <li>Changed target number to range, fixed some UI awkwardness.</li>
        </ul>
    </div>;