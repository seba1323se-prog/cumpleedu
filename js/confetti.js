// Sistema de Confeti y Partículas de Celebración en Canvas

class ConfettiSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animating = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    triggerBurst(x = window.innerWidth / 2, y = window.innerHeight / 3, count = 80) {
        const colors = ['#ff85a1', '#70d6ff', '#fff07c', '#a8f0d9', '#ffd700', '#ff3366'];
        const mathSymbols = ['π', '∑', '∫', '∞', '+', '×', '√', '=', 'Q.E.D.'];

        for (let i = 0; i < count; i++) {
            const isSymbol = Math.random() < 0.3;
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.7) * 16,
                size: Math.random() * 10 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                gravity: 0.25,
                opacity: 1,
                decay: Math.random() * 0.015 + 0.005,
                isSymbol: isSymbol,
                symbol: mathSymbols[Math.floor(Math.random() * mathSymbols.length)]
            });
        }

        if (!this.animating) {
            this.animating = true;
            this.animate();
        }
    }

    triggerContinuousRain(durationMs = 5000) {
        const interval = setInterval(() => {
            this.triggerBurst(Math.random() * window.innerWidth, -20, 15);
        }, 150);

        setTimeout(() => clearInterval(interval), durationMs);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.rotation += p.rotationSpeed;
            p.opacity -= p.decay;

            if (p.opacity <= 0 || p.y > window.innerHeight + 50) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.save();
            this.ctx.globalAlpha = Math.max(0, p.opacity);
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);

            if (p.isSymbol) {
                this.ctx.font = `bold ${p.size * 1.5}px 'Fira Code', monospace`;
                this.ctx.fillStyle = p.color;
                this.ctx.textAlign = 'center';
                this.ctx.fillText(p.symbol, 0, 0);
            } else {
                this.ctx.fillStyle = p.color;
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            }

            this.ctx.restore();
        }

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.animating = false;
        }
    }
}

let confettiEngine;
document.addEventListener('DOMContentLoaded', () => {
    confettiEngine = new ConfettiSystem('confetti-canvas');
});
