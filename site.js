//alert(localStorage.getItem('test') || 'Welcome')

const form = document.querySelector('form')

const allInputs = form.querySelectorAll('input')
allInputs.forEach(element => {
    if(element.type === 'submit') return

    element.classList.add('invalid')
    element.addEventListener('input', () => {
        //console.log(element.validity)

        const { valid } = element.validity
        element.classList.toggle('invalid', !valid)

        submitButton.disabled = !valid || !form.checkValidity()

    })
})

const submitButton = form.querySelector('#submit')
submitButton.disabled = true

form.addEventListener('submit', e => {
    const data = [ ...new FormData(form) ] 
    localStorage.setItem('test', JSON.stringify(data))
    e.preventDefault()
})

const formData = JSON.parse(localStorage.getItem('test')) || [ ]
formData.forEach(kvp => {
    const [ name, value ] = kvp
    const element = form.querySelector(`input[name=${name}]`)
    if (!element) return
    element.value = value
    element.dispatchEvent(new Event('input'))
})