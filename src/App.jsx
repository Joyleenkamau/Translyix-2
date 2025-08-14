import React from 'react'
import LiveFeedProvider from './live/LiveFeedProvider.jsx'
import TransLytixApp from './components/TransLytixApp.jsx'

export default function App() {
  return (
    <LiveFeedProvider>
      <div className="min-h-screen bg-white p-4">
        <TransLytixApp />
      </div>
    </LiveFeedProvider>
  )
}