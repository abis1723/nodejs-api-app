
const axios = require('axios');
const e = require('express');

async function getRanges() {
    return await axios.get("https://join.reckon.com/test1/rangeInfo")
    .then(response => {
        if(response) return response.data;
    }).catch((error) => {
        console;e.log(error);
        return;
    })
}

 async function getDivisor() {
    return await axios.get("https://join.reckon.com/test1/divisorInfo")
    .then(response => {
        if(response) return response.data;
    }).catch((error) => {
        console;e.log(error);
        return;
    })
}

async function textToSearch() {
    return await axios.get("https://join.reckon.com/test2/textToSearch")
    .then(response => {
        if(response) return response.data.text;
    }).catch((error) => {
        console;e.log(error);
        return;
    })
}

 async function subTexts() {
    return await axios.get("https://join.reckon.com/test2/subTexts")
    .then(response => {
        if(response) return response.data.subTexts;
    }).catch((error) => {
        console;e.log(error);
        return;
    })
}

async function findDivisible(){
    let result = [];
    const ranges = await getRanges();
    const divisors = await getDivisor();
    if (ranges.length < 1) return;
    if (divisors.length < 1) return;
    let lowrange = parseInt(ranges.lower);
    let upperrange = parseInt(ranges.upper)
    for(lowrange; lowrange < upperrange; lowrange++){
         const divisoroutput =  divisors.outputDetails;
         let aa = '';
         divisoroutput.forEach(divisor => {
            if(((lowrange + 1) % parseInt(divisor.divisor)) == 0) {
                aa +=  divisor.output;
            }
         })
        console.log(`${lowrange + 1}: ${aa}`);
    }
return result;
}

exports.findDivisible = findDivisible
