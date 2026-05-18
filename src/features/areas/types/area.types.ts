export interface MedicalArea {
  id: number;
  name: string;
  icon: any; // For simplicity in keeping the mock icons as lucide components
  description: string;
  availableSlots: number;
  color: string;
  bgColor: string;
  iconColor: string;
  badgeColor: string;
  isActive?: boolean;
}
