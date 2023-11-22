import { useState } from "react"
import { useEffect } from "react"

export default function useLocalStorage(initialState, key) {
	const [value, setValue] = useState(function () {
		const storedData = JSON.parse(localStorage.getItem(key))
		return storedData ? storedData : initialState
	})

	useEffect(
		function () {
			localStorage.setItem(key, JSON.stringify(value))
		},
		[value]
	)
	return [value, setValue]
}
