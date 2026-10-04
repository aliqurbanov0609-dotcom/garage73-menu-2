export type Language = 'az' | 'en' | 'ru';

export interface LocalizedString {
  en: string;
  az: string;
  ru: string;
}

export interface MenuItem {
  id: string;
  name: LocalizedString;
  price: number;
  weight?: string;
  volume?: string;
  abv?: string;
  ingredients?: LocalizedString;
  description: LocalizedString;
  image: string;
}

export interface MenuCategory {
  id: string;
  name: LocalizedString;
  image: string;
  items: MenuItem[];
}

export interface MenuSection {
  title: LocalizedString;
  categories: MenuCategory[];
}

export interface MenuData {
  kitchen: MenuSection;
  bar: MenuSection;
}

export type ScreenState = 
  | { name: 'landing' }
  | { name: 'section_select' }
  | { name: 'kitchen_categories' }
  | { name: 'bar_categories' }
  | { name: 'category_detail'; section: 'kitchen' | 'bar'; categoryId: string }
  | { name: 'item_detail'; section: 'kitchen' | 'bar'; categoryId: string; itemId: string };
