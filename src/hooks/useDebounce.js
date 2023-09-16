import { useCallback, useRef } from 'react'

export const useDebounce = (callback, delay) => {
	const ref = useRef(null)

	return useCallback(
		(...args) => {
			clearTimeout(ref.current)
			ref.current = setTimeout(() => callback(...args), delay)
		},
		[callback, delay]
	)
}
