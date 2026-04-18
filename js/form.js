/* ============================================
   Contact Form — Validation & Submission
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('formName');
  const emailInput = document.getElementById('formEmail');
  const messageInput = document.getElementById('formMessage');

  // ── Validation helpers ──
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, message) {
    removeError(input);
    input.style.borderColor = 'var(--accent-rose)';
    input.style.boxShadow = '0 0 0 3px rgba(251, 113, 133, 0.1)';

    const errorEl = document.createElement('span');
    errorEl.className = 'form-error';
    errorEl.textContent = message;
    errorEl.style.cssText = `
      display: block;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--accent-rose);
      margin-top: 0.5rem;
      opacity: 0;
      transform: translateY(-5px);
      transition: opacity 0.2s ease, transform 0.2s ease;
    `;

    input.parentElement.appendChild(errorEl);

    // Trigger animation
    requestAnimationFrame(() => {
      errorEl.style.opacity = '1';
      errorEl.style.transform = 'translateY(0)';
    });
  }

  function removeError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
    const existing = input.parentElement.querySelector('.form-error');
    if (existing) existing.remove();
  }

  // ── Live validation on blur ──
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.parentElement.querySelector('.form-error')) {
        validateField(input);
      }
    });
  });

  function validateField(input) {
    removeError(input);

    if (input === nameInput && !input.value.trim()) {
      showError(input, '> name is required');
      return false;
    }

    if (input === emailInput) {
      if (!input.value.trim()) {
        showError(input, '> email is required');
        return false;
      }
      if (!isValidEmail(input.value.trim())) {
        showError(input, '> invalid email format');
        return false;
      }
    }

    if (input === messageInput && !input.value.trim()) {
      showError(input, '> message is required');
      return false;
    }

    return true;
  }

  // ── Form Submit ──
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);

    if (!isNameValid || !isEmailValid || !isMessageValid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    // Show sending state
    submitBtn.innerHTML = '<i class="ph ph-circle-notch ph-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
      // Success state
      submitBtn.innerHTML = '<i class="ph ph-check-circle"></i> Message Sent!';
      submitBtn.style.background = 'linear-gradient(135deg, var(--accent-emerald), #10b981)';
      submitBtn.style.opacity = '1';

      // Reset form after delay
      setTimeout(() => {
        form.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3000);
    }, 1500);
  });
});
