const select = (selector) => document.querySelector(selector)
const formEl = select('form')
const addressEl = select('input[name=myEmail]')
const textareaEl = select('textarea')

formEl.addEventListener('submit', (e) => {
    e.preventDefault()

    const action = e.submitter.dataset.format
    const emailAddress = addressEl.value
    const emailBody = textareaEl.value

    if (!action || !emailAddress || !emailBody) return

    const url = 'https://sf-emailer.herokuapp.com/api/email'

    fetch(url, {
        method: 'POST',
        body: '',
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

})