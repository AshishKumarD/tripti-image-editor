//@ts-nocheck
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { useImage } from "./lib/imageProvider"

export default function MyDropzone() {
	const [dataURL, setDataURL] = useState<string | null>(null)
	const { imageUrl, setImageUrl } = useImage()

	const onDrop = useCallback((acceptedFiles: File[]) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader()
			reader.onabort = () => console.log("file reading was aborted")
			reader.onerror = () => console.log("file reading has failed")
			reader.onload = () => {
				const binaryStr = reader.result as string
				setDataURL(binaryStr)
			}
			reader.readAsDataURL(file)
		})
	}, [])

	const uploadImage = async () => {
		if (!dataURL) return

		const formData = new FormData()

		// Convert dataURL to Blob if necessary
		const blob = await fetch(dataURL).then((res) => res.blob())
		formData.append("image", blob, "image.png") // Appending with a filename 'image.png'

		try {
			const response = await fetch("http://localhost:3000/upload", {
				method: "POST",
				body: formData,
			})

			const result = await response.json()

			if (response.ok) {
				const filename = result.file // Extract filename from response

				// Construct URL to fetch the image
				const imageUrl = `http://localhost:3000/get/${filename}`
				setImageUrl(imageUrl) // Update imageUrl in context
				setDataURL(null) // Clear the dataURL after upload
			} else {
				console.error("Upload failed:", result.error)
			}
		} catch (error) {
			console.error("Error uploading image:", error)
		}
	}

	// Determine which URL to display
	const displayUrl = imageUrl || dataURL

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<div
			{...getRootProps({
				className:
					"dropzone flex flex-col items-center justify-center w-full h-full border border-dashed border-gray-400 rounded-lg",
			})}
		>
			<input {...getInputProps()} />
			{displayUrl ? (
				<div className="relative flex h-full w-full flex-1 items-center justify-center bg-transparent p-4">
					<img
						src={displayUrl}
						alt="Selected file"
						className="max-h-full max-w-full object-contain"
					/>
					{/* Hide buttons if imageUrl is present */}
					{!imageUrl && dataURL && (
						<div className="absolute bottom-4 flex gap-4">
							<button
								className=" bg-primary p-2 text-primary-foreground hover:bg-primary/90"
								onClick={uploadImage}
								onMouseDown={(e) => e.preventDefault()} // Prevent default behavior
							>
								Upload
							</button>
							<button
								onClick={() => setDataURL(null)}
								className=" bg-primary p-2 text-primary-foreground hover:bg-primary/90"
							>
								Cancel
							</button>
						</div>
					)}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center">
					{isDragActive ? (
						<div className="flex flex-col items-center justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								height="50"
								width="50"
								fill="currentColor"
							>
								<path d="M1 14.5C1 12.1716 2.22429 10.1291 4.06426 8.9812C4.56469 5.044 7.92686 2 12 2C16.0731 2 19.4353 5.044 19.9357 8.9812C21.7757 10.1291 23 12.1716 23 14.5C23 17.9216 20.3562 20.7257 17 20.9811L7 21C3.64378 20.7257 1 17.9216 1 14.5ZM16.8483 18.9868C19.1817 18.8093 21 16.8561 21 14.5C21 12.927 20.1884 11.4962 18.8771 10.6781L18.0714 10.1754L17.9517 9.23338C17.5735 6.25803 15.0288 4 12 4C8.97116 4 6.42647 6.25803 6.0483 9.23338L5.92856 10.1754L5.12288 10.6781C3.81156 11.4962 3 12.927 3 14.5C3 16.8561 4.81833 18.8093 7.1517 18.9868L7.325 19H16.675L16.8483 18.9868ZM13 13V17H11V13H8L12 8L16 13H13Z"></path>
							</svg>
							<p className="mt-2">Drop your files here or click to browse</p>
						</div>
					) : (
						<p className="text-center">
							Drop your files here or click to browse
						</p>
					)}
				</div>
			)}
		</div>
	)
}
