"use client"

type MysticalFloorPatternProps = {
    className?: string
    opacity?: number
}

export function MysticalFloorPattern({
    className="mb-8",
    opacity = 20
} : MysticalFloorPatternProps) {
    return (
        <div className={className}>
            <div className={`w-full h-px bg-gradient-to-r from-transparent via-ember-600/${opacity} to-transparent`} />
        </div>
    )
}