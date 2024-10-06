 const createSlug = text => text
    .trim()
    .toLowerCase()
    .replace(/[ö]/g, 'o')
    .replace(/[ğ]/g, 'g')
    .replace(/[ş]/g, 's')
    .replace(/[ı]/g, 'i')
    .replace(/[ç]/g, 'c')
    .replace(/ /g, '-')
    .replace(/[ü]/g, 'u')
    .replace(/[^\w-]+/g, '')
    module.exports = { createSlug }