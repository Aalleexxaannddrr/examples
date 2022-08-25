import React, { useEffect } from 'react'

const useCloseModal = (
  ref,
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleClickOutside)
    }
  }, [ref, isOpen, setIsOpen])
}

export default useCloseModal
