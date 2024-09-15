import { RotateCcw, RotateCw, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import React, { useState, useCallback } from "react"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import MyDropzone from "./Dropzone"
import { Slider } from "./components/ui/slider"
import { useImage } from "./lib/imageProvider"

export function Dashboard() {
	const { imageUrl, setImageUrl } = useImage()
	const [brightness, setBrightness] = useState(1)
	const [contrast, setContrast] = useState(1)
	const [saturation, setSaturation] = useState(1)
	const [rotation, setRotation] = useState(0)
	const [imageType, setImageType] = useState("png")
	const [quality, setQuality] = useState(50) // New state for image quality
	const [width, setWidth] = useState(500) // New state for image width

	const handleBrightnessChange = (value: number) => {
		setBrightness(value)
		handleTransform()
	}

	const handleContrastChange = (value: number) => {
		setContrast(value)
		handleTransform()
	}

	const handleSaturationChange = (value: number) => {
		setSaturation(value)
		handleTransform()
	}

	const handleRotationLeft = () => {
		setRotation((prevRotation) => {
			const newRotation = prevRotation - 90
			return newRotation < 0 ? 360 + newRotation : newRotation
		})
		handleTransform()
	}

	const handleRotationRight = () => {
		setRotation((prevRotation) => {
			const newRotation = prevRotation + 90
			return newRotation >= 360 ? newRotation - 360 : newRotation
		})
		handleTransform()
	}

	const handleImageTypeChange = (value: string) => setImageType(value)

	const handleQualityChange = (value: number) => {
		setQuality(value)
		handleTransform()
	}

	const handleWidthChange = (value: number) => {
		setWidth(value)
		handleTransform()
	}

	const handleTransform = useCallback(() => {
		// Check if imageUrl has a base URL and strip existing query parameters if needed
		const baseUrl = imageUrl?.split("?")[0]

		// Construct the query parameters
		const queryParams = new URLSearchParams({
			b: brightness.toString(),
			s: saturation.toString(),
			c: contrast.toString(),
			r: rotation.toString(),
			f: imageType,
			q: quality.toString(), // Add quality parameter
			w: width.toString(), // Add width parameter
		}).toString()

		// Build the new URL
		const newUrl = `${baseUrl}?${queryParams}`

		// Update the image URL in the state or context
		setImageUrl(newUrl)

		console.log("Transforming image with", {
			newUrl,
			brightness,
			contrast,
			saturation,
			rotation,
			imageType,
			quality, // Log quality as well
			width, // Log width as well
		})
	}, [
		imageUrl,
		brightness,
		contrast,
		saturation,
		rotation,
		imageType,
		quality,
		width,
		setImageUrl,
	])

	const handleDownload = () => {
		handleTransform()
		const link = document.createElement("a")
		if (imageUrl) {
			link.href = imageUrl
		}
		link.download = `image.${imageType}`
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<div className="grid h-screen w-full md:pl-8">
			<div className="flex h-full flex-col">
				<main className="grid grid-cols-1 gap-4 overflow-auto p-4 md:grid-cols-3 lg:grid-cols-4">
					{/* Main Content */}
					<div className="relative flex h-full min-h-[80vh] flex-col overflow-auto rounded-xl bg-muted/50 p-4 md:col-span-2 lg:col-span-3">
						<MyDropzone />
					</div>

					{/* Left Panel */}
					<div className="left-0 w-full p-4 shadow-md">
						<form className="grid w-full items-start gap-6">
							<fieldset className="grid gap-6 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Appearance
								</legend>
								{/* Brightness */}
								<div className="grid gap-3">
									<Label htmlFor="brightness">Brightness</Label>
									<Slider
										min={0}
										max={2}
										step={0.1}
										value={[brightness]}
										onValueChange={(value) => handleBrightnessChange(value[0])}
									/>
								</div>
								{/* Contrast */}
								<div className="grid gap-3">
									<Label htmlFor="contrast">Contrast</Label>
									<Slider
										min={0}
										max={2}
										step={0.1}
										value={[contrast]}
										onValueChange={(value) => handleContrastChange(value[0])}
									/>
								</div>
								{/* Saturation */}
								<div className="grid gap-3">
									<Label htmlFor="saturation">Saturation</Label>
									<Slider
										min={0}
										max={2}
										step={0.1}
										value={[saturation]}
										onValueChange={(value) => handleSaturationChange(value[0])}
									/>
								</div>
								{/* Quality */}
								<div className="grid gap-3">
									<Label htmlFor="quality">Quality</Label>
									<Slider
										min={0}
										max={100}
										step={1}
										value={[quality]}
										onValueChange={(value) => handleQualityChange(value[0])}
									/>
								</div>
								{/* Width */}
								<div className="grid gap-3">
									<Label htmlFor="width">Width</Label>
									<Slider
										min={1}
										max={10000}
										step={1}
										value={[width]}
										onValueChange={(value) => handleWidthChange(value[0])}
									/>
								</div>
							</fieldset>

							<fieldset className="row-span-2 gap-6 rounded-lg border p-4">
								<legend className="-ml-1 px-1 text-sm font-medium">
									Rotate
								</legend>
								<div className="flex justify-evenly">
									<Button
										type="button"
										variant="outline"
										size="sm"
										className="gap-1.5 text-sm"
										onClick={handleRotationLeft}
									>
										<RotateCcw />
										Rotate Left 90°
									</Button>
									<Button
										type="button"
										variant="outline"
										size="sm"
										className="gap-1.5 text-sm"
										onClick={handleRotationRight}
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
									<Label htmlFor="imageType">Image Type</Label>
									<Select
										value={imageType}
										onValueChange={handleImageTypeChange}
									>
										<SelectTrigger>
											<SelectValue placeholder="Select a type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="png">PNG</SelectItem>
											<SelectItem value="jpeg">JPEG</SelectItem>
											<SelectItem value="jpg">JPG</SelectItem>
											<SelectItem value="heif">HEIF</SelectItem>
											<SelectItem value="raw">RAW</SelectItem>
											<SelectItem value="tiff">TIFF</SelectItem>
											<SelectItem value="webp">WEBP</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<Button
									type="button"
									variant="outline"
									className="mt-4"
									onClick={handleDownload}
								>
									<Download />
									Download Image
								</Button>
							</fieldset>
						</form>
					</div>
				</main>
			</div>
		</div>
	)
}
