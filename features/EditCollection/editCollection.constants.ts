export const nameValidations = {
  required: 'Please enter a name',
}

export const rarityValidations = {
  required: 'Please enter a rarity',
  pattern: {
    value: /^[0-9]$|^[1-9][0-9]$|^(100)$/,
    message: 'Rarity must be a number between 1 and 100',
  },
}
