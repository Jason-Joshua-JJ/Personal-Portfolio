import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, Maximize2, Minimize2 } from 'lucide-react';

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
    onTogglePartyMode: () => void;
}

interface CommandHistory {
    command: string;
    output: React.ReactNode;
}

export default function Terminal({ isOpen, onClose, onTogglePartyMode }: TerminalProps) {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandHistory[]>([
        { command: 'help', output: 'Type "help" to see available commands.' }
    ]);
    const [isMaximized, setIsMaximized] = useState(false);
    const [textColor, setTextColor] = useState('text-emerald-400');
    const [showMatrix, setShowMatrix] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, isOpen]);

    // Focus input on open
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleCommand = (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();
        const args = trimmedCmd.split(' ');
        const command = args[0];
        let output: React.ReactNode = '';

        switch (command) {
            case 'help':
                output = (
                    <div className={`space-y-1 ${textColor}`}>
                        <p>Available commands:</p>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <span>whoami</span><span>- About Jason</span>
                            <span>skills</span><span>- Technical skills</span>
                            <span>projects</span><span>- Featured projects</span>
                            <span>contact</span><span>- Contact info</span>
                            <span>party</span><span>- Toggle Party Mode 🎉</span>
                            <span>matrix</span><span>- Toggle Matrix Rain 🌧️</span>
                            <span>theme</span><span>- Change color (green/blue/pink/amber)</span>
                            <span>repo</span><span>- Open GitHub repository</span>
                            <span>sudo</span><span>- Run as superuser</span>
                            <span>clear</span><span>- Clear terminal</span>
                            <span>exit</span><span>- Close terminal</span>
                        </div>
                    </div>
                );
                break;
            case 'whoami':
                output = (
                    <div className="text-blue-300">
                        <p>Jason Joshua</p>
                        <p>Full-Stack Developer & Data Engineer.</p>
                        <p>Passionate about building scalable systems and interactive 3D experiences.</p>
                    </div>
                );
                break;
            case 'skills':
                output = (
                    <div className="text-yellow-300">
                        <p>Frontend: React, Three.js, Tailwind, TypeScript</p>
                        <p>Backend: Node.js, Python, SQL</p>
                        <p>Cloud/Data: AWS, Snowflake, PySpark</p>
                        <p>Creative: Blender, 3D Modeling</p>
                    </div>
                );
                break;
            case 'projects':
                output = (
                    <div className="space-y-1 text-purple-300">
                        <p>Check out the Projects section for details!</p>
                        <ul className="list-disc pl-4">
                            <li>Stellar Portfolio (This site)</li>
                            <li>Data Pipeline Automation</li>
                            <li>3D Product Configurator</li>
                        </ul>
                    </div>
                );
                break;
            case 'contact':
                output = (
                    <div className="text-pink-300">
                        <p>Email: jasonjoshua4444@gmail.com</p>
                        <p>LinkedIn: linkedin.com/in/jason-joshua-w</p>
                        <p>GitHub: github.com/Jason-Joshua-JJ</p>
                    </div>
                );
                break;
            case 'party':
                onTogglePartyMode();
                output = <span className="text-purple-400">🎉 Party Mode Toggled! Check the background! 🎉</span>;
                break;
            case 'matrix':
                setShowMatrix(!showMatrix);
                output = <span className="text-green-500">{showMatrix ? "Deactivating Matrix..." : "Wake up, Neo..."}</span>;
                break;
            case 'theme':
                const color = args[1];
                if (color === 'blue') setTextColor('text-blue-400');
                else if (color === 'pink') setTextColor('text-pink-400');
                else if (color === 'amber') setTextColor('text-amber-400');
                else if (color === 'green') setTextColor('text-emerald-400');
                else output = <span className="text-red-400">Usage: theme [green|blue|pink|amber]</span>;
                if (!output) output = <span className={textColor}>Theme changed to {color}</span>;
                break;
            case 'repo':
                window.open('https://github.com/Jason-Joshua-JJ/jason-s-stellar-portfolio', '_blank');
                output = <span className="text-gray-400">Opening GitHub repository...</span>;
                break;
            case 'sudo':
                output = <span className="text-red-500 font-bold">Permission denied: You are not Jason. Nice try though! 🔒</span>;
                break;
            case 'clear':
                setHistory([]);
                return;
            case 'exit':
                onClose();
                return;
            case '':
                return;
            default:
                output = <span className="text-red-400">Command not found: {cmd}. Type "help" for list.</span>;
        }

        setHistory(prev => [...prev, { command: cmd, output }]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            handleCommand(input);
            setInput('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className={`bg-[#0c0c0c] border border-white/10 rounded-lg shadow-2xl overflow-hidden flex flex-col font-mono text-sm md:text-base w-full relative ${isMaximized ? 'h-[90vh] max-w-6xl' : 'h-[600px] max-w-3xl'
                            }`}
                    >
                        {/* Matrix Rain Effect */}
                        {showMatrix && (
                            <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
                                <MatrixRain />
                            </div>
                        )}

                        {/* Title Bar */}
                        <div className="bg-[#1a1a1a] px-4 py-2 flex items-center justify-between border-b border-white/5 select-none z-10 relative">
                            <div className="flex items-center gap-2 text-gray-400">
                                <TerminalIcon size={16} />
                                <span className="font-semibold">jason@portfolio:~</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsMaximized(!isMaximized)}
                                    className="p-1 hover:bg-white/10 rounded text-gray-400 hover:text-white transition-colors"
                                >
                                    {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-red-500/20 rounded text-gray-400 hover:text-red-400 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Content */}
                        <div
                            className="flex-1 p-4 overflow-y-auto custom-scrollbar z-10 relative"
                            onClick={() => inputRef.current?.focus()}
                        >
                            <div className="space-y-2">
                                <div className="text-gray-500 mb-4">
                                    Welcome to Jason's Portfolio Terminal v1.0.0<br />
                                    Type <span className={textColor}>help</span> to see available commands.
                                </div>

                                {history.map((entry, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <span className={textColor.replace('text-', 'text-').replace('-400', '-500')}>➜</span>
                                            <span className="text-blue-400">~</span>
                                            <span>{entry.command}</span>
                                        </div>
                                        <div className="ml-6 text-gray-300">
                                            {entry.output}
                                        </div>
                                    </div>
                                ))}

                                <div ref={bottomRef} />
                            </div>
                        </div>

                        {/* Input Area */}
                        <form onSubmit={handleSubmit} className="p-4 bg-[#0c0c0c] border-t border-white/5 z-10 relative">
                            <div className="flex items-center gap-2">
                                <span className={textColor.replace('text-', 'text-').replace('-400', '-500')}>➜</span>
                                <span className="text-blue-400">~</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className={`flex-1 bg-transparent border-none outline-none ${textColor} placeholder-gray-600 font-mono`}
                                    placeholder="Type a command..."
                                    autoComplete="off"
                                    autoFocus
                                />
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// Simple Matrix Rain Component
function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
        canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;

        const columns = Math.floor(canvas.width / 20);
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = '15px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = String.fromCharCode(Math.floor(Math.random() * 128));
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
}
