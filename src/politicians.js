import { getPoliticians } from "./dataAccess.js";



export const Politicians = () => {
    const politicians = getPoliticians()

    let html = `<article class="politicians">
    ${
        politicians.map(p => {
            return `<section class="politician">
            <header class="politician__name">
                <h1>${p.name.first} ${p.name.last}</h1>
            </header>
            <div class="politician__info">
                <div>Age: ${p.age}</div>
                <div>Represents: ${p.district}</div>
            </div>
        </section>
            `
        }).join("")
    }
    </article>`

    return html
}