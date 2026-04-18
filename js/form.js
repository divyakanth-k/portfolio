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
  // ── Form Submit ──
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);
    if (!isNameValid || !isEmailValid || !isMessageValid) return;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalHTML = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="ph ph-circle-notch ph-spin"></i> Sending...';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim()
        })
      });

      if (res.ok) {
        submitBtn.innerHTML = '<i class="ph ph-check-circle"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, var(--accent-emerald), #10b981)';
        submitBtn.style.opacity = '1';
        form.reset();
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      } else {
        throw new Error('Server error');
      }
    } catch {
      submitBtn.innerHTML = '<i class="ph ph-warning"></i> Failed — Try Again';
      submitBtn.style.opacity = '1';
      submitBtn.disabled = false;
      setTimeout(() => { submitBtn.innerHTML = originalHTML; }, 3000);
    }
  });
});
