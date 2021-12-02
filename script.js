const select = (selector) => document.querySelector(selector)
const formEl = select('form')
const addressEl = select('input[name=destination]')
const subjectEl = select('input[name=subject]')
const textareaEl = select('textarea')

formEl.addEventListener('submit', (e) => {
    e.preventDefault()

    const destination = addressEl.value
    const renderAs = e.submitter.dataset.format
    const subject = subjectEl.value
    const body = `${textareaEl.value}
    
    sent from <a href='https://samuelfox1.github.io/emailer-client/'>emailer-client</a>
     `

    if (!renderAs || !destination || !subject || !body) return

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