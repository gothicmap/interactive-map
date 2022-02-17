export const flatCategories = (categories) => {
    const result = new Set()
    for (const [category, subCategories] of Object.entries(categories)) {
        result.add(category)
        for (const subCategory of subCategories) {
            result.add(subCategory)
        }
    }

    return Array.from(result)
}