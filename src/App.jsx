import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from './hooks/useDebounce'
import { useThrottling } from './hooks/useThrottling'

function App() {
	const arr = ['Mark', 'Andrew', 'John', 'Bob']
	const [resultArr, setResultArr] = useState(arr)

	//useThrottling
	const onMoveLog = useCallback(() => console.log('Mouse Move'), [])
	const handleMouseMove = useThrottling(onMoveLog, 1000)

	useEffect(() => {
		document.addEventListener('mousemove', handleMouseMove)

		return () => document.removeEventListener('mousemove', handleMouseMove)
	}, [])

	//useDebounce
	const filterData = value => {
		console.log(value)
		const filteredArr = arr.filter(el =>
			el.toLowerCase().includes(value.toLowerCase())
		)
		setResultArr(filteredArr)
	}

	const searchUsers = useDebounce(filterData, 500)

	const handleChange = e => {
		searchUsers(e.target.value)
	}

	return (
		<div>
			<input placeholder='Search smth...' onChange={handleChange} />
			<div>
				{resultArr && resultArr.map((el, index) => <li key={index}>{el}</li>)}
			</div>
		</div>
	)
}

export default App
