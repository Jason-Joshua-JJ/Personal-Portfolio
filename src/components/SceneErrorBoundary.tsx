
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

export default class SceneErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("3D Scene Error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="w-full h-full flex flex-col items-center justify-center bg-background/50 border border-border rounded-lg p-6 text-center">
                    <AlertCircle className="w-10 h-10 text-destructive mb-4" />
                    <h3 className="text-lg font-semibold mb-2">3D Scene Error</h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                        There was a problem loading the 3D experience. Please try refreshing the page.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}
