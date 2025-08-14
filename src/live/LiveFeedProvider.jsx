import React, { createContext, useEffect, useState } from 'react'
import { reports as initialReports, predictiveAlerts as initialAlerts } from '../data/dummyData'

export const LiveFeedContext = createContext()

export default function LiveFeedProvider({ children }){
  const [reports, setReports] = useState(initialReports)
  const [alerts, setAlerts] = useState(initialAlerts)

  useEffect(()=>{
    let ws
    let interval

    const startSimulator = () => {
      interval = setInterval(()=>{
        const id = 'r' + Math.floor(Math.random()*100000)
        const regions = ['Greater Accra','Central Region','Ashanti','Northern']
        const sev = ['low','medium','high']
        const region = regions[Math.floor(Math.random()*regions.length)]
        const newReport = {
          id,
          region,
          coords: { lat: 5 + Math.random()*2, lng: -2 + Math.random()*2 },
          severity: sev[Math.floor(Math.random()*sev.length)],
          timestamp: Date.now()
        }
        setReports(prev => [newReport, ...prev].slice(0, 100))
      }, 3000)
    }

    const connectWS = () => {
      try {
        const proto = location.protocol === 'https:' ? 'wss' : 'ws'
        const url = `${proto}://${location.hostname}:4050`
        ws = new WebSocket(url)
        ws.onopen = () => console.log('WS connected:', url)
        ws.onmessage = (msg) => {
          try {
            const e = JSON.parse(msg.data)
            if(e.type === 'report') setReports(prev => [e.payload, ...prev].slice(0, 100))
            if(e.type === 'alert') setAlerts(prev => [e.payload, ...prev].slice(0, 50))
          } catch(err){
            console.warn('WS parse error', err)
          }
        }
        ws.onerror = () => console.warn('WS error')
        ws.onclose = () => { console.log('WS closed; starting simulator'); startSimulator() }
      } catch {
        startSimulator()
      }
    }

    connectWS()
    return ()=> { ws && ws.close(); interval && clearInterval(interval) }
  }, [])

  return (
    <LiveFeedContext.Provider value={{ reports, alerts }}>
      {children}
    </LiveFeedContext.Provider>
  )
}