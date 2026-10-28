import type { LoanInput, Equipment, FormErrors } from "./types";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MAX_QUANTITY_PER_LOAN = 3;

export function validateLoan(form: LoanInput, availableStock: number): FormErrors<LoanInput> {
  const errors: FormErrors<LoanInput> = {};
  
  if (!form.borrowerName || form.borrowerName.trim().length < 2) {
    errors.borrowerName = "Enter your name (at least 2 characters).";
  }
  
  if (!form.borrowerEmail || !EMAIL.test(form.borrowerEmail.trim())) {
    errors.borrowerEmail = "Enter a valid email address.";
  }
  
  const maxAllowed = Math.min(MAX_QUANTITY_PER_LOAN, availableStock);
  if (!Number.isInteger(form.quantity) || form.quantity < 1) {
    errors.quantity = "Borrow at least 1 item.";
  } else if (form.quantity > maxAllowed) {
    errors.quantity = maxAllowed === 1 ? "You can borrow at most 1 item." : `You can borrow at most ${maxAllowed} items.`;
  }
  
  return errors;
}

export const hasErrors = (errors: object) => Object.keys(errors).length > 0;