'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'

interface GifPickerProps {
  onGifSelect: (gifUrl: string) => void
  onClose: () => void
}

export const GifPicker: React.FC<GifPickerProps> = ({ onGifSelect, onClose }) => {
  const [gifs, setGifs] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY

  const fetchGifs = useCallback(async (query: string) => {
    if (!apiKey) return
    setLoading(true)
    try {
      const gf = new GiphyFetch(apiKey)
      const result = query ? await gf.search(query, { limit: 20 }) : await gf.trending({ limit: 20 })
      setGifs(result.data)
    } catch {} finally { setLoading(false) }
  }, [apiKey])

  useEffect(() => { fetchGifs('') }, [fetchGifs])

  useEffect(() => {
    const t = setTimeout(() => fetchGifs(search), 400)
    return () => clearTimeout(t)
  }, [search, fetchGifs])

  if (!apiKey) {
    return (
      <div style={s.container}>
        <div style={s.header}><span style={s.title}>GIFs</span><button style={s.closeBtn} onClick={onClose}>x</button></div>
        <p style={{ color: 'rgba(255,255,255,0.3)', textAlign: 'center' as any, padding: 20, fontSize: 13 }}>Set NEXT_PUBLIC_GIPHY_API_KEY</p>
      </div>
    )
  }

  return (
    <div style={s.container}>
      <div style={s.header}>
        <span style={s.title}>GIFs</span>
        <button style={s.closeBtn} onClick={onClose}>x</button>
      </div>
      <div style={s.searchWrap}>
        <input style={s.searchInput} placeholder="Buscar GIFs..." value={search} onChange={e => setSearch(e.target.value)} autoFocus />
      </div>
      <div style={s.grid}>
        {loading ? <p style={{ color: 'rgba(255,255,255,0.3)', width: '100%', textAlign: 'center' as any, padding: 16 }}>Cargando...</p> : (
          gifs.map(gif => {
            const url = gif.images?.fixed_height?.url || ''
            const preview = gif.images?.fixed_height_small?.url || url
            return (
              <div key={gif.id} style={s.gifItem} onClick={() => onGifSelect(url)}>
                <img src={preview} alt="" style={s.gifImg} loading="lazy" />
              </div>
            )
          })
        )}
      </div>
      <div style={s.footer}><span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>Powered by GIPHY</span></div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  container: {
    background: 'rgba(15,15,25,0.95)', backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px 16px 0 0',
    maxHeight: 320, display: 'flex', flexDirection: 'column', zIndex: 5,
  },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  title: { fontSize: 14, fontWeight: 600 },
  closeBtn: { background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: 16, cursor: 'pointer', padding: '2px 6px' },
  searchWrap: { padding: '8px 12px' },
  searchInput: { width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.04)', color: '#F8FAFC', fontSize: 13 },
  grid: { flex: 1, overflowY: 'auto' as any, display: 'flex', flexWrap: 'wrap' as any, gap: 4, padding: '4px 12px', alignContent: 'flex-start' },
  gifItem: { width: 'calc(33.33% - 3px)', aspectRatio: '1', borderRadius: 8, overflow: 'hidden', cursor: 'pointer', background: 'rgba(255,255,255,0.04)' },
  gifImg: { width: '100%', height: '100%', objectFit: 'cover' as any, display: 'block' },
  footer: { padding: '6px 12px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' as any },
}
