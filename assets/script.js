const select = (selector) => document.querySelector(selector);
const addressEl = select('input[name=destination]');
const subjectEl = select('input[name=subject]');
const textareaEl = select('textarea');
const statusEl = select('#status');
const formEl = select('form');

const emailServerURL = 'https://sf-emailer.herokuapp.com/api/email';

let interval;


const collectFormInputs = (e) => {
    const destination = addressEl.value;
    const renderAs = e.target.dataset.format;
    const subject = subjectEl.value;
    const body = `${textareaEl.value}
    
    sent from <a href='https://samuelfox1.github.io/emailer-client/'>emailer-client</a>
     `

    return { destination, subject, renderAs, body };
};

const sendEmail = (requestBody) => {
    if (!requestBody) return;
    toggleWaitingMessage(true, 'sending')
    fetch(emailServerURL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        }
    )
        .then(response => response.json())
        .then(data => {
            console.log(data);
            toggleWaitingMessage(false)
            setStatusMessage(data);
        })
        .catch(error => {
            console.error(error);
            toggleWaitingMessage(false)
            setStatusMessage({ message: error.message });
        });
}

const setStatusMessage = (message) => statusEl.textContent = JSON.stringify(message);

// get text, trim white space and remove unwanted characters
const getStatusMessage = () => statusEl.textContent
    .trim()
    .split('\\').join('')
    .split('"').join('')


const toggleWaitingMessage = (display, message) => {
    if (!display) return clearInterval(interval)

    setStatusMessage(message)
    interval = setInterval(() => {
        if (!interval) return
        const message = getStatusMessage()
        setStatusMessage(`${message}.`)
    }, 1000)

};

const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!e.target.dataset?.format) return

    const inputs = collectFormInputs(e);

    if (!inputs.renderAs || !inputs.destination || !inputs.subject) {
        return setStatusMessage({ message: 'missing form inputs' });
    };

    sendEmail(inputs);
};

formEl.addEventListener('click', handleFormSubmit);