import React from 'react'
import Wallpaper from './Wallpaper'
import '../styles/HomeStyles.css'
import QuickSearches from './QuickSearches'

export default function Home() {
  return (
    <div className="container border shadow main-body">
        <Wallpaper/>
        <br/>
        <QuickSearches/>
    </div>
  )
}
