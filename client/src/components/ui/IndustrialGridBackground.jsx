import { useId } from 'react'
import { cn } from '../../lib/utils'

export default function IndustrialGridBackground({
  cellSize = 88,
  lineColor,
  markerColor,
  lineOpacity,
  markerOpacity,
  markerSize = 6,
  className,
  theme = 'light',
  fadeEdges = true,
  showMarkers = true
}) {
  const uid = useId().replace(/:/g, '')
  const patternId = `${uid}-industrial-grid`
  const maskId = `${uid}-industrial-mask`
  const gradientId = `${uid}-industrial-fade`

  const resolvedLineColor = lineColor ?? (theme === 'dark' ? '#64748b' : '#94a3b8')
  const resolvedMarkerColor = markerColor ?? (theme === 'dark' ? '#cbd5e1' : '#64748b')
  const resolvedLineOpacity = lineOpacity ?? (theme === 'dark' ? 0.12 : 0.08)
  const resolvedMarkerOpacity = markerOpacity ?? (theme === 'dark' ? 0.2 : 0.16)
  const markerHalf = markerSize / 2

  return (
    <svg
      aria-hidden="true"
      preserveAspectRatio="none"
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={patternId} width={cellSize} height={cellSize} patternUnits="userSpaceOnUse">
          <path
            d={`M ${cellSize} 0 H 0 V ${cellSize}`}
            fill="none"
            stroke={resolvedLineColor}
            strokeWidth="1"
            strokeOpacity={resolvedLineOpacity}
            shapeRendering="crispEdges"
          />
          {showMarkers ? (
            <path
              d={`M ${-markerHalf} 0 H ${markerHalf} M 0 ${-markerHalf} V ${markerHalf}`}
              fill="none"
              stroke={resolvedMarkerColor}
              strokeWidth="1"
              strokeOpacity={resolvedMarkerOpacity}
              shapeRendering="crispEdges"
            />
          ) : null}
        </pattern>

        <radialGradient id={gradientId} cx="50%" cy="50%" r="66%">
          <stop offset="58%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>

        <mask id={maskId}>
          <rect width="100%" height="100%" fill={fadeEdges ? `url(#${gradientId})` : 'white'} />
        </mask>
      </defs>

      <rect width="100%" height="100%" fill={`url(#${patternId})`} mask={fadeEdges ? `url(#${maskId})` : undefined} />
    </svg>
  )
}
