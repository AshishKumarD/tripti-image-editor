import { SiteHeader } from "@/components/site-header"
import { useRoutes } from "react-router-dom"
import { TailwindIndicator } from "./components/tailwind-indicator"
import { Dashboard } from "./dashboard"

const routes = [{ path: "/", element: <Home /> }]

function Home() {
	return <Dashboard />
}

function App() {
	const children = useRoutes(routes)

	return (
		<>
			<div className="relative flex min-h-screen flex-col">
				<SiteHeader />
				<div className="flex-1">{children}</div>
			</div>
			{/* <TailwindIndicator /> */}
		</>
	)
}

export default App
