const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]')

    phoneInputs.forEach(item => {
        item.addEventListener('input', ()=> {
            item.value = item.value.replace(/\D/, '')
        })
    })

    const messages = {
        loading: 'Загрузка...',
        success: 'Спасибо!Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = messages.loading
        let result = await fetch(url, {
            method: 'POST',
            body: data,
        })

        return await result.text()
    }

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = ''
        })
    }

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault()

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            item.appendChild(statusMessage)

            const formData = new FormData(item)

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res)
                    statusMessage.textContent = messages.success
                })
                .catch(() => statusMessage.textContent = messages.failure)
                .finally(() => {
                    clearInputs()
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 5000)
                })

        })
    })


}

export default forms;