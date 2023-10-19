import Image from 'next/image'
'use client'
import React, { ChangeEvent, useState } from 'react'
import { create } from 'domain'
import { Converters, TemperatureUnits, Metric1DUnits, Imperial1DUnits } from "./main"

export default function Home() {
  // const metricToImperial = unitconverter.MetricToImperial
  // const imperialToMetric = unitconverter.ImperialToMetric
  // const temperature = unitconverter.TemperatureConverter
  const [isReadOnlyField1, setIsReadOnlyField1] = useState(false)
  const [isReadOnlyField2, setIsReadOnlyField2] = useState(!isReadOnlyField1)
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
    console.log("\n*** loadLength options1: " + options1)
    try {
      select1!.innerHTML = options1
      select2!.innerHTML = options2
      setLabel1("Metric")
      setLabel2("Imperial")
      console.log("\n*** loadLength select1: " + select1)
      setConversionHeader("Metric & Imperial")
    } catch (e) {
      console.error("\n*** loadLength error: " + e)
    }
  }

  const createOptions = (units: any) => {
    let options = ""
    for (let key in units) {
      options += `<option value="${key}">${units[key]}</option>`
    }

    return options
  }

  const toggleFocusField = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.id === "measure1") {
      setIsReadOnlyField1(false)
      setIsReadOnlyField2(true)
    } else {
      setIsReadOnlyField1(true)
      setIsReadOnlyField2(false)
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

  const handleChange = (ev: ChangeEvent<HTMLElement>): void => {
    const changeElement: HTMLElement = ev.target as HTMLElement
    console.log("\n*** handleChange target: " + ev.target + " \nchangeElement: " + changeElement + " \nchangeElement.id: " + changeElement.id + " \nchangeElement.value: " + changeElement.value)

    try {
      let inData: number
      let fromUnit: Metric1DUnits | Imperial1DUnits | TemperatureUnits
      let toUnit: Metric1DUnits | Imperial1DUnits | TemperatureUnits
      let  outField: HTMLInputElement

      if (isReadOnlyField2) {
        inData = parseFloat((document.querySelector<HTMLInputElement>("#measure1") as HTMLInputElement).value)
        fromUnit = (document.querySelector<HTMLSelectElement>("#unit1") as HTMLSelectElement).value as Metric1DUnits | Imperial1DUnits | TemperatureUnits
        toUnit = (document.querySelector<HTMLSelectElement>("#unit2") as HTMLSelectElement).value as Metric1DUnits | Imperial1DUnits | TemperatureUnits
        outField = document.querySelector<HTMLInputElement>("#measure2") as HTMLInputElement
      } else {
        inData = parseFloat((document.querySelector<HTMLInputElement>("#measure2") as HTMLInputElement).value)
        fromUnit = (document.querySelector<HTMLSelectElement>("#unit2") as HTMLSelectElement).value as Metric1DUnits | Imperial1DUnits | TemperatureUnits
        toUnit = (document.querySelector<HTMLSelectElement>("#unit1") as HTMLSelectElement).value as Metric1DUnits | Imperial1DUnits | TemperatureUnits
        outField = document.querySelector<HTMLInputElement>("#measure1") as HTMLInputElement
      }

      const outData: number = calculate (inData, fromUnit, toUnit)
      outField.value = outData.toString()
    } catch (e) {
      console.error("\n*** handleChange error: " + e)
    }
  }

  const calculate = (value: number, fromUnit: Metric1DUnits | Imperial1DUnits | TemperatureUnits, toUnit: Metric1DUnits | Imperial1DUnits | TemperatureUnits): number => {
    const converter = new Converters()
    return converter.calculate(value, fromUnit, toUnit)   
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
                      pattern="\d*(\.\d+)?$" readOnly={isReadOnlyField1}
                      onChange={handleChange}
                      onFocus={toggleFocusField} />
                    <select title="Selector Unit 1"
                      name="unit-selector"
                      id="unit1"
                      onChange={handleChange}
                      className="text-black mt-2 p-1" >
                    </select>
                  </div>
                  <div className="flex flex-col ml-2">
                    <label id="measure2Label" htmlFor="measure1">{label2}</label>
                    <input title="Numeric Only" type="text"
                      name="measure" id="measure2" className="text-black mt-2 p-1"
                      pattern="\d*(\.\d+)?$" readOnly={isReadOnlyField2}
                      onChange={handleChange}
                      onFocus={toggleFocusField} />
                    <select title="Selector Unit 2"
                      name="unit-selector"
                      id="unit2"
                      onChange={handleChange}
                      className="text-black mt-2 p-1">
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
