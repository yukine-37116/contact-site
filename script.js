// Form validation functions for Zoho CRM integration
// Email validation is now handled by validateEmailFormat() function

function privacyAlert6916395000000627003() {
  var privacyTool = document.getElementById('privacyTool6916395000000627003');
  var privacyErr = document.getElementById('privacyErr6916395000000627003');
  
  if (privacyTool && !privacyTool.checked) {
    privacyErr.style.visibility = 'visible';
    privacyTool.focus();
    return false;
  }
  return true;
}

function disableErr6916395000000627003() {
  var privacyErr = document.getElementById('privacyErr6916395000000627003');
  if (privacyErr) {
    privacyErr.style.visibility = 'hidden';
  }
}

// Enhanced phone validation function
function validatePhoneNumber(phoneValue) {
  // Remove all spaces, hyphens, parentheses for validation
  var cleanPhone = phoneValue.replace(/[\s\-\(\)]/g, '');
  
  // Check if it starts with + (international format)
  var hasCountryCode = cleanPhone.startsWith('+');
  
  if (hasCountryCode) {
    // International format: +XX followed by 8-15 digits
    var phoneRegex = /^\+[1-9]\d{8,14}$/;
    return phoneRegex.test(cleanPhone);
  } else {
    // Local format: 10-15 digits
    var phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(cleanPhone);
  }
}

// Enhanced email validation function
function validateEmailFormat(emailValue) {
  // More comprehensive email validation
  var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  // Check basic format
  if (!emailRegex.test(emailValue.toLowerCase())) {
    return false;
  }
  
  // Additional checks
  var parts = emailValue.split('@');
  if (parts.length !== 2) return false;
  
  var localPart = parts[0];
  var domainPart = parts[1];
  
  // Check local part length (before @)
  if (localPart.length > 64) return false;
  
  // Check domain part length (after @)
  if (domainPart.length > 253) return false;
  
  // Check for consecutive dots
  if (emailValue.includes('..')) return false;
  
  // Check if starts or ends with dot
  if (localPart.startsWith('.') || localPart.endsWith('.')) return false;
  
  return true;
}

function checkMandatory6916395000000627003() {

  var mndFileds = ['Last Name', 'Email', 'Phone', 'City', 'Description'];
  var fldLangVal = ['Name', 'Email', 'Phone', 'POL/POD', 'Commodity Desc. (HS CODE)'];
  
  for (var i = 0; i < mndFileds.length; i++) {
    var fieldObj = document.forms['WebToLeads6916395000000627003'][mndFileds[i]];
    if (fieldObj && fieldObj.value.trim().length == 0) {
      alert(fldLangVal[i] + ' cannot be empty.');
      fieldObj.focus();
      return false;
    }
  }
  
  // Enhanced email validation
  var emailField = document.forms['WebToLeads6916395000000627003']['Email'];
  if (emailField && emailField.value.trim().length > 0) {
    if (!validateEmailFormat(emailField.value.trim())) {
      alert('Please enter a valid email address. Examples: user@example.com, john.doe@company.co.uk');
      emailField.focus();
      return false;
    }
  }
  
  // Enhanced phone validation
  var phoneField = document.forms['WebToLeads6916395000000627003']['Phone'];
  if (phoneField && phoneField.value.trim().length > 0) {
    if (!validatePhoneNumber(phoneField.value.trim())) {
      alert('Please enter a valid phone number. Examples: +84123456789, 0123456789, (012) 345-6789');
      phoneField.focus();
      return false;
    }
  }
  
  if (!privacyAlert6916395000000627003()) {
    return false;
  }
  
  // Disable submit button to prevent double submission
  var submitBtn = document.querySelector('.contact-form button[type=submit]');
  if (submitBtn) {
    submitBtn.setAttribute('disabled', true);
    submitBtn.textContent = 'Submitting...';
  }
  
  return true;
}

// Enhanced form validation with better UX
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('webform6916395000000627003');
  if (!form) return;
  
  // Check if we just returned from a form submission
  checkAndClearAfterSubmission();
  
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  const phoneField = form.querySelector('input[type="tel"]');
  
  // Add input formatting for phone field (without validation messages)
  if (phoneField) {
    phoneField.addEventListener('input', function() {
      formatPhoneInput(this);
    });
  }
  
  // Remove real-time validation - only validate on form submission
});

function formatPhoneInput(field) {
  let value = field.value.replace(/\D/g, ''); // Remove non-digits
  
  // Don't format if it starts with + (international)
  if (field.value.startsWith('+')) {
    return;
  }
  
  // Format Vietnamese phone numbers
  if (value.length >= 10) {
    if (value.startsWith('0')) {
      // Format: 0XXX XXX XXX
      value = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    }
  }
  
  // Update field value without triggering infinite loop
  if (field.value !== value && !field.value.startsWith('+')) {
    field.value = value;
  }
}

function validatePhoneField(field) {
  const value = field.value.trim();
  
  // Clear previous error
  clearPhoneError(field);
  
  if (!value) {
    showPhoneError(field, 'Phone number is required');
    return false;
  }
  
  if (!validatePhoneNumber(value)) {
    showPhoneError(field, 'Please enter a valid phone number. Examples: +84123456789, 0123456789');
    return false;
  }
  
  return true;
}

function showPhoneError(field, message) {
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.phone-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Don't show visual error message - validation happens silently
  // The browser's built-in validation or form submission validation will handle user feedback
}

function clearPhoneError(field) {
  const errorDiv = field.parentNode.querySelector('.phone-error');
  if (errorDiv) {
    errorDiv.remove();
  }
}

function validateField(field) {
  const value = field.value.trim();
  
  // Clear previous error
  clearFieldError(field);
  
  if (!value) {
    showFieldError(field, 'This field is required');
    return false;
  }
  
  // Email validation
  if (field.type === 'email' || field.getAttribute('ftype') === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, 'Please enter a valid email address');
      return false;
    }
  }
  
  return true;
}

function showFieldError(field, message) {
  // Remove existing error message
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  // Don't show visual error message - validation happens silently
  // The browser's built-in validation or form submission validation will handle user feedback
}

function clearFieldError(field) {
  const errorDiv = field.parentNode.querySelector('.field-error');
  if (errorDiv) {
    errorDiv.remove();
  }
}

// Smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling to all anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const menu = document.querySelector('.mobile-menu');
  if (menu) {
    menu.classList.toggle('active');
  }
}

// Lazy loading for images (if added in future)
function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Handle browser back/forward navigation - clear form when returning to page
window.addEventListener('pageshow', function(event) {
  // This event fires when navigating back to the page
  if (event.persisted) {
    // Page was loaded from cache (back/forward navigation)
    checkAndClearAfterSubmission();
  }
});

// Global variable to track reCAPTCHA state
let recaptchaCompleted = false;

// Function to show reCAPTCHA modal
function showRecaptchaModal() {
  const modal = document.getElementById('recaptcha-modal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }
}

// Function to close reCAPTCHA modal
function closeRecaptchaModal() {
  const modal = document.getElementById('recaptcha-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
  
  // Reset submit button
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.textContent = 'Submit Inquiry';
    submitBtn.disabled = false;
  }
}

// Function to check if we returned from form submission and clear form
function checkAndClearAfterSubmission() {
  
  // Check if we have a flag indicating form was submitted
  const formSubmitted = localStorage.getItem('contactFormSubmitted');
  const lastSubmissionTime = localStorage.getItem('contactFormSubmissionTime');
  
  // Check multiple indicators of form submission return
  const hasSubmissionFlag = formSubmitted === 'true';
  const cameFromZoho = document.referrer && document.referrer.includes('zoho.com');
  const hasRecentSubmission = lastSubmissionTime && (Date.now() - parseInt(lastSubmissionTime)) < 60000; // 1 minute
  
  // Additional checks for Live Server compatibility
  const sessionSubmitted = sessionStorage.getItem('contactFormSubmitted') === 'true';
  const urlHasSubmissionHint = window.location.href.includes('#submitted') || window.location.search.includes('submitted');
  

  if (hasSubmissionFlag || sessionSubmitted || (cameFromZoho && hasRecentSubmission) || urlHasSubmissionHint) {

    clearFormAfterSubmission();
    
    // Clear all the flags
    localStorage.removeItem('contactFormSubmitted');
    localStorage.removeItem('contactFormSubmissionTime');
    sessionStorage.removeItem('contactFormSubmitted');
    
    // Clean URL if it has submission hints
    if (urlHasSubmissionHint) {
      const cleanUrl = window.location.href.replace(/#submitted.*$/, '').replace(/[?&]submitted[^&]*/, '');
      window.history.replaceState({}, document.title, cleanUrl);
    }
  } else {

  }
  
  // Also clear if more than 5 minutes have passed since last submission
  // if (lastSubmissionTime) {
  //   const timeDiff = Date.now() - parseInt(lastSubmissionTime);
  //   if (timeDiff > 5 * 60 * 1000) { // 5 minutes
  //     console.log('Cleaning up old submission flags (>5 minutes)');
  //     localStorage.removeItem('contactFormSubmitted');
  //     localStorage.removeItem('contactFormSubmissionTime');
  //   }
  // }
}

// Function to mark form as submitted
function markFormAsSubmitted() {
  const timestamp = Date.now().toString();
  
  // Use both localStorage and sessionStorage for better compatibility
  localStorage.setItem('contactFormSubmitted', 'true');
  localStorage.setItem('contactFormSubmissionTime', timestamp);
  sessionStorage.setItem('contactFormSubmitted', 'true');
  sessionStorage.setItem('contactFormSubmissionTime', timestamp);
  

}

// Function to clear form after successful submission
function clearFormAfterSubmission() {
  const form = document.getElementById('webform6916395000000627003');
  if (form) {
    // Reset all form fields
    form.reset();
    
    // Reset submit button state
    const submitBtn = form.querySelector('button[type=submit]');
    if (submitBtn) {
      submitBtn.textContent = 'Submit Inquiry';
      submitBtn.disabled = false;
    }
    
    // Reset reCAPTCHA state
    recaptchaCompleted = false;
    if (typeof grecaptcha !== 'undefined') {
      grecaptcha.reset();
    }
    
  }
}

// Callback function when reCAPTCHA is completed
function onRecaptchaSuccess() {
  recaptchaCompleted = true;
  
  // Close modal
  closeRecaptchaModal();
  
  // Auto-submit the form after reCAPTCHA is completed
  const submitBtn = document.querySelector('.submit-btn');
  if (submitBtn) {
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
  }
  
  // Log the reCAPTCHA response
  const recaptchaResponse = grecaptcha.getResponse();
  
  // Submit the form
  const form = document.getElementById('webform6916395000000627003');
  if (form) {
    // Mark form as submitted before external redirect
    markFormAsSubmitted();
    
    // Submit the form (will redirect to Zoho then back)
    form.submit();
  }
}

// Form submission with reCAPTCHA v2 modal
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('webform6916395000000627003');
  if (!form) return;
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Let the original validation run first
    const isValid = checkMandatory6916395000000627003();
    
    if (!isValid) {
      return false;
    }
    
    // If reCAPTCHA already completed, submit immediately
    if (recaptchaCompleted) {
      const recaptchaResponse = grecaptcha.getResponse();
      if (recaptchaResponse) {
        // Mark form as submitted before external redirect
        markFormAsSubmitted();
        
        // Submit the form
        form.submit();
        return;
      }
    }
    
    // Show reCAPTCHA modal popup
    showRecaptchaModal();
    
    // Update button text
    const submitBtn = form.querySelector('button[type=submit]');
    if (submitBtn) {
      submitBtn.textContent = 'Complete verification in popup';
      submitBtn.disabled = true;
    }
    
    return false;
  });
  
  // Close modal when clicking backdrop
  const modal = document.getElementById('recaptcha-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target.classList.contains('recaptcha-backdrop')) {
        closeRecaptchaModal();
      }
    });
  }
});
