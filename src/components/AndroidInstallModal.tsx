/**
 * Android App Installation & APK Packaging Modal
 */
import React, { useState } from 'react';
import {
  Smartphone,
  Download,
  CheckCircle2,
  X,
  Sparkles,
  WifiOff,
  Cpu,
  Layers,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { soundEngine } from '../game/SoundEngine';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { isInstallable, isInstalled, isAndroid, install } = usePWAInstall();
  const [activeTab, setActiveTab] = useState<'install' | 'apk' | 'features'>('install');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    soundEngine.playClick();
    if (isInstallable) {
      await install();
    }
  };

  const bubblewrapCode = `# 1. Install Google Bubblewrap CLI
npm install -g @bubblewrap/cli

# 2. Initialize Android Project from PWA Manifest
bubblewrap init --manifest="${window.location.origin}/manifest.webmanifest"

# 3. Build signed Android APK / AAB
bubblewrap build`;

  const copyToClipboard = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(bubblewrapCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-[#0e1726] to-[#060913] p-6 shadow-2xl text-slate-100 font-sans">
        {/* Glow corner accent */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 hover:bg-slate-700/60 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Icon */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-lg shadow-cyan-500/20 bg-slate-900 shrink-0">
            <img
              src="/pwa-192x192.png"
              alt="Nexus Grid 3D App Icon"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-cyber font-bold tracking-wider bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
                ANDROID READY
              </span>
              {isInstalled && (
                <span className="flex items-center gap-1 text-[10px] text-cyan-400 font-cyber">
                  <CheckCircle2 className="w-3 h-3" /> INSTALLED
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold font-cyber text-white tracking-wide mt-1">
              Nexus Grid 3D Android
            </h2>
            <p className="text-xs text-slate-400">
              Tactical Tower Defense • Standalone WebAPK / TWA
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 mb-5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-cyber">
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('install');
            }}
            className={`flex-1 py-2 px-2.5 rounded-lg font-medium transition flex items-center justify-center gap-1.5 ${
              activeTab === 'install'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Install on Android</span>
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('apk');
            }}
            className={`flex-1 py-2 px-2.5 rounded-lg font-medium transition flex items-center justify-center gap-1.5 ${
              activeTab === 'apk'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Build APK (.apk)</span>
          </button>
          <button
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('features');
            }}
            className={`flex-1 py-2 px-2.5 rounded-lg font-medium transition flex items-center justify-center gap-1.5 ${
              activeTab === 'features'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Features</span>
          </button>
        </div>

        {/* Tab 1: Install on Android (PWA / WebAPK) */}
        {activeTab === 'install' && (
          <div className="space-y-4 text-sm animate-in fade-in duration-150">
            {isInstalled ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-emerald-300">
                    App is already installed!
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    Nexus Grid 3D is running in standalone mode on your Android device. You can launch it anytime from your Home Screen or App Drawer.
                  </div>
                </div>
              </div>
            ) : isInstallable ? (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tap below to add Nexus Grid 3D directly to your Android device. It installs as an app with its own icon, fullscreen canvas, and offline caching.
                </p>
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-4 rounded-xl font-cyber font-bold text-sm tracking-wide bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition active:scale-[0.98]"
                >
                  <Download className="w-4 h-4" />
                  <span>INSTALL ANDROID APP (1-TAP)</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-300">
                <p className="leading-relaxed">
                  You can install this app right now on your Android phone or tablet:
                </p>
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      1
                    </span>
                    <span>
                      Open this game in <strong>Google Chrome</strong> or <strong>Samsung Internet</strong> on Android.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      2
                    </span>
                    <span>
                      Tap the <strong>three dots menu (⋮)</strong> at the top right of the browser.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      3
                    </span>
                    <span>
                      Select <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      4
                    </span>
                    <span>
                      The app creates an icon in your Android App Drawer that opens fullscreen without the browser bar!
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Android Device Status */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-cyber">Platform</div>
                  <div className="font-semibold text-slate-200">{isAndroid ? 'Android Detected' : 'Web / Mobile'}</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-2">
                <WifiOff className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-cyber">Offline Ready</div>
                  <div className="font-semibold text-slate-200">Precached (SW)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Build APK (.apk) via Bubblewrap TWA */}
        {activeTab === 'apk' && (
          <div className="space-y-3.5 text-xs animate-in fade-in duration-150">
            <p className="text-slate-300 leading-relaxed">
              To build a standalone signed <strong>.apk</strong> or <strong>.aab</strong> package for Google Play Store or sideloading, use Google&apos;s official <strong>Bubblewrap CLI</strong> with this app&apos;s Web App Manifest:
            </p>

            <div className="relative rounded-xl bg-slate-950 p-3 border border-slate-800 font-mono text-[11px] text-cyan-300">
              <button
                onClick={copyToClipboard}
                className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Copy commands"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <pre className="overflow-x-auto pr-8 whitespace-pre leading-relaxed">
                {bubblewrapCode}
              </pre>
            </div>

            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Google Trusted Web Activity (TWA) Spec</span>
              </div>
              <p className="text-[11px] text-purple-300/80">
                Bubblewrap wraps the PWA into a native Android Java/Kotlin project that generates standard APK files compatible with all Android 5.0+ devices.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Mobile & Android Features */}
        {activeTab === 'features' && (
          <div className="space-y-2.5 text-xs animate-in fade-in duration-150">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
              <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-200">Hardware Capped DPR & Battery Saver</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Mobile devices automatically cap resolution scale to 1.5x with throttled particle bursts to ensure steady 60fps without overheating.
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
              <Smartphone className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-200">Multi-Touch Gestures & Haptics</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  Natural 2-finger pinch zoom, 1-finger camera drag, tap placement, and Android haptic feedback vibration (<code className="text-cyan-400 font-mono">navigator.vibrate</code>).
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
              <WifiOff className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-200">Full Offline Game Simulation</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  All 3D meshes, audio synthesizers, and A* pathfinding are completely client-side. The Service Worker caches all assets for offline play on planes or subways.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Nexus Grid 3D v1.2</span>
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
