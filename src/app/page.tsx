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

export default function Home() {
  const unitconverter = new UnitConverter()
  const metricToImperial = unitconverter.MetricToImperial
  const imperialToMetric = unitconverter.ImperialToMetric
  const temperature = unitconverter.TemperatureConverter
  const [activeField, setActiveField] = useState(true)

  const loadTemperature = () => {
    const options1 = createOptions(TemperatureUnits)
    const options2 = createOptions(TemperatureUnits)
    const select1 = document.querySelector<HTMLSelectElement>("#unit1")
    const select2 = document.querySelector<HTMLSelectElement>("#unit2")
    const label1 = document.querySelector<HTMLLabelElement>("#measure1Label")
    const label2 = document.querySelector<HTMLLabelElement>("#measure2Label")
    select1!.innerHTML = options1
    select2!.innerHTML = options2
    label1!.textContent = "Temperature"
    label2!.textContent = "Temperature"
  }

  const loadLength = () => {
    const options1 = createOptions(Metric1DUnits)
    const options2 = createOptions(Imperial1DUnits)
    const select1 = document.querySelector<HTMLSelectElement>("#unit1")
    const select2 = document.querySelector<HTMLSelectElement>("#unit2")
    const label1 = document.querySelector<HTMLLabelElement>("#measure1Label")
    const label2 = document.querySelector<HTMLLabelElement>("#measure2Label")
    select1!.innerHTML = options1
    select2!.innerHTML = options2
    label1!.textContent = "Metric"
    label2!.textContent = "Imperial"
  }

  const createOptions = (units: any) => {
    let options = ""
    for (let key in units) {
      options += `<option value="${key}">${units[key]}</option>`
    }

    return options
  }

  const convertMetricToImperial = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    const metricInput = document.querySelector<HTMLInputElement>("#metric1")
    const metricLength = metricInput?.value ? Number(metricInput.value) : 0
    const metricSelect = document.querySelector<HTMLSelectElement>("#metricType1")
    const metricType = Metric1DUnits[metricSelect?.value as keyof typeof Metric1DUnits]
    const imperialSelect = document.querySelector<HTMLSelectElement>("#imperialType1")
    const imperialType = Imperial1DUnits[imperialSelect?.value as keyof typeof Imperial1DUnits]

    const precision = metricInput?.value?.split(".")[1]?.length || 2

    const result = metricToImperial.convert(metricLength, metricType, imperialType)
    const resultRounded = Math.floor(result * Math.pow(10, precision) + 0.5) / Math.pow(10, precision)

    document.querySelector<HTMLInputElement>("#imperial1")!.value = resultRounded.toString()
  }

  // const convertImperialToMetric = (e: React.MouseEvent<HTMLInputElement>) => {
  //   e.preventDefault()
  //   const imperialLength = imperialInput?.value ? Number(imperialInput.value) : 0
  //   const imperialInput = document.querySelector<HTMLInputElement>("#imperial2")
  //   const metricSelect = document.querySelector<HTMLSelectElement>("#metricType2")k
  //   const metricType = Metric1DUnits[metricSelect?.value as keyof typeof Metric1DUnits]
  //   const imperialSelect = document.querySelector<HTMLSelectElement>("#imperialType2")
  //   const imperialType = Imperial1DUnits[imperialSelect?.value as keyof typeof Imperial1DUnits]

  //   const precision = imperialInput?.value?.split(".")[1]?.length || 2

  //   const result = imperialToMetric.convert(imperialLength, imperialType, metricType)
  //   const resultRounded = Math.floor(result * Math.pow(10, precision) + 0.5) / Math.pow(10, precision)

  //   document.querySelector<HTMLInputElement>("#metric2")!.value = resultRounded.toString()
  // }

  const convertTemperatures = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    const fromTempInput = document.querySelector<HTMLInputElement>("#fromTemperature")
    const fromTemp = fromTempInput?.value ? Number(fromTempInput.value) : 0
    const fromSelect = document.querySelector<HTMLSelectElement>("#fromType")
    const fromType = TemperatureUnits[fromSelect?.value as keyof typeof TemperatureUnits]
    const toSelect = document.querySelector<HTMLSelectElement>("#toType")
    const toType = TemperatureUnits[toSelect?.value as keyof typeof TemperatureUnits]

    const precision = fromTempInput?.value?.split(".")[1]?.length || 2

    const result = temperature.convert(fromTemp, fromType, toType)
    const resultRounded = Math.floor(result * Math.pow(10, precision) + 0.5) / Math.pow(10, precision)

    document.querySelector<HTMLInputElement>("#toTemperature")!.value = resultRounded.toString()
  }

  const setFocusField = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.id === "measure1") {
      setActiveField(true)
    } else {
      setActiveField(false)
    }
  }

  function conversionHandler(ev: ChangeEvent<HTMLInputElement>): void {
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
            {/* <h2 className="mb-4 text-center">Chose Conversion from</h2> */}
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
                        onChange={conversionHandler} /> Length</label>
                  </div>
                </fieldset>
              </form>
              <form className="flex flex-col">
                <h2 className="text-center mb-4"> Metric to Imperial</h2>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <label id="measure1Label" htmlFor="measure1">Metric</label>
                    <input title="Numeric Only" type="text"
                      name="measure" id="measure1" className="text-black mt-2 p-1"
                      pattern="\d*(\.\d+)?$" readOnly={!activeField}
                      onFocus={setFocusField} />
                    <select title="Selector Unit 1" name="unit-selector" id="unit1" className="text-black mt-2 p-1" >
                    </select>
                  </div>
                  <div className="flex flex-col ml-2">
                  <label id="measure2Label" htmlFor="measure1">Metric</label>
                    <input title="Numeric Only" type="text"
                      name="measure" id="measure2" className="text-black mt-2 p-1"
                      pattern="\d*(\.\d+)?$" readOnly={activeField}
                      onFocus={setFocusField} />
                    <select title="Selector Unit 2" name="unit-selector" id="unit2" className="text-black mt-2 p-1">
                    </select>
                  </div>

                </div>
                <div className=" flex flex-row justify-evenly mt-4">
                  <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Convert" onClick={convertMetricToImperial} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
