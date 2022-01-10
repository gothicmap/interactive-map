export const Strings = {
    itemsCategories: {
        "potion": {"en": "Potion", "ru": "Зелья"},
        "plant": {"en": "Plants", "ru": "Растения"},
        "melee weapon": {"en": "Melee Weapon", "ru": "Ближнее Оружие"},
        "range weapon": {"en": "Range Weapon", "ru": "Дальнобойное Оружие"},
        "food": {"en": "Food", "ru": "Еда"},
        "misc": {"en": "Misc", "ru": "Разное"},
        "scroll": {"en": "Scroll", "ru": "Свитки"},
        "ring": {"en": "Ring", "ru": "Кольца"},
        "key": {"en": "Key", "ru": "Ключи"},
        "rune": {"en": "Rune", "ru": "Руны"},
        "package": {"en": "Package", "ru": "Пакеты"},
        "recipe": {"en": "Recipe", "ru": "Рецепты"},
        "writing": {"en": "Writing", "ru": "Дневники & Записки"},
        "trophy": {"en": "Trophy", "ru": "Трофеи"},
        "belt": {"en": "Belt", "ru": "Ремни"},
        "armor": {"en": "Armor", "ru": "Броня"},
        "amulet": {"en": "Amulet", "ru": "Амулеты"},
        "crafting material": {"en": "Crafting", "ru": "Материалы для крафта"},
        "unknown?": {"en": "(without category)", "ru": "(без категории)"},
        "home clutter": {"en": "Home clutter", "ru": "Украшения дома"},
    },

    getItemCategory: function (cat, lang) {
        return this.itemsCategories[cat][lang]
    },

    containersCategories: {
        "vineshelf": {"en": "Vine Shelf", "ru": "Винная полка"},
        "corpse": {"en": "Corpse", "ru": "Труп"},
        "chest": {"en": "Chest", "ru": "Сундук"},
        "bookshelf": {"en": "Bookshelf", "ru": "Книжная полка"},
        "barrel": {"en": "Barrel", "ru": "Бочка"},
        "grave": {"en": "Grave", "ru": "Саркофаг"},
        "searchvineyard": {"en": "Vineyard", "ru": "Виноградник"}
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
        "containers": {"en": "Containers", "ru": "Контейнеры"},
        "items": {"en": "Items", "ru": "Предметы"}
    },

    getUi: function (ui, lang) {
        return this.ui[ui][lang]
    }
}