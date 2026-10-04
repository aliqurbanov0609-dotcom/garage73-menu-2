import { Language } from '../types';

export const UI_TEXT: Record<Language, {
  garage: string;
  pub: string;
  menu: string;
  tapLanguage: string;
  kitchen: string;
  bar: string;
  back: string;
  home: string;
  ingredients: string;
  description: string;
  volume: string;
  abv: string;
  portion: string;
  kitchenSubtitle: string;
  barSubtitle: string;
  close: string;
  soundOn: string;
  soundOff: string;
  itemsCount: (count: number) => string;
}> = {
  az: {
    garage: 'GARAGE 73',
    pub: 'PUB',
    menu: 'MENU',
    tapLanguage: 'MENYUNU AÇMAQ ÜÇÜN DİL SEÇİN',
    kitchen: 'MƏTBƏX',
    bar: 'BAR',
    back: 'GERİ',
    home: 'ANA SƏHİFƏ',
    ingredients: 'TƏRKİBİ VƏ İNQREDİYENTLƏR',
    description: 'TƏSVİR',
    volume: 'HƏCM',
    abv: 'ALKOQOL',
    portion: 'ÇƏKİ',
    kitchenSubtitle: 'İsti yeməklər, ləzzətli qəlyanaltılar və desertlər',
    barSubtitle: 'Seçilmiş pivələr, premium viski və spirtli içkilər',
    close: 'BAĞLA',
    soundOn: 'SƏS AÇIQ',
    soundOff: 'SƏS BAĞLI',
    itemsCount: (count: number) => `${count} çeşid`,
  },
  en: {
    garage: 'GARAGE 73',
    pub: 'PUB',
    menu: 'MENU',
    tapLanguage: 'TAP A LANGUAGE TO OPEN MENU',
    kitchen: 'KITCHEN',
    bar: 'BAR',
    back: 'BACK',
    home: 'HOME',
    ingredients: 'INGREDIENTS',
    description: 'DESCRIPTION',
    volume: 'VOLUME',
    abv: 'ABV',
    portion: 'PORTION',
    kitchenSubtitle: 'Burgers, live grill, hearty mains & desserts',
    barSubtitle: 'Craft beers, fine whiskey & cocktails',
    close: 'CLOSE',
    soundOn: 'SOUND ON',
    soundOff: 'SOUND OFF',
    itemsCount: (count: number) => `${count} items`,
  },
  ru: {
    garage: 'GARAGE 73',
    pub: 'PUB',
    menu: 'МЕНЮ',
    tapLanguage: 'ВЫБЕРИТЕ ЯЗЫК ДЛЯ ВХОДА В МЕНЮ',
    kitchen: 'КУХНЯ',
    bar: 'БАР',
    back: 'НАЗАД',
    home: 'ГЛАВНАЯ',
    ingredients: 'СОСТАВ И ИНГРЕДИЕНТЫ',
    description: 'ОПИСАНИЕ',
    volume: 'ОБЪЕМ',
    abv: 'КРЕПОСТЬ',
    portion: 'ВЕС',
    kitchenSubtitle: 'Сочные бургеры, гриль, горячие блюда и закуски',
    barSubtitle: 'Разливное и бутылочное пиво, крепкий алкоголь',
    close: 'ЗАКРЫТЬ',
    soundOn: 'ЗВУК ВКЛ',
    soundOff: 'ЗВУК ВЫКЛ',
    itemsCount: (count: number) => {
      const mod10 = count % 10;
      const mod100 = count % 100;
      if (mod10 === 1 && mod100 !== 11) return `${count} позиция`;
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${count} позиции`;
      return `${count} позиций`;
    },
  },
};
