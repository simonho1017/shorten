function generateShort() {
  const all = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split('')

  let short = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * Number(all.length))
    short += all[index]
  }
  return short

}

module.exports = generateShort