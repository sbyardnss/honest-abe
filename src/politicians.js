import { getPacDonations, getPoliticians, getPacs, getLegislations, getPoliticianLegislation, getInterests, getCorporations, getCorporateDonations } from "./dataAccess.js";



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
                <h4>Pac donors</h4>
                <ul id="donationsToPolitiianList">
                    ${corporateDonors(p)}
                </ul>

            </div>
            
            ${BillsAndCorporateInfluence(p)}
            ${InfluencingCorporations(p)}
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




const BillsAndCorporateInfluence = (polObj) => {
    const legislations = getLegislations()
    const interests = getInterests()
    const polLegislation = getPoliticianLegislation()
    let html = `<div class="politician__bills">
    <h4>Sponsored Bills</h4>
    <ul>`
    const legislationForPolObj = polLegislation.filter(pl => pl.politicianId === polObj.id)
    for (const bill of legislationForPolObj) {
        let matchedLegislation = null;
        matchedLegislation = legislations.find(l => l.id === bill.legislationId)
        let matchedInterest = interests.find(i => i.id === matchedLegislation.interestId)
        html += `<li>${matchedLegislation.name} (${matchedInterest.about})</li>`
    }
    html += `</ul>`
    return html
}

const InfluencingCorporations = (polObj) => {
    const pacDonations = getPacDonations()
    const corporations = getCorporations()
    const corporateDonations = getCorporateDonations()
    const donationsToPolObj = pacDonations.filter(pd => pd.politicianId === polObj.id)
    let corpDonationsArr = []
    let corpOverlordsArr = []
    let html = `<div class="corporateOverlords">
    <h4>Corporate Influencers</h4>
    <ul>`
    for (const pd of donationsToPolObj) {
        for (const corpDonation of corporateDonations) {
            if (pd.pacId === corpDonation.pacId) {
                corpDonationsArr.push(corpDonation)
            }
        }
    }
    for (const donation of corpDonationsArr) {
        for (const corp of corporations) {
            if (donation.corporationId === corp.id) {
                delete corp.phone
                delete corp.address
                corpOverlordsArr.push(corp)
            }
        }
    }
    const overlordArrWithoutDuplicates = [...new Set(corpOverlordsArr)]
    html += `
    ${
        overlordArrWithoutDuplicates.map(ol => {
            return `<li>${ol.company}</li>`
        }).join("")
    }`
    html += "</ul>"
    return html
    
}