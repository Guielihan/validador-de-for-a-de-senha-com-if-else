export const checkRepeatedNumbers = (password) => {
    const repeatedPattern = /(\d)\1{2,}/;
    return repeatedPattern.test(password);
};

export const getWeakMessage = (analysis) => {
    const missing = [];

    if (!analysis.hasUppercase) missing.push('adicionar LETRAS MAIÚSCULAS');
    if (analysis.length < 6) missing.push('aumentar o comprimento (mínimo 6 caracteres)');
    if (!analysis.hasLowercase) missing.push('adicionar letras minúsculas');
    if (!analysis.hasNumbers) missing.push('incluir números');
    if (!analysis.hasSymbols) missing.push('usar símbolos especiais');
    if (analysis.hasRepeatedNumbers) missing.push('evitar números repetidos (ex: 111, 222)');

    return `Sua senha é fraca. Para melhorar, tente: ${missing.join(', ')}.`;
};

export const getMediumMessage = (analysis) => {
    const suggestions = [];

    if (!analysis.hasUppercase) suggestions.push('adicionar LETRAS MAIÚSCULAS obrigatoriamente');
    if (!analysis.hasNumbers) suggestions.push('incluir números');
    if (!analysis.hasSymbols) suggestions.push('incluir símbolos especiais');
    if (analysis.length < 12) suggestions.push('aumentar para 12+ caracteres');
    if (analysis.hasRepeatedNumbers) suggestions.push('evitar números repetidos consecutivos');

    if (suggestions.length === 0) {
        return 'Sua senha é boa, mas pode ser melhorada!';
    }

    return `Sua senha é média. Para torná-la mais forte, tente: ${suggestions.join(', ')}.`;
};

export const getStrongMessage = (analysis) => {
    let message = 'Excelente! Sua senha é muito forte. ';

    const strengths = [];
    if (analysis.hasUppercase) strengths.push('com LETRAS MAIÚSCULAS');
    if (analysis.length >= 12) strengths.push('comprimento excelente');
    if (analysis.hasUppercase && analysis.hasLowercase) strengths.push('ótima variação de letras');
    if (analysis.hasNumbers && !analysis.hasRepeatedNumbers) strengths.push('números variados');
    if (analysis.hasSymbols) strengths.push('símbolos especiais presentes');

    if (strengths.length > 0) {
        message += `Pontos positivos: ${strengths.join(', ')}.`;
    }

    return message;
};

export const analyzePassword = (password) => {
    const analysis = {
        password,
        length: password.length,
        hasUppercase: /[A-Z]/.test(password),
        hasLowercase: /[a-z]/.test(password),
        hasNumbers: /[0-9]/.test(password),
        hasSymbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        hasRepeatedNumbers: checkRepeatedNumbers(password),
        strength: 'empty',
        percentage: 0,
        score: 0
    };

    if (analysis.length > 0) analysis.score += 1;
    if (analysis.hasUppercase) analysis.score += 1;
    if (analysis.hasLowercase) analysis.score += 1;
    if (analysis.hasNumbers) analysis.score += 1;
    if (analysis.hasSymbols) analysis.score += 1;
    if (analysis.length >= 12) analysis.score += 1;
    if (analysis.hasRepeatedNumbers) analysis.score -= 1;

    if (password.length === 0) {
        analysis.strength = 'empty';
        analysis.percentage = 0;
    } else if (password.length < 6) {
        analysis.strength = 'weak';
        analysis.percentage = 33.33;
    } else if (password.length <= 10) {
        analysis.strength = 'medium';
        analysis.percentage = 66.66;
    } else {
        analysis.strength = 'strong';
        analysis.percentage = 100;
    }

    return analysis;
};