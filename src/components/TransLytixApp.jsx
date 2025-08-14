import React, { useContext, useState } from 'react'
import { LiveFeedContext } from '../live/LiveFeedProvider'
import Map, { Marker, Popup } from 'react-map-gl'

export default function TransLytixApp(){
  const { reports, alerts } = useContext(LiveFeedContext)
  const [selected, setSelected] = useState(null)
  const token = import.meta.env.VITE_MAPBOX_TOKEN || ''

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">TransLytix Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h2 className="font-bold mb-2">Road Reports Map</h2>
          {token ? (
            <Map
              initialViewState={{ latitude: 5.6037, longitude: -0.1870, zoom: 9 }}
              style={{ width: '100%', height: 420 }}
              mapStyle="mapbox://styles/mapbox/streets-v12"
              mapboxAccessToken={token}
            >
              {reports.map(r => (
                <Marker key={r.id} longitude={r.coords.lng} latitude={r.coords.lat} onClick={() => setSelected(r)} />
              ))}
              {selected && (
                <Popup
                  longitude={selected.coords.lng}
                  latitude={selected.coords.lat}
                  onClose={() => setSelected(null)}
                  anchor="bottom"
                >
                  <div className="text-sm">
                    <div><strong>ID:</strong> {selected.id}</div>
                    <div><strong>Region:</strong> {selected.region}</div>
                    <div><strong>Severity:</strong> {selected.severity}</div>
                    <div><strong>Time:</strong> {new Date(selected.timestamp).toLocaleString()}</div>
                  </div>
                </Popup>
              )}
            </Map>
          ) : (
            <div className="p-4 text-sm text-red-600">
              No Mapbox token found. Create a <code>.env</code> file with <code>VITE_MAPBOX_TOKEN=YOUR_TOKEN</code> and restart.
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="font-bold mb-2">Reports (live)</h2>
          <div style={{ maxHeight: 300, overflow: 'auto' }}>
            <ul className="space-y-2">
              {reports.map(r => (
                <li key={r.id} className="border rounded-lg p-2 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.region}</div>
                    <div className="text-xs opacity-70">{new Date(r.timestamp).toLocaleTimeString()}</div>
                  </div>
                  <span className="text-xs uppercase">{r.severity}</span>
                </li>
              ))}
            </ul>
          </div>

          <h3 className="font-bold mt-4 mb-2">Predictive Alerts</h3>
          <ul className="list-disc pl-5 space-y-1">
            {alerts.map(a => (
              <li key={a.id}><strong>{a.region}</strong>: {a.message}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}