import Image from 'next/image'
'use client'
import React, { ChangeEvent, useState } from 'react'
import {
  UnitConverter,
  Metric1DUnits,
  Imperial1DUnits,
  TemperatureUnits,
} from "d4m-unit-converter"
import { create } from 'domain'
import {Converters} from "./main"

export default function Home() {
  const unitconverter = new UnitConverter()
  const metricToImperial = unitconverter.MetricToImperial
  const imperialToMetric = unitconverter.ImperialToMetric
  const temperature = unitconverter.TemperatureConverter
  const [activeField, setActiveField] = useState(true)
  const [conversionHeader, setConversionHeader] = useState("Conversion")
  const [label1, setLabel1] = useState("Unit")
  const [label2, setLabel2] = useState("Unit")

  const loadTemperature = () => {
    const options1 = createOptions(TemperatureUnits)
    const options2 = createOptions(TemperatureUnits)
    const select1 = document.querySelector<HTMLSelectElement>("#unit1")
    const select2 = document.querySelector<HTMLSelectElement>("#unit2")
    select1!.innerHTML = options1
    select2!.innerHTML = options2
    setLabel1("Temperature")
    setLabel2("Temperature")
    setConversionHeader("Temperature")
  }

  const loadLength = () => {
    const options1 = createOptions(Metric1DUnits)
    const options2 = createOptions(Imperial1DUnits)
    const select1 = document.querySelector<HTMLSelectElement>("#unit1")
    const select2 = document.querySelector<HTMLSelectElement>("#unit2")
    select1!.innerHTML = options1
    select2!.innerHTML = options2
    setLabel1("Metric")
    setLabel2("Imperial")
    setConversionHeader("Metric & Imperial")
  }

  const createOptions = (units: any) => {
    let options = ""
    for (let key in units) {
      options += `<option value="${key}">${units[key]}</option>`
    }

    return options
  }

  const setFocusField = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.id === "measure1") {
      setActiveField(true)
    } else {
      setActiveField(false)
    }
  }

  const conversionHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    console.log("\n*** conversionHandler target.value: " + ev.target.value)
    if (ev.target.value === 'temperature') {
      loadTemperature()
    } else if (ev.target.value === 'length') {
      loadLength()
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center">
        <div className="flex flex-col items-center justify-top z-[1]">
          <h1 className="mb-4">Unit Converter App</h1>
          <div className="mt-4 p-4 border-2 rounded-md">
            <div className="flex flex-col items-center">
              <form className="flex flex-col items-center">
                <fieldset className='flex flex-col items-center m-2 border p-3'>
                  <legend className='text-lg'>Conversion:</legend>
                  <div className="flex flex-col">
                    <label htmlFor="temperature">
                      <input type="radio"
                        name="conversion"
                        id="temperature"
                        value='temperature'
                        className="text-black mr-2 p-1"
                        onChange={conversionHandler} />Temperature</label>
                    <label htmlFor="length">
                      <input type="radio"
                        name="conversion"
                        id="length"
                        className="text-black mr-2 p-1"
                        value='length'
                        onChange={conversionHandler} />Length</label>
                  </div>
                </fieldset>
              </form>
              <form className="flex flex-col">
                <h3 id="conversionHeader" className="text-center mb-4">{conversionHeader}</h3>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <label id="measure1Label" htmlFor="measure1">{label1}</label>
                    <input title="Numeric Only" type="text"
                      name="measure" id="measure1" className="text-black mt-2 p-1"
                      pattern="\d*(\.\d+)?$" readOnly={!activeField}
                      onFocus={setFocusField} />
                    <select title="Selector Unit 1" name="unit-selector" id="unit1" className="text-black mt-2 p-1" >
                    </select>
                  </div>
                  <div className="flex flex-col ml-2">
                  <label id="measure2Label" htmlFor="measure1">{label2}</label>
                    <input title="Numeric Only" type="text"
                      name="measure" id="measure2" className="text-black mt-2 p-1"
                      pattern="\d*(\.\d+)?$" readOnly={activeField}
                      onFocus={setFocusField} />
                    <select title="Selector Unit 2" name="unit-selector" id="unit2" className="text-black mt-2 p-1">
                    </select>
                  </div>
                </div>
                {/* <div className=" flex flex-row justify-evenly mt-4">
                  <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Convert" onClick={convertMetricToImperial} />
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
