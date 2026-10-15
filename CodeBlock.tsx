import { useState } from 'react';
import CopyButton from './CopyButton';
import { highlightPython } from '../utils/highlight';

declare global {
  interface Window {
    loadPyodide?: any;
  }
}

let pyodideInstance: any = null;
let pyodideLoading: Promise<any> | null = null;

async function getPyodide() {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) return pyodideLoading;
  pyodideLoading = (async () => {
    if (!window.loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
        s.onload = () => resolve();
        s.onerror = () => reject(new Error('Failed to load Pyodide'));
        document.head.appendChild(s);
      });
    }
    pyodideInstance = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' });
    return pyodideInstance;
  })();
  return pyodideLoading;
}

export default function CodeBlock({
  code,
  copyLabel,
  copiedLabel,
  runLabel,
  outputLabel,
}: {
  code: string;
  copyLabel: string;
  copiedLabel: string;
  runLabel: string;
  outputLabel: string;
}) {
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  async function runPython() {
    setShowOutput(true);
    setRunning(true);
    setOutput('');
    try {
      const py = await getPyodide();
      py.setStdout({
        batched: (text: string) => {
          setOutput((prev) => prev + text + '\n');
        },
      });
      py.setStderr({
        batched: (text: string) => {
          setOutput((prev) => prev + text + '\n');
        },
      });
      // Strip input() calls (would hang) — replace with empty stub
      const safe = code.replace(/input\s*\([^)]*\)\s*/g, '""').replace(/input\s*\(\s*\)/g, '""');
      await py.runPythonAsync(safe);
      if (!output) setOutput('(no output)');
    } catch (e: any) {
      setOutput((prev) => prev + `Error: ${e?.message || e}`);
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-700 dark:border-slate-800 shadow-lg shadow-slate-900/10">
      <div className="flex items-center justify-between bg-slate-900 dark:bg-slate-950 px-4 py-2 border-b border-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-3 text-xs text-slate-400 font-mono">python</span>
        </div>
        <div className="flex items-center gap-2">
          <CopyButton text={code} label={copyLabel} copiedLabel={copiedLabel} />
          <button
            onClick={runPython}
            disabled={running}
            className="text-xs px-2.5 py-1 rounded-md bg-green-600 hover:bg-green-500 text-white font-medium disabled:opacity-60 inline-flex items-center gap-1.5 transition"
          >
            {running ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>...</span>
              </>
            ) : (
              <>
                <span>▶</span>
                {runLabel}
              </>
            )}
          </button>
        </div>
      </div>

      <pre className="bg-slate-950 dark:bg-black text-slate-100 px-5 py-4 text-sm overflow-x-auto leading-relaxed font-mono">
        <code dangerouslySetInnerHTML={{ __html: highlightPython(code) }} />
      </pre>

      {showOutput && (
        <div className="bg-black border-t border-slate-700 px-5 py-3 text-sm font-mono">
          <div className="text-xs uppercase tracking-wide text-slate-500 mb-2">{outputLabel}</div>
          <pre className="text-green-400 whitespace-pre-wrap break-words">
            {output || (running ? '...' : '(no output)')}
          </pre>
        </div>
      )}
    </div>
  );
}
