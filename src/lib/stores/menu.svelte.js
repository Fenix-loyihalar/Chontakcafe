// src/lib/stores/menu.svelte.js

export const menuItems = [
	{
		id: '1',
		name: { uz: 'Klassik Burger', ru: 'Классический Бургер', en: 'Classic Burger' },
		description: { uz: 'Yangi pomidor, salat bargi va maxsus sous qo\'shilgan sersuv mol go\'shti', ru: 'Сочная говяжья котлета со свежими листьями салата, помидорами и нашим фирменным соусом', en: 'Juicy beef patty with fresh lettuce, tomato, and our special sauce' },
		price: 35000,
		category: 'food',
		image: '/assets/burger.png'
	},
	{
		id: '2',
		name: { uz: 'Sezar Salati', ru: 'Салат Цезарь', en: 'Caesar Salad' },
		description: { uz: 'Pishloq, kraker va mayin sous bilan tortiladigan yangi salat barglari', ru: 'Свежие листья салата ромэн с пармезаном, гренками и сливочной заправкой', en: 'Fresh romaine lettuce with parmesan, croutons, and creamy dressing' },
		price: 25000,
		category: 'food',
		image: '/assets/salad.png'
	},
	{
		id: '3',
		name: { uz: 'Margarita Pitsasi', ru: 'Пицца Маргарита', en: 'Margherita Pizza' },
		description: { uz: 'Yangi motsarella pishlog\'i, rayhon va pomidor sousli klassik pitsa', ru: 'Классическая пицца со свежей моцареллой, базиликом и томатным соусом', en: 'Classic pizza with fresh mozzarella, basil, and tomato sauce' },
		price: 55000,
		category: 'food',
		image: '/assets/pizza.png'
	},
	{
		id: '4',
		name: { uz: 'Muzli Latte', ru: 'Айс Латте', en: 'Iced Latte' },
		description: { uz: 'Muz va sovuq sut bilan aralashtirilgan yumshoq espresso', ru: 'Мягкий эспрессо с холодным молоком и льдом', en: 'Smooth espresso with cold milk and ice' },
		price: 20000,
		category: 'drinks',
		image: '/assets/latte.png'
	},
	{
		id: '5',
		name: { uz: 'Yangi apelsin sharbati', ru: 'Свежевыжатый апельсиновый сок', en: 'Fresh Orange Juice' },
		description: { uz: 'Yangi siqilgan apelsin sharbati', ru: 'Свежевыжатый апельсиновый сок', en: 'Freshly squeezed orange juice' },
		price: 15000,
		category: 'drinks',
		image: '/assets/juice.png'
	},
	{
		id: '6',
		name: { uz: 'Shokoladli tort', ru: 'Шоколадный торт', en: 'Chocolate Cake' },
		description: { uz: 'Mayin ganajli boy shokoladli tort', ru: 'Богатый шоколадный торт с нежным ганашем', en: 'Rich chocolate cake with smooth ganache' },
		price: 25000,
		category: 'desserts',
		image: '/assets/cake.png'
	}
];