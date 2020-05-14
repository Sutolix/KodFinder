import React from 'react'

const Pagination = ({ profilesPerPage, totalProfiles, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalProfiles / profilesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav id='pagination'>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
