import React from 'react'

export const ActiveAvatar = () => {
  return (
    <>
      <svg width='101' height='101' viewBox='0 0 101 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g filter='url(#filter0_d_843_3082)'>
          <circle cx='50.5' cy='50.5' r='30.5' fill='#51FF8F' />
          <circle cx='50.632' cy='50.6327' r='28.5109' fill='url(#paint0_linear_843_3082)' />
          <circle cx='50.632' cy='50.6328' r='26.5051' fill='url(#pattern0)' />
          <circle cx='65.5' cy='76.5' r='4.5' fill='#51FF8F' />
        </g>
        <defs>
          <filter
            id='filter0_d_843_3082'
            x='0'
            y='0'
            width='101'
            height='101'
            filterUnits='userSpaceOnUse'
            colorInterpolationFilters='sRGB'
          >
            <feFlood floodOpacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              type='matrix'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
              result='hardAlpha'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='10' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0' />
            <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_843_3082' />
            <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_843_3082' result='shape' />
          </filter>
          <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
            <use href='#image0_843_3082' transform='scale(0.015625)' />
          </pattern>
          <linearGradient
            id='paint0_linear_843_3082'
            x1='31.8635'
            y1='36.4489'
            x2='79.1428'
            y2='58.226'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#00FFED' />
            <stop offset='1' stopColor='#9D00C6' />
          </linearGradient>
          <image
            id='image0_843_3082'
            width='64'
            height='64'
            href='data:image/png;base64,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'
          />
        </defs>
      </svg>
    </>
  )
}
