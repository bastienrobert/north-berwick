export function compareArrayValues(a: any[], b: any[]) {
  for (let i = 0; i < a.length; ++i) {
    if (!b.includes(a[i])) return false
  }
  return true
}
