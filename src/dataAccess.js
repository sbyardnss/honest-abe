const applicationState = {
    politicians: [],
    interests: [],
    pacs: [],
    corporations: [],
    legislations: [],
    politicianLegislations: [],
    pacDonations: [],
    corporateInterests: [],
    corporateDonations: []
}

const API = "http://localhost:8088"

export const fetchPoliticians = () => {
    return fetch(`${API}/politicians`)
    .then(response => response.json())
    .then((data) => {
        applicationState.politicians = data
    })
}

export const fetchInterests = () => {
    return fetch(`${API}/interests`)
    .then(response => response.json())
    .then((data) => applicationState.interests = data)
}

export const fetchPacs = () => {
    return fetch(`${API}/pacs`)
    .then(response => response.json())
    .then((data) => applicationState.pacs = data)
}

export const fetchCorporations = () => {
    return fetch(`${API}/corporations`)
    .then(response => response.json())
    .then((data) => applicationState.corporations = data)
}

export const fetchLegislations = () => {
    return fetch(`${API}/legislations`)
    .then(response => response.json())
    .then((data) => applicationState.legislations = data)
}

export const fetchPoliticianLegislations = () => {
    return fetch(`${API}/politicianlegislations`)
    .then(response => response.json())
    .then((data) => applicationState.politicianLegislations = data)
}

export const fetchPacDonations = () => {
    return fetch(`${API}/pacdonations`)
    .then(response => response.json())
    .then((data) => applicationState.pacDonations = data)
}

export const fetchCorporateInterests = () => {
    return fetch(`${API}/corporateinterests`)
    .then(response => response.json())
    .then((data) => applicationState.corporateInterests = data)
}

export const fetchCorporateDonations = () => {
    return fetch(`${API}/corporatedonations`)
    .then(response => response.json())
    .then((data) => applicationState.corporateDonations = data)
}

export const getPoliticians = () => {
    return applicationState.politicians.map(p => ({...p}))
}

export const getInterests = () => {
    return applicationState.interests.map(i => ({...i}))
}

export const getPacs = () => {
    return applicationState.pacs.map(pac => ({...pac}))
}

export const getCorporations = () => {
    return applicationState.corporations.map(c => ({...c}))
}

export const getLegislations = () => {
    return applicationState.legislations.map(l => ({...l}))
}

export const getPoliticianLegislation = () => {
    return applicationState.politicianLegislations.map(pl => ({...pl}))
}

export const getPacDonations = () => {
    return applicationState.pacDonations.map(pd => ({...pd}))
}

export const getCorporateInterests = () => {
    return applicationState.corporateInterests.map(ci => ({...ci}))
}

export const getCorporateDonations = () => {
    return applicationState.corporateDonations.map(cd => ({...cd}))
}

