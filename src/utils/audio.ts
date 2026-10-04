/**
 * Web Audio API synthesizer for GARAGE 73 PUB sound effects
 * Provides ignition roar, neon hum, laser scan, and electrical tap sounds
 */

class SoundController {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Engine ignition & starter sound
  playIgnition() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // 1. Starter motor crank bursts (ch-ch-ch)
      for (let i = 0; i < 3; i++) {
        const crankOsc = this.ctx.createOscillator();
        const crankGain = this.ctx.createGain();
        crankOsc.type = 'sawtooth';
        const t = now + i * 0.12;
        crankOsc.frequency.setValueAtTime(65, t);
        crankOsc.frequency.exponentialRampToValueAtTime(110, t + 0.08);

        crankGain.gain.setValueAtTime(0.18, t);
        crankGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);

        crankOsc.connect(crankGain);
        crankGain.connect(this.ctx.destination);

        crankOsc.start(t);
        crankOsc.stop(t + 0.1);
      }

      // 2. Engine V8 Roar rev up
      const revTime = now + 0.4;
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, revTime);
      filter.frequency.exponentialRampToValueAtTime(1200, revTime + 0.3);
      filter.frequency.exponentialRampToValueAtTime(450, revTime + 0.9);

      osc.type = 'sawtooth';
      osc2.type = 'triangle';

      osc.frequency.setValueAtTime(45, revTime);
      osc.frequency.exponentialRampToValueAtTime(160, revTime + 0.28);
      osc.frequency.exponentialRampToValueAtTime(70, revTime + 0.85);

      osc2.frequency.setValueAtTime(90, revTime);
      osc2.frequency.exponentialRampToValueAtTime(320, revTime + 0.28);
      osc2.frequency.exponentialRampToValueAtTime(140, revTime + 0.85);

      gain.gain.setValueAtTime(0.001, revTime);
      gain.gain.linearRampToValueAtTime(0.28, revTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, revTime + 0.9);

      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(revTime);
      osc2.start(revTime);
      osc.stop(revTime + 0.95);
      osc2.stop(revTime + 0.95);
    } catch {
      // Audio context might be restricted before gesture
    }
  }

  // Laser beam scan effect (for white laser outline)
  playLaser() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(2800, now + 0.18);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.35);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch {
      // Ignore
    }
  }

  // Neon electric click / flicker
  playNeonFlicker() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.setValueAtTime(240, now + 0.03);
      osc.frequency.setValueAtTime(90, now + 0.06);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Ignore
    }
  }

  // Navigation tap sound
  playTap() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.06);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore
    }
  }
}

export const sound = new SoundController();

// Haptic feedback trigger with fallback
export function triggerHaptic(type: 'engine' | 'neon' | 'tap' = 'neon') {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'engine') {
        navigator.vibrate([40, 30, 80, 40, 150]);
      } else if (type === 'neon') {
        navigator.vibrate([25, 20, 45]);
      } else {
        navigator.vibrate(20);
      }
    } catch {
      // Vibrator might be restricted by browser policy
    }
  }
}
