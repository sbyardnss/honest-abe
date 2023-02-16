import { Corporations } from "./corporations.js";
import { getPoliticians } from "./dataAccess.js";
import { Politicians } from "./politicians.js"
import { PACS } from "./pacs.js";

export const HonestAbe = () => {
    let html = `
    <article id="entityLists">
        <div id="fullPolColumn">
            <h3>Observed Politicians:</h3>
            ${Politicians()}
        </div>
        <div>
            <div>
                <h3>Observed Corporations</h3>
                ${Corporations()}
            </div>
            <div>
                ${PACS()}
            </div>
        </div>
    </article>
    `
    return html
}