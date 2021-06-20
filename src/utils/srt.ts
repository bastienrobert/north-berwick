export function srtToSeconds(time: string) {
  const t = time.split(':')

  try {
    let s = t[2].split(',')

    // Just in case a . is decimal seperator
    if (s.length === 1) {
      s = t[2].split('.')
    }

    return (
      parseFloat(t[0]) * 3600 +
      parseFloat(t[1]) * 60 +
      parseFloat(s[0]) +
      parseFloat(s[1]) / 1000
    )
  } catch (e) {
    return 0
  }
}
