// Módulo de Audio usando Web Audio API (Sin archivos externos de audio)

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.muted = false;
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    playNote(freq, duration, type = 'sine', delay = 0) {
        if (this.muted) return;
        this.init();

        setTimeout(() => {
            try {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

                gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch (e) {
                console.error("Audio error:", e);
            }
        }, delay * 1000);
    }

    // Efecto de respuesta correcta (Acorde victorioso)
    playCorrect() {
        this.playNote(523.25, 0.15, 'triangle', 0);     // C5
        this.playNote(659.25, 0.15, 'triangle', 0.1);   // E5
        this.playNote(783.99, 0.3, 'triangle', 0.2);    // G5
        this.playNote(1046.50, 0.5, 'sine', 0.35);     // C6
    }

    // Efecto de respuesta incorrecta (Beep suave)
    playWrong() {
        this.playNote(220, 0.2, 'sawtooth', 0);
        this.playNote(196, 0.3, 'sawtooth', 0.15);
    }

    // Efecto de pista
    playHint() {
        this.playNote(440, 0.1, 'sine', 0);
        this.playNote(880, 0.2, 'sine', 0.1);
    }

    // Melodía de Feliz Cumpleaños (Sintetizada)
    playBirthdaySong() {
        if (this.muted) return;
        const notes = [
            { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.2 }, { f: 293.66, d: 0.5 }, { f: 261.63, d: 0.5 }, { f: 349.23, d: 0.5 }, { f: 329.63, d: 0.8 },
            { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.2 }, { f: 293.66, d: 0.5 }, { f: 261.63, d: 0.5 }, { f: 392.00, d: 0.5 }, { f: 349.23, d: 0.8 },
            { f: 261.63, d: 0.3 }, { f: 261.63, d: 0.2 }, { f: 523.25, d: 0.5 }, { f: 440.00, d: 0.5 }, { f: 349.23, d: 0.5 }, { f: 329.63, d: 0.5 }, { f: 293.66, d: 0.6 },
            { f: 466.16, d: 0.3 }, { f: 466.16, d: 0.2 }, { f: 440.00, d: 0.5 }, { f: 349.23, d: 0.5 }, { f: 392.00, d: 0.5 }, { f: 349.23, d: 1.0 }
        ];

        let currentTime = 0;
        notes.forEach(n => {
            this.playNote(n.f, n.d, 'triangle', currentTime);
            currentTime += n.d + 0.08;
        });
    }
}

const sounds = new SoundEngine();
