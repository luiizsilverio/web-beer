const strzero = (valor, minSize: number): string => {
  let stnum = valor.toString().trim()
  if (stnum.length < minSize) {
    stnum = stnum.padStart(minSize, "0")
  }
  return stnum
}

export default strzero