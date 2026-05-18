import { useQuery } from "@tanstack/react-query";
import { getAreas, getAdminAreas } from "./area.service";

export const areaKeys = {
  all: ["areas"] as const,
  lists: () => [...areaKeys.all, "list"] as const,
  adminLists: () => [...areaKeys.all, "adminList"] as const,
};

export function useAreas() {
  return useQuery({
    queryKey: areaKeys.lists(),
    queryFn: getAreas,
  });
}

export function useAdminAreas() {
  return useQuery({
    queryKey: areaKeys.adminLists(),
    queryFn: getAdminAreas,
  });
}
