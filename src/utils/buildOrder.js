
import { pluck, omit } from 'ramda'
import { steak } from '../../data/sections'
import lower from './lower'

const getSelection = (model, slots, items) =>
  items.find(x => lower(x.name) === lower(slots[model.slots.delegateTrigger].value))

const getModifier = modifiers => name =>
  // NOTE remove 0 access
  modifiers[0].modifierOptions.find(x => x.name === name)

const mapModifiers = (selections, modifiers) =>
  selections.map(getModifier(modifiers))

const transformOptions = ({ modifierOptionCode: code, code: value  }) =>
  ({ code, value })

const buildOrder = model => (slots, items) => {
  const mainSelection = getSelection(model, slots, items)
  const { itemCode, modifiers, code } = mainSelection || {}

  console.log('SLOTS >>>>>', JSON.stringify(slots))
  console.log('ITEMS >>>>>', items)
  console.log('MAIN SELECTION >>>>>>', mainSelection)
  console.log('MODIFIERS >>>>>', modifiers)


  const modifierSelections = pluck('value', Object.values(omit([ model.slots.delegateTrigger ], slots)))
  console.dir(modifierSelections)
  const modifierOptions = mapModifiers(modifierSelections, modifiers)
  console.dir(modifierOptions)



  return {
    categoryItems: [
      {
        itemCode: steak,
        quantity: 1,
        options: modifierOptions.map(transformOptions)
      }
    ],
    checkout: {
      deliveryDateTime: new Date().toISOString(),
      isDeliveryDateTimeUtc: true,
    },
    justValidateDeliveryTime: false
  }
}

export default buildOrder
