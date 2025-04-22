// validation.js

// Regex for name: Only letters and spaces, min 3 characters, max 50
export const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{3,50}$/;
    if (!name) {
      return 'Name is required.';
    }
    if (!nameRegex.test(name)) {
      return 'Name must be between 3 to 50 characters and contain only letters and spaces.';
    }
    return ''; // No error
  };
  
  // Regex for email: Standard email format validation
  export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      return 'Email is required.';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address.';
    }
    return ''; // No error
  };
  
  // Regex for password: At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
      return 'Password is required.';
    }
    if (!passwordRegex.test(password)) {
      return 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.';
    }
    return ''; // No error
  };
  