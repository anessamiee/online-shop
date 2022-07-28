export const stringIncludes = (str1: string, str2: string): boolean => {
  if (str1.toLowerCase().includes(str2.toLowerCase())) {
    return true
  } else {
    return false
  }
}
