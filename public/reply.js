let answers = document.location.search

//translates document.location.search into JS Object
function parseQuery(string) {
  let queryObj = {}
  //remove question mark
  let queryString = string.slice(1)

  let keyValArray = queryString.split('&')

  keyValArray.forEach((pair) => {
    let keyVal = pair.split('=')

    queryObj[keyVal[0]] = keyVal[1]
  })

  return queryObj
}

let queryAnswer = parseQuery(answers)

fetch('/answers')
  .then(res => {
    return res.json()
  })
  .then((answerObj) => {
    //Set success message in display
    document.getElementById('response').textContent = "Alright then. Off you go."

    //check query params against values stored in example.json
    for (let key in answerObj) {
      if(answerObj[key] !== decodeURI(queryAnswer[key])) {
        //if they don't match overwrite success with failure message
        document.getElementById('response').textContent = "Into the chasm of DOOOOOoooooommmmmmm...."
        break
      }
    }
  })
