import { useState, useEffect } from 'react'

const Pagination = () => {
  const totalPages: number = 10
  const imagesPerPage: number = 6

  const [activePage, setActivePage] = useState<number>(1)
  const [displayedPages, setDisplayedPages] = useState<number[]>([
    1, 2, 3, 4, 5,
  ])
  const [imagesByPage, setImagesByPage] = useState<{ [key: number]: string }>(
    {}
  )

  // Get random images for each page
  const generateRandomImages = () => {
    return `https://picsum.photos/200/300?random=${Math.floor(
      Math.random() * 100
    )}`
  }

  const generateImagesForPage = () => {
    const images = []
    for (let i = 0; i < imagesPerPage; i++) {
      images.push(generateRandomImages())
    }
    return images
  }

  const handlePageClicks = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setActivePage(pageNumber)
    }

    updateDisplayedPages(pageNumber)
    updateImagesForPage(pageNumber)
  }

  const updateDisplayedPages = (pageNumber: number) => {
    const halfDisplayedPages = Math.floor(5 / 2)
    let startPage = Math.max(1, pageNumber - halfDisplayedPages)

    const endPage = Math.min(totalPages, startPage + 4)

    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4)
    }

    setDisplayedPages(
      Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    )
  }

  const updateImagesForPage = (pageNumber: number) => {
    if (!imagesByPage[pageNumber]) {
      const images = generateImagesForPage()
      setImagesByPage((prevImagesByPage) => {
        return {
          ...prevImagesByPage,
          [pageNumber]: images,
        }
      })
    }
  }

  useEffect(() => {
    updateImagesForPage(1)
  }, [])

  const images = imagesByPage[activePage] || []

  return (
    <div className='container'>
      <div className='image-grid'>
        {images.map((imageUrl: string, index: number) => (
          <img
            key={index}
            src={imageUrl}
            className='imgs'
            alt={`Image ${index}`}
          />
        ))}
      </div>

      <nav className='pagination'>
        <button
          onClick={() => handlePageClicks(activePage - 1)}
          className='previous'
          disabled={activePage === 1}
        >
          Previous
        </button>
        {displayedPages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClicks(pageNumber)}
            className={`page-link ${
              activePage === pageNumber ? 'current' : ''
            }`}
            id='bottone5'
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageClicks(activePage + 1)}
          className='next'
          disabled={activePage === totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  )
}

export default Pagination
