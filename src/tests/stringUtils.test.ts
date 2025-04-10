import test from "tape";
import { formatCampHeadings } from "../utils/stringUtils";

test("Function formatCampHeadings", (t) => {
    const heading = formatCampHeadings("word");
    const passResult = "------------------------- word -------------------------"

    t.deepEqual(heading, passResult);
    console.log(`expect: ${passResult}\nactual: ${heading}\n`)
    t.end();
});

test("Compare window times", (t) => {
    const campTime = Date.now() + 30 * 1000; // 30 sec * 1000 msec
    const now = Date.now();
    const interval: number = 10 * 1000;

    // setInterval(() => {
    // code goes here
    // } milliseconds goes here);
    // setTimeout(() => {
    // code goes here
    // } milliseconds goes here);

    let window: number = 1;
    setTimeout(() => {
        setInterval(() => {
            const heading: string = formatCampHeadings(`Window ${window}`);
            console.log(heading);
            window++;
        }, interval);
    }, campTime - now)
    console.log(`${campTime}\n${now}\n${campTime - now}`);
    t.end();
})
