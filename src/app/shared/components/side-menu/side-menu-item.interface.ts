export interface SideMenuItemI {
  key: string;
  displayName: string;
  route: string;
  icon: string;
  canActivateRole?: string[];
}
