import { UserSettings } from "../declarations/types/types";

export function saveUserSettings(userSettings: UserSettings){
  localStorage.setItem('aton-dash-user-settings', JSON.stringify(userSettings))
}

export function getSavedSettings(){
  const savedSettings = localStorage.getItem('aton-dash-user-settings')
  return JSON.parse(savedSettings!) as UserSettings | null
}