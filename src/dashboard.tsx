import { RotateCcw, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import MyDropzone from "./Dropzone"
import { Slider } from "./components/ui/slider"

export function Dashboard() {
	return (
		<div className="md:pl08 grid h-screen w-full">
			<div className="flex h-full flex-col">
				<main className="grid grid-cols-1 gap-4 overflow-auto p-4 md:grid-cols-3 lg:grid-cols-4">
					{/* Left Panel */}
					<div className="hidden flex-col items-start gap-8 md:col-span-1 md:flex lg:col-span-1">
						<form className="grid w-full items-start gap-6">
							<fieldset className="grid gap-6 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Appearance
								</legend>
								{/* Brightness */}
								<div className="grid gap-3">
									<Label htmlFor="model">Brightness</Label>
									<Slider />
								</div>
								{/* Contrast */}
								<div className="grid gap-3">
									<Label htmlFor="model">Contrast</Label>
									<Slider />
								</div>
								{/* Saturation */}
								<div className="grid gap-3">
									<Label htmlFor="model">Saturation</Label>
									<Slider />
								</div>
							</fieldset>

							<fieldset className="row-span-2 gap-6 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Rotate
								</legend>
								<div className="flex justify-evenly">
									<Button
										variant="outline"
										size="sm"
										className="gap-1.5 text-sm"
									>
										<RotateCcw />
										Rotate Left 90°
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="gap-1.5 text-sm"
									>
										<RotateCw />
										Rotate Right 90°
									</Button>
								</div>
							</fieldset>
							<fieldset className="grid gap-6 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Convert
								</legend>
								<div className="grid gap-3">
									<Label htmlFor="role">Image Type</Label>
									<Select defaultValue="png">
										<SelectTrigger>
											<SelectValue placeholder="Select a type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="png">PNG</SelectItem>
											<SelectItem value="jpeg">JPEG</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</fieldset>
						</form>
					</div>

					{/* Main Content */}
					<div className="relative flex h-full min-h-[80vh] flex-col overflow-auto rounded-xl bg-muted/50 p-4 md:col-span-2 lg:col-span-3">
						<div className="flex-1 overflow-auto">
							<MyDropzone />
						</div>
					</div>
				</main>

				{/* Move left panel below main content on small screens */}
				<div className="flex flex-col gap-4 p-4 md:hidden">
					<form className="grid w-full items-start gap-6">
						<fieldset className="grid gap-6 rounded-lg border p-4">
							<legend className="-ml-1 px-1 text-sm font-medium">
								Appearance
							</legend>
							{/* Brightness */}
							<div className="grid gap-3">
								<Label htmlFor="model">Brightness</Label>
								<Slider />
							</div>
							{/* Contrast */}
							<div className="grid gap-3">
								<Label htmlFor="model">Contrast</Label>
								<Slider />
							</div>
							{/* Saturation */}
							<div className="grid gap-3">
								<Label htmlFor="model">Saturation</Label>
								<Slider />
							</div>
						</fieldset>
						<fieldset className="row-span-2 gap-6 rounded-lg border p-4">
							<legend className="-ml-1 px-1 text-sm font-medium">Rotate</legend>
							<div className="flex justify-evenly">
								<Button variant="outline" size="sm" className="gap-1.5 text-sm">
									<RotateCcw />
									Rotate Left 90°
								</Button>
								<Button variant="outline" size="sm" className="gap-1.5 text-sm">
									<RotateCw />
									Rotate Right 90°
								</Button>
							</div>
						</fieldset>
						<fieldset className="grid gap-6 rounded-lg border p-4">
							<legend className="-ml-1 px-1 text-sm font-medium">
								Convert
							</legend>
							<div className="grid gap-3">
								<Label htmlFor="role">Image Type</Label>
								<Select defaultValue="png">
									<SelectTrigger>
										<SelectValue placeholder="Select a type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="png">PNG</SelectItem>
										<SelectItem value="jpeg">JPEG</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	)
}
