import React, { useState } from 'react';
import {
  Code,
  Copy,
  Check,
  Download,
  FileCode,
  FileText,
  Terminal,
  Shield,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  BotConfig,
  generateMainPy,
  generateRequirementsTxt,
  generateProcfile,
  generateRenderYaml,
  generateEnv,
} from '../data/defaultCode';

interface CodeInspectorProps {
  config: BotConfig;
}

export const CodeInspector: React.FC<CodeInspectorProps> = ({ config }) => {
  const [activeFile, setActiveFile] = useState<'main' | 'req' | 'proc' | 'yaml' | 'env'>('main');
  const [copied, setCopied] = useState(false);

  const mainPyCode = generateMainPy(config);
  const reqCode = generateRequirementsTxt();
  const procCode = generateProcfile();
  const yamlCode = generateRenderYaml(config);
  const envCode = generateEnv(config);

  const getActiveCode = () => {
    switch (activeFile) {
      case 'main':
        return { name: 'main.py', code: mainPyCode, lang: 'python' };
      case 'req':
        return { name: 'requirements.txt', code: reqCode, lang: 'text' };
      case 'proc':
        return { name: 'Procfile', code: procCode, lang: 'dockerfile' };
      case 'yaml':
        return { name: 'render.yaml', code: yamlCode, lang: 'yaml' };
      case 'env':
        return { name: '.env.example', code: envCode, lang: 'bash' };
    }
  };

  const current = getActiveCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    handleDownload('main.py', mainPyCode);
    setTimeout(() => handleDownload('requirements.txt', reqCode), 200);
    setTimeout(() => handleDownload('Procfile', procCode), 400);
    setTimeout(() => handleDownload('.env', envCode), 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Code className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              Generated Backend Code for Render.com
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                Verified Python 3.10+
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Includes <code className="text-cyan-300 font-mono">python-telegram-bot==20.7</code> and <code className="text-cyan-300 font-mono">google-generativeai</code>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDownloadAll}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download All Files</span>
          </button>
        </div>
      </div>

      {/* Code Editor Frame */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* File Tabs & Actions */}
        <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-2 gap-2">
          {/* File Switcher Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto py-1">
            <button
              onClick={() => setActiveFile('main')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                activeFile === 'main'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-cyan-400" />
              <span>main.py</span>
            </button>
            <button
              onClick={() => setActiveFile('req')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                activeFile === 'req'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>requirements.txt</span>
            </button>
            <button
              onClick={() => setActiveFile('proc')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                activeFile === 'proc'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>Procfile</span>
            </button>
            <button
              onClick={() => setActiveFile('yaml')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                activeFile === 'yaml'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>render.yaml</span>
            </button>
            <button
              onClick={() => setActiveFile('env')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition ${
                activeFile === 'env'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              <span>.env.example</span>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={() => handleDownload(current.name, current.code)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Code Content Display */}
        <div className="relative">
          <pre className="p-5 font-mono text-xs sm:text-sm text-slate-300 overflow-x-auto leading-relaxed max-h-[580px] bg-slate-950">
            <code>{current.code}</code>
          </pre>
        </div>
      </div>

      {/* Feature Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-blue-400 font-semibold text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Gemini 1.5 Flash</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Non-blocking execution using asyncio executor, guaranteeing the bot stays responsive during large message bursts.
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm">
            <FileCode className="w-4 h-4" />
            <span>python-telegram-bot 20.7</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Modern asynchronous architecture with `ApplicationBuilder`, `CallbackQueryHandler`, and `WebAppInfo` buttons.
          </p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm">
            <Terminal className="w-4 h-4" />
            <span>Zero-Crash Health Check</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Includes built-in background HTTP server so Render Web Services pass 90-second health checks without dying.
          </p>
        </div>
      </div>
    </div>
  );
};
