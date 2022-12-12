const colorBorder = (num) => {
  if (num < 3) {
    return <div className="movie__average movie__average-three">{num}</div>
  }
  if (num >= 3 && num < 5) {
    return <div className="movie__average movie__average-five">{num}</div>
  }
  if (num >= 5 && num < 7) {
    return <div className="movie__average movie__average-seven">{num}</div>
  }

  return <div className="movie__average movie__average-high">{num}</div>
}

const getGenre = (num, arr) => {
  const theRightGenre = arr.filter((item) => item.id === num)
  if (!theRightGenre[0]) {
    return 'All'
  }
  return theRightGenre[0].name
}

const convertDate = (date) => {
  if (!date) return 'unknown'
  const object = new Date(date)
  const month = object.toLocaleString('en', { month: 'long' })
  return `${month} ${object.getDate()} ${object.getFullYear()}`
}

const shortenOverview = (overview, maximumLength = 120) => {
  const trimmedString = overview.substr(0, maximumLength)
  return `${trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')))} ...`
}

const onRateSetStars = (num, movie) => {
  localStorage.setItem(movie.id, num)
}

const checkArray = (array, id, number) => {
  // if it is already there, change its value to number
  const newArr = array.map((item) => {
    if (item.id === id) {
      // eslint-disable-next-line no-param-reassign
      item.number = number
      return item
    }
    return item
  })
  // if not there, add it to the array
  const filteredArr = newArr.filter((item) => item.id === id)
  const isItNewItem = filteredArr.length === 0
  if (isItNewItem) {
    const brandNewArray = [...array, { id, number }]
    return brandNewArray
  }

  return newArr
}

export { colorBorder, getGenre, convertDate, shortenOverview, onRateSetStars, checkArray }
