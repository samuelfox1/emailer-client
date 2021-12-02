const select = (selector) => document.querySelector(selector)
const formEl = select('form')
const addressEl = select('input[name=myEmail]')
const textareaEl = select('textarea')

formEl.addEventListener('submit', (e) => {
    e.preventDefault()

    const destination = addressEl.value
    const renderAs = e.submitter.dataset.format
    const subject = 'hello from https://samuelfox1.github.io/emailer-client/'
    const body = `${textareaEl.value} \n\n ${subject}`

    if (!renderAs || !destination || !body) return

    const url = 'https://sf-emailer.herokuapp.com/api/email'

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination, subject, renderAs, body }),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

})