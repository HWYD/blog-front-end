// components/GlobalScriptLoader.jsx
'use client'

export default function GlobalScriptLoader() {
  const prismScript = document.getElementById('prismjs')
  if (prismScript && prismScript.parentNode) {
    prismScript.parentNode.removeChild(prismScript)
  }
  const script = document.createElement('script')
  script.src = '/prism.js'
  script.id = 'prismjs'
  script.async = true
  script.onload = () => {
    window.Prism.highlightAll()
  }
  document.body.appendChild(script)
  return (
    ''
  )
}
