const axios = require('axios')
const helper = require('../helper/helper')
const { compileResponse, errorResponse } = require('../helper/response');

async function textToSearch() {
    return await axios.get("https://join.reckon.com/test2/textToSearch")
    .then(response => {
        if(response) return response.data.text;
    }).catch((error) => {
        console.log(error);
        return;
    })
}

 async function subTexts() {
    return await axios.get("https://join.reckon.com/test2/subTexts")
    .then(response => {
        if(response) return response.data.subTexts;
    }).catch((error) => {
        console.log(error);
        return;
    })
}

async function preparedSubmittedText(){
    let formattedtext = [];
    let resultset = [];
    const  texttosearch =  await textToSearch();
    const  subtexts = await subTexts();
    if (texttosearch.length < 1) return;
    if (subtexts.length < 1) return;
    subtexts.forEach(subtext => {
        let results = helper.compiledResult(texttosearch, subtext);
        results.forEach(c => {
            if (c.result.length < 1)
                c.result = "<No Output>"
        })
        resultset.push(results);;
      })
      formattedtext.push({
        candidate: "Akhil Biswas",
        text: texttosearch,
        results: resultset
    });
    console.log(JSON.stringify(formattedtext));
    return JSON.stringify(formattedtext);
}

async function submitResults() {
    const body = await preparedSubmittedText();
    console.log(body)
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': ''
    }
    return await axios.post("https://join.reckon.com/test2/submitResults", body, { headers: headers })
    .then(response => {
        console.log(response.data);
        return compileResponse(response.data);
    })
}
exports.submitResults = submitResults
