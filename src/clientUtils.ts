import { usePathname as nextUsePathname } from "next/navigation";

export function usePathname() {
  return decodeURI(nextUsePathname() ?? '')
}
