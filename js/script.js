import { analyzePassword } from './modules/analyzer.js';
import {
    updateToggleIcon,
    updateProgressBar,
    updateValidationCards,
    updateResult
} from './modules/ui.js';

class PasswordStrengthValidator {
    constructor() {
        this.passwordInput = document.getElementById('passwordInput');
        this.togglePasswordBtn = document.getElementById('togglePassword');
        this.progressBarFill = document.getElementById('progressBarFill');
        this.progressText = document.getElementById('progressText');
        this.resultContainer = document.getElementById('resultContainer');
        this.resultTitle = document.getElementById('resultTitle');
        this.resultMessage = document.getElementById('resultMessage');

        this.validationElements = [
            document.getElementById('lengthCheck'),
            document.getElementById('letterCheck'),
            document.getElementById('numberCheck'),
            document.getElementById('symbolCheck')
        ];

        this.validationCards = document.querySelectorAll('.validation-card');
        this.isPasswordVisible = false;

        this.init();
    }

    init() {
        this.passwordInput.addEventListener('input', () => this.handlePasswordInput());
        this.togglePasswordBtn.addEventListener('click', () => this.togglePasswordVisibility());

        this.updateUI('');
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
        this.passwordInput.type = this.isPasswordVisible ? 'text' : 'password';
        updateToggleIcon(this.togglePasswordBtn, this.isPasswordVisible);
    }

    handlePasswordInput() {
        this.updateUI(this.passwordInput.value);
    }

    updateUI(password) {
        const analysis = analyzePassword(password);

        updateProgressBar(this.progressBarFill, this.progressText, analysis);
        updateValidationCards(this.validationCards, this.validationElements, analysis);
        updateResult(this.resultContainer, this.resultTitle, this.resultMessage, analysis);
    }
}

// inicio
document.addEventListener('DOMContentLoaded', () => {
    new PasswordStrengthValidator();
});