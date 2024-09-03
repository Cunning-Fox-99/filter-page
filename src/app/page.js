'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
	const [cars, setCars] = useState([])
	const [car, setCar] = useState(undefined)
	const [year, setYear] = useState(undefined)
	const router = useRouter()

	const fetchCars = () => {
		fetch(
			'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json'
		)
			.then(r => r.json())
			.then(r => setCars(r.Results))
	}

	const selectYear = year => {
		setYear(year)
		fetch(
			`https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForManufacturerAndYear/mer?year=${year}&format=json`
		)
			.then(r => r.json())
			.then(r => setCars(r.Results))
	}

	// useEffect(() => fetchCars, [])

	return (
		<main className='cars'>
			<button
				disabled={car ? false : true}
				className='next'
				onClick={() => router.push(`/result/${car?.MakeId}/${year}`)}
			>
				Next
			</button>
			<ul className='years'>
				<li onClick={() => selectYear(2015)} className='year'>
					2015
				</li>
				<li onClick={() => selectYear(2016)} className='year'>
					2016
				</li>
				<li onClick={() => selectYear(2017)} className='year'>
					2017
				</li>
				<li onClick={() => selectYear(2018)} className='year'>
					2018
				</li>
			</ul>
			{cars.map((item, index) => {
				return (
					<div
						key={index}
						onClick={() => setCar(item)}
						className={car?.MakeId === item.MakeId ? 'car active' : 'car'}
					>
						<h4>{item.MakeName}</h4>
						<span>{item.VehicleTypeName}</span>
					</div>
				)
			})}
		</main>
	)
}
