const select = (selector) => document.querySelector(selector)
const formEl = select('form')
const addressEl = select('input[name=destination]')
const subjectEl = select('input[name=subject]')
const textareaEl = select('textarea')
const statusEl = select('#status')

const emailServerURL = 'https://sf-emailer.herokuapp.com/api/email'

const collectFormInputs = (e) => {
    const destination = addressEl.value
    const renderAs = e.submitter.dataset.format
    const subject = subjectEl.value
    const body = `${textareaEl.value}
    
    sent from <a href='https://samuelfox1.github.io/emailer-client/'>emailer-client</a>
     `

    return { destination, subject, renderAs, body }
}

const sendEmail = (requestBody) => {
    if (!requestBody) return

    fetch(emailServerURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setStatusMessage(data)
        })
        .catch(error => {
            console.error(error)
            setStatusMessage({ message: error.message })
        });
}

const setStatusMessage = (message) => statusEl.textContent = JSON.stringify(message)

const handleFormSubmit = (e) => {
    e.preventDefault()
    setStatusMessage('')

    const inputs = collectFormInputs(e)

    if (!inputs.renderAs || !inputs.destination || !inputs.subject) return setStatusMessage({ message: 'missing form inputs' })


    sendEmail(inputs)
}

formEl.addEventListener('submit', handleFormSubmit)