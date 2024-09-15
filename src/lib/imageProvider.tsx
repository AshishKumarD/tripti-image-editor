import { createContext, useContext, useState } from "react"

const ImageContext = createContext({
	imageUrl: null as string | null,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setImageUrl: (_url: string) => {},
})

import { ReactNode } from "react"

export function ImageProvider({ children }: { children: ReactNode }) {
	const [imageUrl, setImageUrl] = useState<string | null>(null)

	return (
		<ImageContext.Provider value={{ imageUrl, setImageUrl }}>
			{children}
		</ImageContext.Provider>
	)
}

export function useImage() {
	return useContext(ImageContext)
}
