import { fetchCorporateDonations, fetchCorporateInterests, fetchCorporations, fetchInterests, fetchLegislations, fetchPacDonations, fetchPacs, fetchPoliticianLegislations, fetchPoliticians } from "./dataAccess.js"
import { HonestAbe } from "./honestAbe.js"



const mainContainer = document.querySelector("#container")

export const Render = () => {
    fetchPoliticians()
    .then(() => fetchCorporateDonations())
    .then(() => fetchCorporateInterests())
    .then(() => fetchCorporations())
    .then(() => fetchInterests())
    .then(() => fetchLegislations())
    .then(() => fetchLegislations())
    .then(() => fetchPacDonations())
    .then(() => fetchPacs())
    .then(() => fetchPoliticianLegislations())
    .then(
        () => {
            mainContainer.innerHTML = HonestAbe()
        }
    )
}

Render()

document.addEventListener("stateChanged", event => {
    console.log("Refreshed...")
    Render()
})