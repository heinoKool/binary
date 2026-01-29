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

    // Help UI: button + decimal weights above toggles
    if (container) {
        ensureBitValueLabels()
        ensureHelpButton(container, executeBtn)
    }

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
            container && void container.offsetWidth
            container?.classList.add('access-denied')
        }
    }

    executeBtn?.addEventListener('click', checkCode)
})

function ensureBitValueLabels() {
    const switchUnits = document.querySelectorAll('.switch-unit')
    switchUnits.forEach(unit => {
        if (unit.querySelector('.bit-value')) return

        const input = unit.querySelector('input.switch-input')
        if (!input) return

        const label = unit.querySelector('label.switch-label')
        const value = input.getAttribute('value')
        if (!value) return

        const valueEl = document.createElement('span')
        valueEl.className = 'bit-value'
        valueEl.textContent = value

        if (label) {
            unit.insertBefore(valueEl, label)
        } else {
            unit.appendChild(valueEl)
        }
    })
}

function ensureHelpButton(container, executeBtn) {
    if (container.querySelector('.help-btn')) return

    const helpBtn = document.createElement('button')
    helpBtn.type = 'button'
    helpBtn.className = 'help-btn'
    helpBtn.setAttribute('aria-pressed', 'false')
    helpBtn.textContent = 'HILFE'

    function syncHelpState() {
        const isOn = container.classList.contains('show-help')
        helpBtn.setAttribute('aria-pressed', String(isOn))
        helpBtn.textContent = isOn ? 'HILFE AUS' : 'HILFE'
    }

    helpBtn.addEventListener('click', () => {
        container.classList.toggle('show-help')
        syncHelpState()
    })

    // Always place in the top-right corner of the viewport
    document.body.appendChild(helpBtn)

    syncHelpState()
}
