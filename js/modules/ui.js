import { getWeakMessage, getMediumMessage, getStrongMessage } from './analyzer.js';

export const updateToggleIcon = (button, isVisible) => {
    const svg = button.querySelector('svg');
    if (isVisible) {
        svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle><line x1="1" y1="1" x2="23" y2="23"></line>';
    } else {
        svg.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>';
    }
};

export const updateProgressBar = (progressBarFill, progressText, analysis) => {
    progressBarFill.classList.remove('weak', 'medium', 'strong');
    progressText.classList.remove('weak', 'medium', 'strong');

    if (analysis.strength === 'empty') {
        progressBarFill.style.width = '0%';
        progressText.textContent = 'Insira uma senha';
    } else if (analysis.strength === 'weak') {
        progressBarFill.classList.add('weak');
        progressText.classList.add('weak');
        progressText.textContent = 'Senha Fraca';
        progressBarFill.style.width = '33.33%';
    } else if (analysis.strength === 'medium') {
        progressBarFill.classList.add('medium');
        progressText.classList.add('medium');
        progressText.textContent = 'Senha Média';
        progressBarFill.style.width = '66.66%';
    } else if (analysis.strength === 'strong') {
        progressBarFill.classList.add('strong');
        progressText.classList.add('strong');
        progressText.textContent = 'Senha Forte';
        progressBarFill.style.width = '100%';
    }
};

export const updateValidationCard = (card, statusElement, isValid, isActive) => {
    card.classList.remove('valid', 'invalid', 'active');
    statusElement.classList.remove('valid', 'invalid');

    if (!isActive) {
        statusElement.textContent = '—';
    } else if (isValid) {
        card.classList.add('valid');
        statusElement.classList.add('valid');
        statusElement.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        `;
    } else {
        card.classList.add('invalid');
        statusElement.classList.add('invalid');
        statusElement.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        `;
    }
};

export const updateValidationCards = (cards, elements, analysis) => {
    const [lengthCheck, letterCheck, numberCheck, symbolCheck] = elements;

    updateValidationCard(
        cards[0],
        lengthCheck,
        analysis.length >= 6,
        analysis.length > 0
    );

    updateValidationCard(
        cards[1],
        letterCheck,
        analysis.hasUppercase || analysis.hasLowercase,
        analysis.password.length > 0
    );

    updateValidationCard(
        cards[2],
        numberCheck,
        analysis.hasNumbers,
        analysis.password.length > 0
    );

    updateValidationCard(
        cards[3],
        symbolCheck,
        analysis.hasSymbols,
        analysis.password.length > 0
    );
};

export const updateResult = (container, title, message, analysis) => {
    container.classList.remove('weak', 'medium', 'strong', 'primary');

    if (analysis.strength === 'empty') {
        container.classList.add('primary');
        title.textContent = 'Insira uma senha';
        message.textContent = 'A força da sua senha aparecerá aqui';
    } else if (analysis.strength === 'weak') {
        container.classList.add('weak');
        title.textContent = 'Senha Fraca';
        message.textContent = getWeakMessage(analysis);
    } else if (analysis.strength === 'medium') {
        container.classList.add('medium');
        title.textContent = 'Senha Média';
        message.textContent = getMediumMessage(analysis);
    } else if (analysis.strength === 'strong') {
        container.classList.add('strong');
        title.textContent = 'Senha Forte';
        message.textContent = getStrongMessage(analysis);
    }
};