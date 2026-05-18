import { appConfig } from "@/app/config";
import { httpClient } from "@/services/api/http-client";
import { endpoints } from "@/services/api/endpoints";
import type { MedicalArea } from "../types/area.types";
import {
  Stethoscope,
  Heart,
  Baby,
  Sparkles,
  Users,
  Bone,
  Brain,
  FlaskConical,
} from "lucide-react";

export const mockAreas: MedicalArea[] = [
  {
    id: 1,
    name: 'Medicina General',
    icon: Stethoscope,
    description: 'Consultas médicas generales para diagnóstico y tratamiento.',
    availableSlots: 12,
    color: 'blue',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
    isActive: true,
  },
  {
    id: 2,
    name: 'Cardiología',
    icon: Heart,
    description: 'Especialidad en enfermedades del corazón y sistema cardiovascular.',
    availableSlots: 8,
    color: 'red',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    badgeColor: 'bg-red-100 text-red-700',
    isActive: true,
  },
  {
    id: 3,
    name: 'Pediatría',
    icon: Baby,
    description: 'Atención médica especializada para bebés, niños y adolescentes.',
    availableSlots: 15,
    color: 'pink',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600',
    badgeColor: 'bg-pink-100 text-pink-700',
    isActive: true,
  },
  {
    id: 4,
    name: 'Dermatología',
    icon: Sparkles,
    description: 'Tratamiento de enfermedades de la piel, cabello y uñas.',
    availableSlots: 6,
    color: 'purple',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    badgeColor: 'bg-purple-100 text-purple-700',
    isActive: true,
  },
  {
    id: 5,
    name: 'Ginecología',
    icon: Users,
    description: 'Salud reproductiva y atención integral para la mujer.',
    availableSlots: 10,
    color: 'teal',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
    badgeColor: 'bg-teal-100 text-teal-700',
    isActive: true,
  },
  {
    id: 6,
    name: 'Traumatología',
    icon: Bone,
    description: 'Tratamiento de lesiones del sistema musculoesquelético.',
    availableSlots: 7,
    color: 'orange',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    badgeColor: 'bg-orange-100 text-orange-700',
    isActive: true,
  },
  {
    id: 7,
    name: 'Psicología',
    icon: Brain,
    description: 'Apoyo profesional para salud mental y bienestar emocional.',
    availableSlots: 9,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    isActive: true,
  },
  {
    id: 8,
    name: 'Laboratorio',
    icon: FlaskConical,
    description: 'Análisis clínicos y estudios de laboratorio.',
    availableSlots: 20,
    color: 'cyan',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    badgeColor: 'bg-cyan-100 text-cyan-700',
    isActive: true,
  },
];

const areaMetadataMap: Record<string, {
  icon: any;
  color: string;
  bgColor: string;
  iconColor: string;
  badgeColor: string;
}> = {
  "Medicina General": {
    icon: Stethoscope,
    color: "blue",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  "Cardiología": {
    icon: Heart,
    color: "red",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    badgeColor: "bg-red-100 text-red-700",
  },
  "Pediatría": {
    icon: Baby,
    color: "pink",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
    badgeColor: "bg-pink-100 text-pink-700",
  },
  "Dermatología": {
    icon: Sparkles,
    color: "purple",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  "Ginecología": {
    icon: Users,
    color: "teal",
    bgColor: "bg-teal-50",
    iconColor: "text-teal-600",
    badgeColor: "bg-teal-100 text-teal-700",
  },
  "Traumatología": {
    icon: Bone,
    color: "orange",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    badgeColor: "bg-orange-100 text-orange-700",
  },
  "Psicología": {
    icon: Brain,
    color: "indigo",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600",
    badgeColor: "bg-indigo-100 text-indigo-700",
  },
  "Laboratorio": {
    icon: FlaskConical,
    color: "cyan",
    bgColor: "bg-cyan-50",
    iconColor: "text-cyan-600",
    badgeColor: "bg-cyan-100 text-cyan-700",
  },
};

export function mapBackendArea(area: any): MedicalArea {
  const name = area.name || "";
  const meta = areaMetadataMap[name] || {
    icon: Stethoscope,
    color: "blue",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-700",
  };
  return {
    id: area.id,
    name: area.name,
    description: area.description || "",
    availableSlots: area.availableSlots || 0,
    isActive: area.isActive !== undefined ? area.isActive : true,
    ...meta,
  };
}

export async function getAreas(): Promise<MedicalArea[]> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockAreas), 500));
  }
  const { data } = await httpClient.get<any[]>(endpoints.areas.list);
  return data.map(mapBackendArea);
}

export async function getAdminAreas(): Promise<MedicalArea[]> {
  if (appConfig.useMocks) {
    return new Promise((resolve) => setTimeout(() => resolve(mockAreas), 500));
  }
  const { data } = await httpClient.get<any[]>(endpoints.areas.adminList);
  return data.map(mapBackendArea);
}
