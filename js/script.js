const textarea = document.querySelector('textarea')
let dic = []

textarea.addEventListener('keyup', (e) => {
    "use strict"

    const proposalWords = document.querySelector('#proposalWords')
    let currentWords = []

    if(e.key === 'Backspace' || e.key === ' ' || e.key === 'Spacebar') currentWords = ['']
    if(e.key === ' ' || e.key === 'Spacebar'){
        while (proposalWords.firstChild) {
            proposalWords.removeChild(proposalWords.lastChild);
        }
        return
    }

    const value = textarea.value
    const splitValue = value.split(' ')

    if(value !== ''){
        for (let x = 0; x < splitValue.length; x++) {
            // console.log(splitValue[splitValue.length - 1])
            for (let i = 0; i < dic[0].length; i++) {
                if(dic[0][i].startsWith(splitValue[splitValue.length - 1])){
                    currentWords.push(dic[0][i])
                }else{
                    while (proposalWords.firstChild) {
                        proposalWords.removeChild(proposalWords.lastChild);
                    }
                }
            }
        }
    }

    let unique = [...new Set(currentWords)];
    let numberElementDisplayed

    // for (let i = 0; i < unique.length; i++) {
    //     if(unique[i].length < 4){
    //         console.log(unique[i])
    //     }
    // }

    currentWords.length < 3 ? numberElementDisplayed = currentWords.length : numberElementDisplayed = 3

    for (let i = 0; i < numberElementDisplayed; i++) {
        const element = document.createElement('div')
        element.classList.add('element-proposal')
        const label = document.createElement('label-proposal')
        label.classList.add('label-proposal')
        label.innerHTML = unique[unique.length - (i+1)]
        element.appendChild(label)
        element.onclick = function (){appendElement(this)}

        if(unique.length !== 0 && unique[unique.length - (i+1)] !== " " && unique[unique.length - (i+1)] !== ""){
            if(unique.length === 1){
                label.innerHTML = unique[unique.length - 1]
                proposalWords.appendChild(element)
                break
            }
            proposalWords.appendChild(element)
        }
    }
})

function appendElement(elementClicked){
    const text = elementClicked.innerText
    const value = textarea.value
    const splitValue = value.split(' ')
    splitValue[splitValue.length - 1] = text
    textarea.value = splitValue.join(' ')
    textarea.focus()
}

window.onload = function () {
    fetch('./node_modules/an-array-of-french-words/index.json')
        .then(response => response.json())
        .then(data => dic.push(data))
        .catch(error => console.log(error));
}