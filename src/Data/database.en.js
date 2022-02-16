export const itemsCategories = [
  "amulet",
  "armor",
  "belt",
  "crafting material",
  "food",
  "home clutter",
  "key",
  "melee weapon",
  "misc",
  "package",
  "plant",
  "potion",
  "range weapon",
  "recipe",
  "ring",
  "rune",
  "scroll",
  "trophy",
  "unknown?",
  "writing"
];
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
export const mapContainerCategories = [
  "barrel",
  "bookshelf",
  "chest",
  "corpse",
  "grave",
  "searchvineyard",
  "vineshelf"
];
export const mapItemsCategories = [
  "amulet",
  "armor",
  "belt",
  "crafting material",
  "food",
  "key",
  "melee weapon",
  "misc",
  "package",
  "plant",
  "potion",
  "range weapon",
  "recipe",
  "ring",
  "rune",
  "scroll",
  "trophy",
  "writing"
];
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
