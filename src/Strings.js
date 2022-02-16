export const Strings = {
    itemsCategories: {
        "potion": {"pl": "Potion", "en": "Potion", "ru": "Зелья"},
        "plant": {"pl": "Plants","en": "Plants", "ru": "Растения"},
        "melee weapon": {"pl": "Melee Weapon", "en": "Melee Weapon", "ru": "Ближнее Оружие"},
        "range weapon": {"pl": "Range Weapon","en": "Range Weapon", "ru": "Дальнобойное Оружие"},
        "food": {"pl": "Food", "en": "Food", "ru": "Еда"},
        "misc": {"pl": "Misc", "en": "Misc", "ru": "Разное"},
        "scroll": {"pl": "Scroll", "en": "Scroll", "ru": "Свитки"},
        "ring": {"pl": "Ring", "en": "Ring", "ru": "Кольца"},
        "key": {"pl": "Key", "en": "Key", "ru": "Ключи"},
        "rune": {"pl": "Rune", "en": "Rune", "ru": "Руны"},
        "package": {"pl": "Package", "en": "Package", "ru": "Пакеты"},
        "recipe": {"pl": "Recipe", "en": "Recipe", "ru": "Рецепты"},
        "writing": {"pl": "Writing", "en": "Writing", "ru": "Дневники & Записки"},
        "trophy": {"pl": "Trophy", "en": "Trophy", "ru": "Трофеи"},
        "belt": {"pl": "Belt", "en": "Belt", "ru": "Ремни"},
        "armor": {"pl": "Armor", "en": "Armor", "ru": "Броня"},
        "amulet": {"pl": "Amulet", "en": "Amulet", "ru": "Амулеты"},
        "crafting material": {"pl": "Crafting", "en": "Crafting", "ru": "Материалы для крафта"},
        "unknown?": {"pl": "(without category)", "en": "(without category)", "ru": "(без категории)"},
        "home clutter": {"pl": "Home clutter", "en": "Home clutter", "ru": "Украшения дома"},
    },

    getItemCategory: function (cat, lang) {
        return this.itemsCategories[cat][lang]
    },

    containersCategories: {
        "vineshelf": {"pl": "Vine Shelf", "en": "Vine Shelf", "ru": "Винная полка"},
        "corpse": {"pl": "Corpse", "en": "Corpse", "ru": "Труп"},
        "chest": {"pl": "Chest", "en": "Chest", "ru": "Сундук"},
        "bookshelf": {"pl": "Bookshelf", "en": "Bookshelf", "ru": "Книжная полка"},
        "barrel": {"pl": "Barrel", "en": "Barrel", "ru": "Бочка"},
        "grave": {"pl": "Grave", "en": "Grave", "ru": "Саркофаг"},
        "searchvineyard": {"pl": "Vineyard", "en": "Vineyard", "ru": "Виноградник"}
    },

    getContainerCategory: function (cat, lang) {
        return this.containersCategories[cat][lang]
    },

    getCategory: function (cat, lang) {
        if(this.containersCategories.hasOwnProperty(cat)) {
            return this.containersCategories[cat][lang]
        } else {
            return this.itemsCategories[cat][lang]
        }
    },

    ui: {
        "containers": {"pl": "Containers", "en": "Containers", "ru": "Контейнеры"},
        "items": {"pl": "Items", "en": "Items", "ru": "Предметы"},
        "name": {"pl": "Name", "en": "Name", "ru": "Имя"},
        "consoleId": {"pl": "Console ID", "en": "Console ID", "ru": "Консольный ID"},
        "description": {"pl": "Description", "en": "Description", "ru": "Описание"},
    },

    getUi: function (ui, lang) {
        return this.ui[ui][lang]
    }
}