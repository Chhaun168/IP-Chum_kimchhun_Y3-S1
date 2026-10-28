export type EquipmentCategory = "Measurement" | "Power" | "Tools" | "General";

export interface Equipment {
  id: number;
  name: string;
  model: string;
  category: EquipmentCategory;
  totalStock: number;
  availableStock: number;
  description: string;
}

export type EquipmentInput = Omit<Equipment, "id" | "availableStock">;

export interface Loan {
  id: number;
  equipmentId: number;
  borrowerName: string;
  borrowerEmail: string;
  quantity: number;
  loanDate: string;
  status: "Active" | "Returned";
}

export type LoanInput = Pick<Loan, "borrowerName" | "borrowerEmail" | "quantity">;

// Field name -> error message, only for fields that have an error
export type FormErrors<T> = Partial<Record<keyof T, string>>;