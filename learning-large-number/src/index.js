export default function add(aa, bb) {
  const a = String(Number.parseInt(aa) || '0')
  const b = String(Number.parseInt(bb) || '0')

  let i = a.length - 1
  let j = b.length -1
  let carry = 0
  let ret = ''
  while (i >= 0 || j >= 0) {
    let x = 0
    let y = 0
    let sum
    if (i >= 0) {
      x = Number(a[i])
      i--
    }
    if (j >= 0) {
      y = Number(b[j])
      j--
    }
    sum = x + y + carry
    if (sum >= 10) {
      carry = 1
      sum -= 10
    } else {
      carry = 0
    }
    ret = sum + ret
  }
  if (carry) {
    ret = carry + ret
  }
  return ret
}

// and('9999', '222')
// 