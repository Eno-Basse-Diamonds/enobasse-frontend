export interface NavigationItem {
  label: string;
  href: string;
}

export interface DropdownNavigation {
  id: string;
  title: string;
  href?: string;
  dropdownItems?: NavigationItem[];
}
