
const slotsFilled = model => slots => {
  const { required } = model
  return required.every(name => !!slots[name].value)
}

const slotFilled = prop => slots =>
  !!slots[prop].value

export {
  slotsFilled,
  slotFilled
}
