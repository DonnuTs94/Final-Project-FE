const dateFormatter = (date) => {
  return Intl.DateTimeFormat("id-ID").format(new Date(date))
}

const currFormatter = (amount) => {
  return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
}

export { dateFormatter, currFormatter }
