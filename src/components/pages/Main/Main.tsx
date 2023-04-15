import React from 'react'
import FileTree from '../../molecules/FileTree/FileTree'
import FileNavigation from '../../organisms/FileNavigation/FileNavigation'
import { DataContextProvider } from '../../../contexts/DataContext'

export default function Main() {
  return (
    <DataContextProvider>
    <FileNavigation />
    </DataContextProvider>
  )
}
