import { useEffect } from 'react'

const useCloseDialog = (ref, close, isOpen: boolean) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isOpen) {
        close()
      }
    }

    document.addEventListener('mouseup', handleClickOutside)
    return () => {
      document.removeEventListener('mouseup', handleClickOutside)
    }
  }, [ref, close, isOpen])
}

export default useCloseDialog
