import { useState } from 'react';
import rawMenuData from './data/menu.json';
import { Language, MenuData, MenuItem, ScreenState } from './types';
import { Screen1Main } from './components/Screen1Main';
import { Screen2Choice } from './components/Screen2Choice';
import { Screen3Kitchen } from './components/Screen3Kitchen';
import { Screen4Bar } from './components/Screen4Bar';
import { CategoryDetailView } from './components/CategoryDetailView';
import { ItemDetailModal } from './components/ItemDetailModal';

const menuData = rawMenuData as unknown as MenuData;

export default function App() {
  const [lang, setLang] = useState<Language>('az');
  const [screen, setScreen] = useState<ScreenState>({ name: 'landing' });

  // Transition from Screen 1 after language is chosen
  const handleProceedFromLanding = (selectedLang: Language) => {
    setLang(selectedLang);
    setScreen({ name: 'section_select' });
  };

  // Section choice on Screen 2 (kitchen or bar)
  const handleSelectSection = (section: 'kitchen' | 'bar') => {
    if (section === 'kitchen') {
      setScreen({ name: 'kitchen_categories' });
    } else {
      setScreen({ name: 'bar_categories' });
    }
  };

  // Select category in Kitchen
  const handleSelectKitchenCategory = (categoryId: string) => {
    setScreen({ name: 'category_detail', section: 'kitchen', categoryId });
  };

  // Select category in Bar
  const handleSelectBarCategory = (categoryId: string) => {
    setScreen({ name: 'category_detail', section: 'bar', categoryId });
  };

  // Select specific dish or drink
  const handleSelectItem = (section: 'kitchen' | 'bar', categoryId: string, item: MenuItem) => {
    setScreen({ name: 'item_detail', section, categoryId, itemId: item.id });
  };

  // Home navigation
  const handleGoHome = () => {
    setScreen({ name: 'landing' });
  };

  // Navigation router
  switch (screen.name) {
    case 'landing':
      return (
        <Screen1Main
          onProceed={handleProceedFromLanding}
          currentLang={lang}
        />
      );

    case 'section_select':
      return (
        <Screen2Choice
          lang={lang}
          onSelectSection={handleSelectSection}
          onBackToHome={handleGoHome}
          onLanguageChange={setLang}
        />
      );

    case 'kitchen_categories':
      return (
        <Screen3Kitchen
          categories={menuData.kitchen.categories}
          lang={lang}
          onSelectCategory={handleSelectKitchenCategory}
          onBack={() => setScreen({ name: 'section_select' })}
          onHome={handleGoHome}
          onLanguageChange={setLang}
        />
      );

    case 'bar_categories':
      return (
        <Screen4Bar
          categories={menuData.bar.categories}
          lang={lang}
          onSelectCategory={handleSelectBarCategory}
          onBack={() => setScreen({ name: 'section_select' })}
          onHome={handleGoHome}
          onLanguageChange={setLang}
        />
      );

    case 'category_detail': {
      const sectionData = screen.section === 'kitchen' ? menuData.kitchen : menuData.bar;
      const category = sectionData.categories.find((c) => c.id === screen.categoryId);
      if (!category) {
        return (
          <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
            <p>Category not found</p>
            <button 
              onClick={() => {
                if (screen.section === 'kitchen') {
                  setScreen({ name: 'kitchen_categories' });
                } else {
                  setScreen({ name: 'bar_categories' });
                }
              }}
              className="mt-4 px-4 py-2 bg-zinc-800 rounded-lg"
            >
              Back
            </button>
          </div>
        );
      }

      return (
        <CategoryDetailView
          category={category}
          section={screen.section}
          lang={lang}
          onSelectItem={(item) => handleSelectItem(screen.section, category.id, item)}
          onBack={() => {
            if (screen.section === 'kitchen') {
              setScreen({ name: 'kitchen_categories' });
            } else {
              setScreen({ name: 'bar_categories' });
            }
          }}
          onHome={handleGoHome}
          onLanguageChange={setLang}
        />
      );
    }

    case 'item_detail': {
      const sectionData = screen.section === 'kitchen' ? menuData.kitchen : menuData.bar;
      const category = sectionData.categories.find((c) => c.id === screen.categoryId);
      const item = category?.items.find((i) => i.id === screen.itemId);

      if (!item || !category) {
        return (
          <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
            <p>Item not found</p>
            <button 
              onClick={() => setScreen({ name: 'section_select' })}
              className="mt-4 px-4 py-2 bg-zinc-800 rounded-lg"
            >
              Back
            </button>
          </div>
        );
      }

      return (
        <ItemDetailModal
          item={item}
          section={screen.section}
          lang={lang}
          onLanguageChange={setLang}
          onClose={() =>
            setScreen({
              name: 'category_detail',
              section: screen.section,
              categoryId: screen.categoryId,
            })
          }
        />
      );
    }

    default:
      return (
        <Screen1Main
          onProceed={handleProceedFromLanding}
          currentLang={lang}
        />
      );
  }
}
