import { Corporations } from "./corporations.js";
import { getPoliticians } from "./dataAccess.js";
import { Politicians } from "./politicians.js"

export const HonestAbe = () => {
    let html = `
    <article id="entityLists">
        <div>
            <h3>Observed Politicians:</h3>
            ${Politicians()}
        </div>
        <div>
            <h3>Observed Corporations</h3>
            ${Corporations()}
        </div>
    
    
    </article>
    `
    return html
}