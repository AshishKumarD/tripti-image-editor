import {
	Bird,
	Rabbit,
	RotateCcw,
	RotateCw,
	Settings,
	Sliders,
	Turtle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
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
		<div className="pl-[56px grid h-screen w-full">
			<div className="flex flex-col">
				<main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
					<div
						className="relative hidden flex-col items-start gap-8 md:flex"
						x-chunk="dashboard-03-chunk-0"
					>
						<form className="grid w-full items-start gap-6">
							<fieldset className="grid gap-6 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Appearance
								</legend>
								{/* Brightness */}
								<div className="grid gap-3">
									<Label htmlFor="model">Brightness</Label>
								</div>
								<div className="grid gap-3">
									<Slider />
								</div>
								{/* Contrast */}
								<div className="grid gap-3">
									<Label htmlFor="model">Contrast</Label>
								</div>
								<div className="grid gap-3">
									<Slider />
								</div>
								{/* Saturation */}
								<div className="grid gap-3">
									<Label htmlFor="model">Saturation</Label>
								</div>
								<div className="grid gap-3">
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
					<div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
						{/* <Badge variant="outline" className="absolute right-3 top-3">
							Output
						</Badge> */}
						<div className="flex-1">
							<MyDropzone />
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
