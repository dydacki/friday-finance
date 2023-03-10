import { 
  Account, 
  AccountBrief,
  Category,
  CategoryBrief
} from '../../../backend/types'

function toAccountBrief(account: Account | undefined): AccountBrief | undefined {
  if (account) {
    return {
      id: account.id,
      name: account.name
    }
  }
}

function toCategoryBrief(category: Category | undefined): CategoryBrief | undefined {
  if (category) {
    return {
      id: category.id,
      name: category.name
    }
  }
}

export {
  toAccountBrief,
  toCategoryBrief
}