'use client'

import { useEffect, useState } from 'react'

export default function Page({ params }) {
	const [cars, setCars] = useState([])

	const fetchCar = () => {
		console.log(params)
		fetch(
			`https://vpic.nhtsa.dot.gov/api//vehicles/GetVehicleTypesForMakeId/${params['make-id']}?format=json`
		)
			.then(r => r.json())
			.then(r => setCars(r.Results))
	}

	useEffect(() => {
		if (params['make-id'] && params.year) {
			fetchCar()
		}
	}, [params])

	return (
		<div className='cars'>
			{cars.map((item, index) => {
				return (
					<div key={index} className='car'>
						<h4>{item.MakeName}</h4>
						<span>{item.VehicleTypeName}</span>
					</div>
				)
			})}
		</div>
	)
}
