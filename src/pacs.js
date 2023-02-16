import { getPacs, getCorporations, getPacDonations, getCorporateDonations } from "./dataAccess.js";



export const PACS = () => {
    const pacs = getPacs()
    let html = `
    <article class="pacs">
    <h3>Pacs</h3>
    ${
        pacs.map(pac => {
            return `<section class="pac">
            <header class="pac__name">
                <h1>${pac.registeredName}</h1>
            </header>
            <div class="pac__info">
                <div>${pac.address}</div>
            </div>
            <div class="pac__donors">
                <h2>Donors</h2>
                <ul id="donationsToPacsList">
                    ${pacDonors(pac)}
                </ul>
            </div>
        </section>`
        }).join("")
    }`
    return html
}


const pacDonors = (pacObj) => {
    const corporations = getCorporations()
    const corporateDonations = getCorporateDonations();
    let arrWithDuplicates = []
    let nameArrWithDuplicates = []
    let html = ""
    const donationsToSpecificPac = corporateDonations.filter(donationObj => {
        return donationObj.pacId === pacObj.id
    })
    for (const donation of donationsToSpecificPac) {
        let matchedCorporation = null;
        matchedCorporation = corporations.find(corp => corp.id === donation.corporationId)
        arrWithDuplicates.push(matchedCorporation)
        delete matchedCorporation.address
        delete matchedCorporation.phone
        nameArrWithDuplicates.push(matchedCorporation)
    }

    const arrWithoutDuplicates = [...new Set(arrWithDuplicates)]
    const nameArrWithoutDuplicates = [...new Set(nameArrWithDuplicates)]

    for (const company of nameArrWithoutDuplicates) {
        let totalDonationsFromCorp = 0
        let matchedCompany = company
        let donationsFromSpecificCorp = donationsToSpecificPac.filter(donation => donation.corporationId === company.id);
        html += `<li>${company.company}`
        for (const donation of donationsFromSpecificCorp) {
            totalDonationsFromCorp += donation.amount
        }
        
        
        html += ` - ${Intl.NumberFormat('en-US', {style: 'currency', currency: 'usd'}).format(totalDonationsFromCorp)}</li>`
        
    }
    return html
    

   
}


