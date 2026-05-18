export interface Doctor {
  id: string;
  fullName: string;
  document?: string;
  phone: string;
  email: string;
  medicalArea: string;
  isActive: boolean;
}
