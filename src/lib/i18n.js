import { writable, derived } from 'svelte/store';

export const lang = writable('uz');

/** @type {Record<string, Record<string, any>>} */
const dictionary = {
  uz: {
    header: { table: "STOL" },
    main: {
      title: "Raqamli buyurtma tizimi",
      subtitle: "Davom etish uchun rolingizni tanlang!",
      customer: "Mijoz",
      customer_desc: "Menyuni ko'rish va buyurtma qilish",
      waiter: "Girgitton",
      waiter_desc: "Buyurtmalarni olib borish",
      chef: "Oshpaz",
      chef_desc: "Buyurtmalarni ko'rish va tayyorlash"
    },
    menu: {
      title: "O'zingizga yoqqanini tanlang",
      subtitle: "Siz uchun maxsus lazzat va sifatli masalliqlar.",
      categories: { food: "Taomlar", drinks: "Ichimliklar", desserts: "Shirinliklar" },
      alert_order: "uchun buyurtma qabul qilindi!",
    },
    cart: {
      total: "Umumiy hisob",
      currency: "so'm",
      place_order: "Buyurtma qilish",
      add_to_cart: "Ro'yxatga kiritish"
    },
    ai: {
      title: "AI Yordamchi",
      greeting: "Salom! Men sizning AI yordamchingizman. Byudjetingizni ayting va men sizga mos menyu topib beraman!",
      placeholder: "Masalan: Menda 100 000 so'm bor...",
      success_budget1: "Shu",
      success_budget2: "so'm uchun ajoyib taklif! (Jami:",
      error_budget: "so'mga hech narsa topolmadim.",
      no_budget: "Kechirasiz, byudjetni tushunmadim. Iltimos raqam kiriting, masalan: 2000.",
      suggested_combo: "Tavsiya etilgan to'plam",
      total: "Jami",
      add_all: "Barchasini savatga",
      added: "Zo'r! Men bularni savatingizga qo'shdim."
    },
    chef: {
      title: "Buyurtmalar paneli",
      live_feed: "Oshxona jonli oqimi",
      no_orders: "Hozircha hechnarsa yo'q",
      empty_desc: "Hammasi nazorat ostida, oshpaz!",
      start: "BOSHLASH",
      ready: "TAYYOR",
      minutes_ago: "daqiqa avval"
    },
    waiter: {
      title: "Xizmat ko'rsatish paneli",
      active_orders: "faol buyurtma mavjud",
      served: "Xizmat ko'rsatildi",
      total: "Jami",
      table: "Stol",
      mark_ready: "Tayyor deb belgilash",
      mark_preparing: "Tayyorlanmoqda deb belgilash"
    },
    status: {
      all: "Barchasi",
      pending: "Kutilmoqda",
      in_progress: "Tayyorlanmoqda",
      ready: "Tayyor"
    },
    footer: {
      desc: "Toshkentning eng mazali choy va taomlari, tez va qulay buyurtma",
      links: "Tez havolalar",
      history: "Buyurtmalar tarixi",
      contact: "Aloqa",
      location: "Toshkent, Yunusobod",
      rights: "Barcha huquqlar himoyalangan"
    },
    theme: {
      aria: "Mavzuni o'zgartirish"
    },
    ui: {
      open_ai: "AI yordamchini ochish",
      stol: "Stol"
    }
  },
  ru: {
    header: { table: "СТОЛ" },
    main: {
      title: "Цифровая система заказов",
      subtitle: "Выберите вашу роль для продолжения!",
      customer: "Клиент",
      customer_desc: "Посмотреть меню и заказать",
      waiter: "Официант",
      waiter_desc: "Обслуживание заказов",
      chef: "Повар",
      chef_desc: "Просмотр и приготовление заказов"
    },
    menu: {
      title: "Выберите свой вкус",
      subtitle: "Премиальные ингредиенты, специально для вас.",
      categories: { food: "Еда", drinks: "Напитки", desserts: "Десерты" },
      alert_order: "Заказ принят для",
    },
    cart: {
      total: "Итого",
      currency: "сум",
      place_order: "Оформить заказ",
      add_to_cart: "В корзину"
    },
    ai: {
      title: "ИИ Помощник",
      greeting: "Привет! Я ваш ИИ-помощник. Скажите мне ваш бюджет, и я подберу идеальное комбо!",
      placeholder: "Например: У меня есть 100 000 сум...",
      success_budget1: "Для",
      success_budget2: "сум отличное комбо! (Итого:",
      error_budget: "сум я ничего не нашел.",
      no_budget: "Я не понял бюджет. Пожалуйста, введите число, например: 2000.",
      suggested_combo: "Рекомендуемое комбо",
      total: "Итого",
      add_all: "Добавить все в корзину",
      added: "Отлично! Я добавил это в вашу корзину."
    },
    chef: {
      title: "Панель заказов",
      live_feed: "Живая лента кухни",
      no_orders: "Заказов пока нет",
      empty_desc: "Все чисто, шеф!",
      start: "НАЧАТЬ",
      ready: "ГОТОВО",
      minutes_ago: "мин. назад"
    },
    waiter: {
      title: "Панель обслуживания",
      active_orders: "активных заказов в работе",
      served: "Обслужено",
      total: "Итого",
      table: "Стол",
      mark_ready: "Отметить как готово",
      mark_preparing: "Начать готовить"
    },
    status: {
      all: "Все",
      pending: "В ожидании",
      in_progress: "Готовится",
      ready: "Готово"
    },
    footer: {
      desc: "Самый вкусный чай и еда Ташкента, быстрый и удобный заказ",
      links: "Быстрые ссылки",
      history: "История заказов",
      contact: "Контакты",
      location: "Ташкент, Юнусабад",
      rights: "Все права защищены"
    },
    theme: {
      aria: "Сменить тему"
    },
    ui: {
      open_ai: "Открыть ИИ помощника",
      stol: "Стол"
    }
  },
  en: {
    header: { table: "TABLE" },
    main: {
      title: "Digital order system",
      subtitle: "Choose your role to continue!",
      customer: "Customer",
      customer_desc: "View menu and order",
      waiter: "Waiter",
      waiter_desc: "Serve orders",
      chef: "Chef",
      chef_desc: "View and prepare orders"
    },
    menu: {
      title: "Choose your flavor",
      subtitle: "Premium ingredients, hand-picked for the ultimate dining experience.",
      categories: { food: "Food", drinks: "Drinks", desserts: "Desserts" },
      alert_order: "Order placed for table",
    },
    cart: {
      total: "Total",
      currency: "so'm",
      place_order: "Place Order",
      add_to_cart: "Add to cart"
    },
    ai: {
      title: "AI Assistant",
      greeting: "Hi! I'm your AI foodie assistant. Tell me your budget and I'll find the perfect combo for you!",
      placeholder: "E.g. I have 100 000 so'm...",
      success_budget1: "Here's a great combo for",
      success_budget2: "so'm! (Total:",
      error_budget: "so'm. Our cheapest item might be more expensive.",
      no_budget: "I didn't catch a budget there. Please include a number, like 'I have 2000'.",
      suggested_combo: "Suggested Combo",
      total: "Total",
      add_all: "Add all to Cart",
      added: "Awesome! I added those to your cart."
    },
    chef: {
      title: "Order Dashboard",
      live_feed: "Live Kitchen Feed",
      no_orders: "No orders found",
      empty_desc: "All clear, Chef!",
      start: "START",
      ready: "READY",
      minutes_ago: "mins ago"
    },
    waiter: {
      title: "Service Dashboard",
      active_orders: "active orders in progress",
      served: "Served",
      total: "Total",
      table: "Table",
      mark_ready: "Mark as Ready",
      mark_preparing: "Start Preparing"
    },
    status: {
      all: "All",
      pending: "Pending",
      in_progress: "Preparing",
      ready: "Ready"
    },
    footer: {
      desc: "Tashkent's tastiest tea and food, quick and convenient ordering",
      links: "Quick Links",
      history: "Order History",
      contact: "Contact",
      location: "Tashkent, Yunusobod",
      rights: "All rights reserved"
    },
    theme: {
      aria: "Toggle theme"
    },
    ui: {
      open_ai: "Open AI Assistant",
      stol: "Table"
    }
  }
};

export const t = derived(lang, ($lang) => {
  /** 
   * @param {string} key 
   * @returns {any}
   */
  return (key) => {
    const keys = key.split('.');
    let value = dictionary[$lang];
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key; // fallback
    }
  }
  return value || key;
  };
});
