// Content moderation - bad-words + custom Spanish/AR dictionary

const spanishWords = [
  'puta','puto','putita','putazo','hijodeputa','hijadeputa',
  'mierda','mierdero','mierdoso',
  'culo','culiao','culiado',
  'verga','vergudo',
  'pendejo','pendeja',
  'cabron','cabrona',
  'joder','jodido','jodete',
  'chingar','chingada','chingado',
  'huevon','huevona','guevon',
  'pelotudo','pelotuda','pelotudes',
  'boludo','boluda','boludez',
  'concha','conchudo','conchuda','conchatumadre',
  'carajo',
  'cagon','cagona','cagado',
  'forro','forra',
  'garca','garcas',
  'trolo','trola','trolazo',
  'maricon','maricona','marica','mariquita',
  'pija','pijudo',
  'pete','petero','petera',
  'sorete','soretes',
  'mogolico','mogolica',
  'tarado','tarada',
  'idiota','imbecil','estupido','estupida',
  'retrasado','retrasada','subnormal',
  'ortiva','ortiba',
  'gil','gilada','gilun',
  'tortillera','machona',
  'negro de mierda','negra de mierda',
  'coño','porno','porn',
]

// Build regex from word list for fast matching
const allWords = [...spanishWords]
const wordRegexes = allWords.map(w => new RegExp(`\\b${w.replace(/\s+/g, '\\s+')}\\b`, 'gi'))

function isProfane(text: string): boolean {
  const lower = text.toLowerCase()
  return wordRegexes.some(r => r.test(lower))
}

function cleanText(text: string): string {
  let result = text
  for (const word of allWords) {
    const regex = new RegExp(`\\b${word.replace(/\s+/g, '\\s+')}\\b`, 'gi')
    result = result.replace(regex, (match) => '*'.repeat(match.length))
  }
  return result
}

// Also try to use bad-words for English (lazy loaded)
let badWordsFilter: any = null
async function loadBadWords() {
  if (badWordsFilter) return badWordsFilter
  try {
    const BadWords = (await import('bad-words')).default || (await import('bad-words'))
    badWordsFilter = typeof BadWords === 'function' ? new BadWords() : new (BadWords as any).Filter()
  } catch {
    try {
      const mod = await import('bad-words')
      const Ctor = (mod as any).Filter || (mod as any).default
      if (Ctor) badWordsFilter = new Ctor()
    } catch { /* bad-words not available, use local only */ }
  }
  return badWordsFilter
}
// Preload
loadBadWords()

export interface ModerationResult {
  allowed: boolean
  reason?: string
  filtered?: string
  severity?: 'low' | 'medium' | 'high'
}

export function moderateMessage(text: string): ModerationResult {
  if (!text?.trim()) return { allowed: false, reason: 'Mensaje vacío' }
  if (text.length > 5000) return { allowed: false, reason: 'Mensaje muy largo', severity: 'low' }

  const urlCount = (text.match(/https?:\/\//g) || []).length
  if (urlCount > 3) return { allowed: false, reason: 'Demasiados enlaces', severity: 'medium' }

  // Check Spanish words
  if (isProfane(text)) {
    return { allowed: true, filtered: cleanText(text), reason: 'Algunas palabras fueron censuradas', severity: 'low' }
  }

  // Check English via bad-words (if loaded)
  if (badWordsFilter) {
    try {
      if (badWordsFilter.isProfane(text)) {
        return { allowed: true, filtered: badWordsFilter.clean(text), reason: 'Algunas palabras fueron censuradas', severity: 'low' }
      }
    } catch {}
  }

  // Excessive caps
  const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length
  if (text.length > 10 && capsRatio > 0.7) {
    return { allowed: true, filtered: text.toLowerCase(), reason: 'Mayúsculas reducidas', severity: 'low' }
  }

  return { allowed: true }
}

const messageTimes: number[] = []
export function checkRateLimit(): ModerationResult {
  const now = Date.now()
  while (messageTimes.length > 0 && messageTimes[0] < now - 10000) messageTimes.shift()
  if (messageTimes.length >= 8) return { allowed: false, reason: 'Enviando muy rápido. Esperá un momento.', severity: 'medium' }
  messageTimes.push(now)
  return { allowed: true }
}

export function moderateAndFilter(text: string): ModerationResult {
  const rate = checkRateLimit()
  if (!rate.allowed) return rate
  return moderateMessage(text)
}
