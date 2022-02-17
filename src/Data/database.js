export const itemsCategories = {
  "armor": [],
  "magic": [
    "ring",
    "amulet",
    "belt"
  ],
  "food": [],
  "crafting material": [],
  "misc": [
    "ring",
    "amulet"
  ],
  "potions": [],
  "rune": [],
  "scroll": [],
  "melee weapon": [
    "2h",
    "breakable",
    "sword",
    "1h",
    "axe"
  ],
  "ammunition": [
    "bow",
    "crossbow"
  ],
  "range weapon": [
    "bow",
    "crossbow"
  ],
  "trophy": [],
  "key": [],
  "plant": [],
  "package": [],
  "docs": [],
  "recipe": [],
  "home clutter": [],
  "keys": [],
  "important": []
};
export const postProcessItems = (items) => {
    for(const [, item] of Object.entries(items)) {
        if(item.hasOwnProperty("recipe")) {
            item.recipe = items[item.recipe]
        }
        if(item.hasOwnProperty("requires")) {
            item.requires.forEach((require) => {
                require.item = items[require.item]
            })
        }
    }
};
export const mapPinsCategories = {
  "container": [
    "chest",
    "corpse",
    "searchvineyard",
    "barrel",
    "bookshelf",
    "grave",
    "vineshelf"
  ],
  "plant": [],
  "potions": [],
  "food": [],
  "scroll": [],
  "misc": [
    "ring",
    "amulet"
  ],
  "magic": [
    "ring",
    "amulet",
    "belt"
  ],
  "key": [],
  "ammunition": [
    "bow",
    "crossbow"
  ],
  "melee weapon": [
    "2h",
    "breakable",
    "sword",
    "1h",
    "axe"
  ],
  "rune": [],
  "package": [],
  "docs": [],
  "trophy": [],
  "crafting material": [],
  "range weapon": [
    "bow",
    "crossbow"
  ],
  "recipe": [],
  "armor": [],
  "important": []
};
export const postProcessMapPins = (mapPins, items) => {
    for(const pin of mapPins) {
        if(pin.type === "container") {
            pin.data.contains.forEach((contain) => {
                contain.item = items[contain.item]
            })
        }
        if(pin.type === "item") {
            pin.data = items[pin.data]
        }
    }
};
