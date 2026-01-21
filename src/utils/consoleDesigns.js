function toRoman(num) {
  const romanNumerals = [
    ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
    ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
    ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
  ]
  let result = ''
  for (const [letter, value] of romanNumerals) {
    while (num >= value) {
      result += letter
      num -= value
    }
  }
  return result
}

export function design1() {
  console.clear()

  const now = new Date()
  const startDate = new Date('2025-01-01')
  const daysSinceStart = Math.floor((now - startDate) / (1000 * 60 * 60 * 24))
  const volume = now.getFullYear() - 2024
  const issueNumber = daysSinceStart + 1
  const volumeRoman = toRoman(volume)

  const today = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).toUpperCase()

  const styles = {
    paper: 'background: #f4f1ea; color: #1a1a1a; padding: 24px; font-family: Georgia, serif; line-height: 1.6; border: 2px solid #d4d1ca;',
    meta: 'font-size: 10px; letter-spacing: 0.15em; color: #666; font-weight: bold; text-transform: uppercase;',
    title: 'font-family: "Playfair Display", Georgia, serif; font-size: 32px; font-weight: 900; letter-spacing: 0.02em; color: #000; margin: 12px 0;',
    subtitle: 'font-size: 12px; letter-spacing: 0.2em; color: #666; text-transform: uppercase;',
    divider: 'color: #ccc; margin: 8px 0;',
    contact: 'font-size: 12px; color: #333; line-height: 1.8;',
    tagline: 'font-style: italic; font-size: 11px; color: #888;'
  }

  console.log('%c ', styles.paper)
  console.log('%cVOL. ' + volumeRoman + ' · NO. ' + issueNumber.toLocaleString() + '          LATE EDITION          TORONTO, ' + today.slice(0, 20), styles.meta)
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.divider)
  console.log('')
  console.log('%cTHE JULIO CALVO TIMES', styles.title)
  console.log('%cFrontend Developer · Toronto, Canada', styles.subtitle)
  console.log('')
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.divider)
  console.log('')
  console.log('%cCONTACT THE NEWSROOM:', styles.contact)
  console.log('%c📧  juliocalvorios@gmail.com', styles.contact)
  console.log('%c🔗  github.com/juliocalvorios', styles.contact)
  console.log('')
  console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.divider)
  console.log('')
  console.log('%c"All the Code That\'s Fit to Ship"', styles.tagline)
  console.log('%c ', styles.paper)
}

export function design1Classic() {
  console.clear()
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        THE JULIO CALVO TIMES
        Frontend Developer · Toronto

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        juliocalvorios@gmail.com
        github.com/juliocalvorios

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`)
}

export function design2() {
  console.clear()

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  const styles = {
    bg: 'background: #f4f1ea; padding: 32px 24px; border-bottom: 1px solid rgba(0,0,0,0.1);',
    title: 'font-family: "Playfair Display", Georgia, serif; font-size: 48px; font-weight: 900; letter-spacing: -0.03em; line-height: 0.9; color: #1a1a1a;',
    meta: 'font-family: -apple-system, system-ui, sans-serif; font-size: 11px; font-weight: 300; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,0,0,0.5);',
    contact: 'font-family: -apple-system, system-ui, sans-serif; font-size: 11px; color: #333;'
  }

  console.log('%c ', styles.bg)
  console.log('%cThe Julio\nCalvo Times.', styles.title)
  console.log('')
  console.log('%cFRONTEND ENGINEERING', styles.meta)
  console.log('%cTORONTO, ON', styles.meta)
  console.log('%c' + date.toUpperCase(), styles.meta)
  console.log('')
  console.log('%c━', 'color: rgba(0,0,0,0.1);')
  console.log('')
  console.log('%c📧 juliocalvorios@gmail.com', styles.contact)
  console.log('%c🔗 github.com/juliocalvorios', styles.contact)
}

export function design3() {
  console.clear()

  const date = new Date().toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })

  const now = new Date()
  const volume = now.getFullYear() - 2024
  const volumeRoman = toRoman(volume)

  const styles = {
    bg: 'background: #f4f1ea; padding: 40px 24px 24px; text-align: center;',
    title: 'font-family: "Playfair Display", Georgia, serif; font-size: 36px; font-weight: 400; letter-spacing: -0.01em; color: #000;',
    tagline: 'font-family: "Playfair Display", Georgia, serif; font-size: 14px; font-style: italic; color: #666;',
    divider: 'font-family: -apple-system, system-ui, sans-serif; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: #666; border-top: 1px solid #000; border-bottom: 1px solid #000; padding: 6px 0; margin: 16px 0;',
    meta: 'font-size: 10px; color: #999;'
  }

  console.log('%c ', styles.bg)
  console.log('%cThe Julio Calvo Times', styles.title)
  console.log('%c"Architecture over ornamentation."', styles.tagline)
  console.log('')
  console.log('%cVOL. ' + volumeRoman + '     FRONTEND DEVELOPER     ' + date.toUpperCase(), styles.divider)
  console.log('')
  console.log('%c📧 juliocalvorios@gmail.com  ·  🔗 github.com/juliocalvorios', styles.meta)
}

export function design4() {
  console.clear()

  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  }).toUpperCase()

  const styles = {
    bg: 'background: #f4f1ea; padding: 32px 24px; font-family: "Courier New", "Space Mono", monospace;',
    meta: 'font-size: 10px; color: rgba(0,0,0,0.5); border-bottom: 1px solid #000;',
    title: 'font-size: 32px; font-weight: bold; letter-spacing: -0.02em; line-height: 1; color: #000; border-bottom: 2px solid #000; padding-bottom: 8px;',
    ticker: 'font-size: 11px; font-weight: bold; color: #000;',
    contact: 'font-size: 11px; color: #333;'
  }

  console.log('%c ', styles.bg)
  console.log('%cDEV.LOG_V2.0                    TORONTO_CA', styles.meta)
  console.log('')
  console.log('%cJULIO CALVO\nENGINEERING', styles.title)
  console.log('')
  console.log('%cLATE EDITION  ━  ' + date + '  ━  PRICE: HIRE ME', styles.ticker)
  console.log('')
  console.log('%c📧 juliocalvorios@gmail.com', styles.contact)
  console.log('%c🔗 github.com/juliocalvorios', styles.contact)
}

export function design5() {
  console.clear()
  console.log(`


  THE JULIO CALVO TIMES
  Frontend Developer · Toronto

  juliocalvorios@gmail.com
  github.com/juliocalvorios


`)
}
