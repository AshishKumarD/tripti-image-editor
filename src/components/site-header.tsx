import { ModeToggle } from "@/components/mode-toggle"

export function SiteHeader() {
	return (
		<header className="sticky top-0 z-40 w-full border-b bg-background">
			<div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
				<h1 className="text-xl font-semibold">Tripti's Photo Editor</h1>

				<div className="flex flex-1 items-center justify-end space-x-4">
					<nav className="flex items-center space-x-1">
						{/* <Link to={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link> */}
						{/* <Link
							to={siteConfig.links.youtube}
							target="_blank"
							rel="noreferrer"
						>
							<div
								className={buttonVariants({
									size: "icon",
									variant: "ghost",
								})}
							>
								<Icons.youtube className="h-5 w-5" />
								<span className="sr-only">YouTube</span>
							</div>
						</Link> */}
						<ModeToggle />
					</nav>
				</div>
			</div>
		</header>
	)
}
