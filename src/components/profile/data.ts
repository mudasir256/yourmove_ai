export type DropDownOption = {
  title: string,
  value: string,
  paid?: boolean
}

export const supportedApps: DropDownOption[] = [
  { title: 'Bumble', value: 'Bumble' },
  { title: 'Hinge', value: 'Hinge' },
  { title: 'Tinder', value: 'Tinder' },
  { title: 'Coffee Meets Bagel', value: 'Coffee Meets Bagel' },
]

export const writingStyles: DropDownOption[] = [
  { title: 'Flirty', value: 'Flirty', paid: false },
  { title: 'Thoughtful', value: 'Thoughtful', paid: true },
  { title: 'Feisty', value: 'Feisty', paid: true },
]
