document.addEventListener('DOMContentLoaded', () => {
    // Highlight current page in nav
    const currentPath = window.location.pathname.replace(/\/+$/, '/')
    const navLinks = document.querySelectorAll('.site-nav a')
    navLinks.forEach(link => {
        const href = link.getAttribute('href')
        if (!href) return

        let url
        try {
            url = new URL(href, window.location.href)
        } catch {
            return
        }

        const linkPath = url.pathname.replace(/\/+$/, '/')
        if (linkPath === currentPath) {
            link.setAttribute('aria-current', 'page')
        } else {
            link.removeAttribute('aria-current')
        }
    })

    // Game logic
    const config = document.getElementById('game-config')
    if (!config) return

    const targetValue = parseInt(config.getAttribute('data-target') || '', 10)
    const secretChar = config.getAttribute('data-letter') || '?' 

    const displayNumber = document.getElementById('display-number')
    const secretLetterElement = document.getElementById('secret-letter')
    const switches = document.querySelectorAll('.switch-input')
    const container = document.getElementById('main-container')
    const executeBtn = document.getElementById('execute-btn')

    if (!Number.isFinite(targetValue)) {
        if (displayNumber) displayNumber.innerText = '—'
        return
    }

    if (displayNumber) displayNumber.innerText = String(targetValue)
    if (secretLetterElement) secretLetterElement.innerText = secretChar

    function checkCode() {
        let currentSum = 0
        switches.forEach(sw => {
            if (sw.checked) currentSum += parseInt(sw.value, 10)
        })

        if (currentSum === targetValue) {
            container?.classList.remove('access-denied')
            container?.classList.add('access-granted')
            switches.forEach(sw => { sw.disabled = true })
            if (executeBtn) {
                executeBtn.disabled = true
                executeBtn.innerText = 'SYSTEM OPEN'
            }
        } else {
            container?.classList.remove('access-denied')
            // Force reflow to restart animation
            // eslint-disable-next-line no-unused-expressions
            container && void container.offsetWidth
            container?.classList.add('access-denied')
        }
    }

    executeBtn?.addEventListener('click', checkCode)
})
