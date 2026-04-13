// Sound effects using Web Audio API - no external files needed

let audioContext: AudioContext | null = null

function getContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext()
  }
  return audioContext
}

// Play a tone sequence
function playTone(frequencies: number[], durations: number[], volume = 0.15) {
  try {
    const ctx = getContext()
    let time = ctx.currentTime

    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = 'sine'
      osc.frequency.value = freq

      gain.gain.setValueAtTime(volume, time)
      gain.gain.exponentialRampToValueAtTime(0.001, time + durations[i])

      osc.start(time)
      osc.stop(time + durations[i])

      time += durations[i] * 0.8
    })
  } catch (e) {
    // Audio not available
  }
}

// Message sent - short "pop" upward
export function playSendSound() {
  playTone([800, 1200], [0.08, 0.06], 0.1)
}

// Message received - gentle "ding"
export function playReceiveSound() {
  playTone([600, 900], [0.1, 0.08], 0.08)
}

// Call ringing - repeating ring tone
let ringInterval: ReturnType<typeof setInterval> | null = null

export function playRingSound() {
  stopRingSound()
  const ring = () => {
    playTone([440, 523, 659], [0.15, 0.15, 0.2], 0.12)
  }
  ring()
  ringInterval = setInterval(ring, 2000)
}

export function stopRingSound() {
  if (ringInterval) {
    clearInterval(ringInterval)
    ringInterval = null
  }
}

// Call connected - confirmation sound
export function playCallConnectedSound() {
  playTone([523, 659, 784], [0.1, 0.1, 0.15], 0.1)
}

// Call ended - descending tone
export function playCallEndedSound() {
  playTone([523, 392, 330], [0.12, 0.12, 0.2], 0.1)
}

// Typing tick - very subtle
export function playTypingSound() {
  playTone([1000], [0.02], 0.03)
}
