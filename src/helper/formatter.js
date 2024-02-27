const dateFormatter = (date) => {
  return Intl.DateTimeFormat("id-ID").format(new Date(date))
}

const currFormatter = (amount) => {
  return Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount)
}

const convertPriceWithCommas = (price) => {
  if (typeof price === "number" && !isNaN(price)) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  }
  return ""
}

export { dateFormatter, currFormatter, convertPriceWithCommas }
