'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
    id: number;
    sender_type: 'visitor' | 'agent' | 'system';
    content: string;
    created_at: string;
    status?: 'sent' | 'delivered' | 'read';
}

import { Check, CheckCheck, Trash2 } from 'lucide-react';

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [visitorId, setVisitorId] = useState("");
    const [visitorName, setVisitorName] = useState("");
    const [isChatStarted, setIsChatStarted] = useState(false);
    const [conversationId, setConversationId] = useState<number | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Using defaults if env vars are missing to prevent crash
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const brandSlug = process.env.NEXT_PUBLIC_BRAND_SLUG || "alevate-spaces";

    useEffect(() => {
        // Init visitor ID
        let vid = localStorage.getItem('chat_visitor_id');
        if (!vid) {
            vid = Math.random().toString(36).substring(7);
            localStorage.setItem('chat_visitor_id', vid);
        }
        setVisitorId(vid);

        // Check if chat was previously started
        if (localStorage.getItem('chat_started') === 'true') {
            setIsChatStarted(true);
        }
    }, []);

    const fetchConversation = async (vName?: string) => {
        if (!visitorId) return;

        const nameToSend = vName || "Guest Visitor";

        try {
            const res = await fetch(`${apiUrl}/api/v1/chat/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    brand_slug: brandSlug,
                    visitor_id: visitorId,
                    visitor_name: nameToSend
                })
            });

            if (!res.ok) throw new Error("Init failed");

            const data = await res.json();
            const conversation = data.data || data;

            if (conversation.id) {
                setConversationId(conversation.id);
                setMessages(conversation.messages || []);
                setIsChatStarted(true);
                localStorage.setItem('chat_started', 'true');

                // If marks the start, also mark read immediately
                markMessagesRead(conversation.id);
            }
        } catch (err) {
            console.error("Setup error:", err);
        }
    };

    const markMessagesRead = async (convId: number) => {
        try {
            await fetch(`${apiUrl}/api/v1/chat/${convId}/mark_read/`, { method: 'POST' });
        } catch (e) { console.error("Mark read failed", e); }
    };

    useEffect(() => {
        // Only fetch if open, visitorId exists, and we think chat is started
        if (isOpen && visitorId && isChatStarted && !conversationId) {
            fetchConversation();
        }
    }, [isOpen, visitorId, isChatStarted]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const startChat = () => {
        if (!visitorName.trim()) return;
        fetchConversation(visitorName);
    };

    const leaveChat = () => {
        setIsChatStarted(false);
        setConversationId(null);
        setMessages([]);
        setVisitorName("");
        localStorage.removeItem('chat_started');
        // Optional: clear visitor_id too if you want a complete reset, 
        // but keeping visitor_id is usually better for analytics unless they explicitly want to be forgotten.
        // For "Leave Chat" in this context, we just reset the UI flow.
    };

    const sendMessage = async () => {
        if (!inputValue.trim() || !conversationId) return;

        const content = inputValue;
        setInputValue("");

        // Optimistic UI
        const tempMsg: Message = {
            id: Date.now(),
            sender_type: 'visitor',
            content: content,
            created_at: new Date().toISOString(),
            status: 'sent'
        };
        setMessages(prev => [...prev, tempMsg]);

        try {
            const res = await fetch(`${apiUrl}/api/v1/chat/${conversationId}/send_message/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: content,
                    sender_type: 'visitor'
                })
            });
            if (!res.ok) throw new Error("Failed to send");
            // The polling will handle the update, or we could update the tempMsg with real ID
        } catch (error) {
            console.error(error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log("Enter pressed");
            sendMessage();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // Sound effect (simple pop)
    const playNotificationSound = () => {
        try {
            const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3");
            audio.volume = 0.5;
            audio.play().catch(e => console.error("Audio play failed", e));
        } catch (e) {
            console.error("Audio setup failed", e);
        }
    };

    // Polling for new messages
    useEffect(() => {
        if (!conversationId || !isOpen) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/v1/chat/${conversationId}/`);
                if (!res.ok) return;
                const data = await res.json();
                const conversation = data.data || data;

                if (conversation.messages) {
                    setMessages(prev => {
                        const newMessages = conversation.messages;
                        if (newMessages.length > prev.length) {
                            const lastMsg = newMessages[newMessages.length - 1];
                            // If new message from agent (or anyone else) and we are not the sender
                            if (lastMsg.sender_type !== 'visitor' && document.hidden) {
                                playNotificationSound();
                                document.title = "(1) New Message - Alevate Spaces";
                            }
                        }
                        return newMessages;
                    });
                }
            } catch (error) {
                console.error("Polling error", error);
            }
        };

        const interval = setInterval(fetchMessages, 5000); // Poll every 5s

        // Reset title when visible
        const handleVisibilityChange = () => {
            if (!document.hidden) {
                document.title = "Alevate Spaces | House of Brands"; // Reset to original
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            clearInterval(interval);
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [conversationId, isOpen, apiUrl]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center justify-center rounded-full w-14 h-14 shadow-xl bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                >
                    <MessageCircle className="w-8 h-8 text-primary-foreground" />
                </button>
            )}

            {isOpen && (
                <div className="bg-card border border-border rounded-2xl shadow-2xl w-[350px] h-[500px] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="bg-primary p-4 flex justify-between items-center text-primary-foreground">
                        <div>
                            <h3 className="font-bold">Chat Support</h3>
                            <p className="text-xs opacity-80">We typically reply in minutes</p>
                        </div>
                        <div className="flex gap-2">
                            {isChatStarted && (
                                <button onClick={leaveChat} title="End Conversation" className="hover:bg-primary/20 text-primary-foreground p-1 rounded-full text-white">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                            <button onClick={() => setIsOpen(false)} className="hover:bg-primary/20 text-primary-foreground p-1 rounded-full text-white">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {!isChatStarted ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4 bg-background">
                            <div className="text-center space-y-2">
                                <h4 className="font-semibold text-lg">Welcome!</h4>
                                <p className="text-muted-foreground text-sm">Please enter your name to start chatting.</p>
                            </div>
                            <input
                                value={visitorName}
                                onChange={(e) => setVisitorName(e.target.value)}
                                placeholder="Your Name"
                                className="w-full px-4 py-2 rounded-md border border-input bg-transparent"
                            />
                            <button
                                onClick={startChat}
                                disabled={!visitorName.trim()}
                                className="w-full bg-primary text-primary-foreground py-2 rounded-md disabled:opacity-50 font-medium"
                            >
                                Start Chat
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Messages */}
                            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-background/50" ref={scrollRef}>
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            "max-w-[85%] p-3 text-sm rounded-xl relative group",
                                            msg.sender_type === 'visitor'
                                                ? "ml-auto bg-primary text-primary-foreground rounded-br-none"
                                                : "mr-auto bg-muted text-muted-foreground rounded-bl-none"
                                        )}
                                    >
                                        <div className="mr-4 break-words">{msg.content}</div>

                                        {/* Status Ticks for Visitor */}
                                        {msg.sender_type === 'visitor' && (
                                            <div className="absolute bottom-1 right-2 flex items-center">
                                                {msg.status === 'read' ? (
                                                    <CheckCheck className="w-3 h-3 text-blue-300" />
                                                ) : msg.status === 'delivered' ? (
                                                    <CheckCheck className="w-3 h-3 text-white/70" />
                                                ) : (
                                                    <Check className="w-3 h-3 text-white/70" />
                                                )}
                                            </div>
                                        )}

                                        <div className="text-[10px] opacity-70 mt-1 text-right w-full">
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input */}
                            <div className="p-3 border-t bg-background flex gap-2">
                                <input
                                    value={inputValue}
                                    onChange={handleChange}
                                    placeholder="Type a message..."
                                    onKeyDown={handleKeyDown}
                                    className="flex-1 px-3 py-2 text-sm rounded-md border border-input bg-transparent shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                />
                                <button onClick={sendMessage} disabled={!inputValue.trim()} className="bg-primary text-primary-foreground h-9 w-9 rounded-md flex items-center justify-center disabled:opacity-50">
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
