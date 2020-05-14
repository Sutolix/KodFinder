import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../lotties/7520-welcome.json'

export default function DevAvatar2 () {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <div>
      <Lottie
        options={defaultOptions}
        height={70}
        width={70}
      />
    </div>
  )
}
