import '../styles/global/global.css'
import StyledComponentsRegistry from '../lib/registry.js'
import { Nunito_Sans } from 'next/font/google'

const nunito = Nunito_Sans({ subsets: ['latin'] })

 
export default function RootLayout({ children }) {
  return (
    <html>
      <body className={nunito.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}