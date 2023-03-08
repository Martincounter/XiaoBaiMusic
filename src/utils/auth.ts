// import Cookies from "js-cookie";
import { logout } from "@/api/auth";
export function removeCookie(key: String) {
  // Cookies.remove(key);
  localStorage.removeItem(`cookie-${key}`);
}

export function doLogout() {
  logout();
  removeCookie("MUSIC_U");
  removeCookie("__csrf");
}
