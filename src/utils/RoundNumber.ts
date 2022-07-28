export const truncateNumber = (num: number, index: number) => {
  return (Math.floor(num * Math.pow(10, index)) / Math.pow(10, index)) 
}
