import { getPacDonations, getPoliticians, getPacs } from "./dataAccess.js";



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
            <div class="politician__donors">
                <h4>Donors</h4>
                <ul id="donationsToPolitiianList">
                    ${corporateDonors(p)}
                </ul>
            </div>
        </section>
            `
        }).join("")
    }
    </article>`

    return html
}


const corporateDonors = (politicianObj) => {
    const pacs = getPacs()
    const pacDonations = getPacDonations();
    let arrWithDuplicates = []
    let nameArrWithDuplicates = []
    let html = ""
    const donationsToSpecificPolitician = pacDonations.filter(donationObj => {
        return donationObj.politicianId === politicianObj.id
    })
    for (const donation of donationsToSpecificPolitician) {
        let matchedPac = null;
        matchedPac = pacs.find(pac => pac.id === donation.pacId)
        arrWithDuplicates.push(matchedPac)
        delete matchedPac.address
        delete matchedPac.phone
        nameArrWithDuplicates.push(matchedPac)
    }

    const arrWithoutDuplicates = [...new Set(arrWithDuplicates)]
    const nameArrWithoutDuplicates = [...new Set(nameArrWithDuplicates)]

    for (const pac of nameArrWithoutDuplicates) {
        let totalDonationsFromPac = 0
        let matchedPac = pac
        let donationsFromSpecificPac = donationsToSpecificPolitician.filter(donation => donation.pacId === pac.id);
        html += `<li>${pac.registeredName}`
        for (const donation of donationsFromSpecificPac) {
            totalDonationsFromPac += donation.amount
        }
        
        
        html += ` - ${Intl.NumberFormat('en-US', {style: 'currency', currency: 'usd'}).format(totalDonationsFromPac)}</li>`
        
    }
    return html
    

   
}