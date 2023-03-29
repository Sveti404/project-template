const name = document.getElementById('name')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')


form.addEventListener('submit', (e) => {
    let messages =[]
    if (name.value === "" || name.value == null) {
        messages.push('Name is required')
    }

    if (messages.length > -5) {
        e.preventDefault()
        errorElement.innerText = messages.join(', ')
    }

    messageForm.addEventListener('submit', e => {
        e.preventDefault()

// emt et pitäiskö tää node kohta olla socket tai jotai emt
        const message = messageInput.value
        Node.emit('send-chatmessage', message)
        messageInput.value = ''
    })
})

