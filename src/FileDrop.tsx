import { useRef, useState, useEffect } from 'react'
import './FileDrop.css'

const FileDrop = ({
  onDrop = (_data: any) => {
    console.log(_data)
  },
}) => {
  const [drag, setDrag] = useState(false)
  const [filename, setFilename] = useState('')
  const dropRef: any = useRef()
  let dragCounter = 0

  const handleDrag = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDragIn = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    dragCounter++
    if (event.dataTransfer?.items && event.dataTransfer.items.length > 0)
      setDrag(true)
  }

  const handleDragOut = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    dragCounter--
    if (dragCounter === 0) setDrag(false)
  }

  const handleDrop = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setDrag(false)
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      onDrop(event.dataTransfer.files[0])
      setFilename(event.dataTransfer.files[0].name)
      event.dataTransfer.clearData()
      dragCounter = 0
    }
  }

  useEffect(() => {
    const div: any = dropRef.current
    div.addEventListener('dragenter', handleDragIn)
    div.addEventListener('dragleave', handleDragOut)
    div.addEventListener('dragover', handleDrag)
    div.addEventListener('drop', handleDrop)
    return () => {
      div.removeEventListener('dragenter', handleDragIn)
      div.removeEventListener('dragleave', handleDragOut)
      div.removeEventListener('dragover', handleDrag)
      div.removeEventListener('drop', handleDrop)
    }
  })

  return (
    <div
      ref={dropRef}
      className={
        drag ? 'filedrop drag' : filename ? 'filedrop ready' : 'filedrop'
      }
    >
      {filename && !drag ? <div>{filename}</div> : <div>Drop a file here!</div>}
    </div>
  )
}

export default FileDrop
