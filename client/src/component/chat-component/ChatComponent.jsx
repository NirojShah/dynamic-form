import { useState } from "react";

import Button from "../common/Button";
import Input from "../common/Input";

const ChatComponent = ({ onMessageSent, formId }) => {
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage || isSending) {
            return;
        }

        try {
            setIsSending(true);

            if (onMessageSent) {
                await onMessageSent(trimmedMessage, formId);
            }

            setMessage("");
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsSending(false);
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
        setIsMinimized(false);
    };

    const handleMinimize = () => {
        setIsMinimized(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setIsMinimized(false);
    };

    /*
     * Closed state
     */
    if (!isOpen) {
        return (
            <button
                type="button"
                onClick={handleOpen}
                className=" fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:opacity-90
                "
                aria-label="Open chat"
            >
                💬
            </button>
        );
    }

    /*
     * Minimized state
     * 300px x 50px
     */
    if (isMinimized) {
        return (
            <div
                className=" fixed bottom-5 right-5 z-50 flex h-[50px] w-[300px] items-center justify-between rounded-lg bg-white px-4 shadow-xl ring-1 ring-gray-200
                "
            >
                <div className="flex items-center gap-2">
                    <span className="text-lg">
                        💬
                    </span>

                    <span className="text-sm font-medium text-gray-700">
                        Chat
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={handleOpen}
                        className=" flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-700
                        "
                        aria-label="Expand chat"
                    >
                        ↑
                    </button>

                    <button
                        type="button"
                        onClick={handleClose}
                        className=" flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-gray-700
                        "
                        aria-label="Close chat"
                    >
                        ×
                    </button>
                </div>
            </div>
        );
    }

    /*
     * Open state
     * 300px x 500px
     */
    return (
        <div
            className=" fixed bottom-5 right-5 z-50 flex h-[500px] w-[300px] flex-col overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-gray-200
            "
        >
            {/* Header */}
            <div
                className=" flex h-[52px] shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4
                "
            >
                <div className="flex items-center gap-2">
                    <div
                        className=" flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm text-white
                        "
                    >
                        💬
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-gray-800">
                            Chat
                        </p>

                        <p className="text-xs text-gray-500">
                            Ask something about this form
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        type="button"
                        onClick={handleMinimize}
                        className=" flex h-8 w-8 items-center justify-center rounded-md text-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700
                        "
                        aria-label="Minimize chat"
                    >
                        −
                    </button>

                    <button
                        type="button"
                        onClick={handleClose}
                        className=" flex h-8 w-8 items-center justify-center rounded-md text-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-700
                        "
                        aria-label="Close chat"
                    >
                        ×
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-3">
                <div className="flex">
                    <div
                        className=" max-w-[85%] rounded-lg bg-white px-3 py-2 text-sm text-gray-700 shadow-sm ring-1 ring-gray-100
                        "
                    >
                        Start a conversation...
                    </div>
                </div>
            </div>

            {/* Message Input */}
            <form
                onSubmit={handleSendMessage}
                className=" flex shrink-0 flex-col gap-2 border-t border-gray-200 bg-white p-3
                "
            >
                <Input
                    name="message"
                    type="text"
                    placeholder="Type your message..."
                    className="w-full"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={isSending}
                />

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={!message.trim() || isSending}
                >
                    {isSending ? "Sending..." : "Send"}
                </Button>
            </form>
        </div>
    );
};

export default ChatComponent;