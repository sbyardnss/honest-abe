import { getCorporations } from "./dataAccess.js";

export const Corporations = () => {
    const corporations = getCorporations()
    let html = `<article class="corporations">
    ${
        corporations.map(c => {
            return `<section class="corporation">
            <header class="corporation__name">
                <h1>${c.company}</h1>
            </header>
            <div class="corporation__info">
                <div>Address: ${c.address}</div>
            </div>
        </section>`
        }).join("")
    }
    </article>`
    return html
}