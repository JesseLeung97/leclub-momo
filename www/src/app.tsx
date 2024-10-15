import { Landing } from "./components/pages/landing"
import { About } from "./components/pages/about"
import { Layout } from "./components/layout"
import { SpCheck } from "./components/sp-check"
import { Shop } from "./components/pages/shop"

export function App() {
  return (
    <SpCheck>
      <Layout>
        <Landing />
        <About />
        <Shop />
      </Layout>
    </SpCheck>
  )
}
