// Simple sound assets (using data URIs for zero-dependency sounds)

// A short "pop" sound for interactions
export const POP_SOUND = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAAAAA=="; // Placeholder, will replace with real base64 or URL

// A short "whoosh" for dragging
export const WHOOSH_SOUND = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAAAAA==";

// A "clank" for robot
export const CLANK_SOUND = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQQAAAAAAA==";

// Since we can't easily upload MP3s, we'll use some public URLs for now
export const SOUNDS = {
    hover: "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3", // Click/Pop
    drag: "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3", // Whoosh
    drop: "https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3", // Thud
    hype: "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3", // Upbeat
    robot: "https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3", // Mechanical
    hurt: "https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3", // Ouch
};
