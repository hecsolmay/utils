const getInfoPage = ({ limit = 10, totalRows = 0, currentPage }) => {
  const finalLimit = limit > 0 ? limit : 1
  const totalPages = Math.ceil(totalRows / finalLimit)
  const page = currentPage > 0 && currentPage <= totalPages ? currentPage : 1

  return {
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1
  }
}

const limit = 10
const totalRows = 11
const pageFromReq = 10

const info = getInfoPage({ limit, totalRows, currentPage: pageFromReq })

console.log(info)
