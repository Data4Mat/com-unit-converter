import Image from 'next/image'
'use client'
import React, { ChangeEvent, useState } from 'react'
import {
  UnitConverter,
  Metric1DUnits,
  Imperial1DUnits,
  TemperatureUnits,
} from "d4m-unit-converter"

export default function Home() {
  const unitconverter = new UnitConverter()
  const metricToImperial = unitconverter.MetricToImperial
  const imperialToMetric = unitconverter.ImperialToMetric
  const temperature = unitconverter.TemperatureConverter

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

  const convertImperialToMetric = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault()
    const imperialInput = document.querySelector<HTMLInputElement>("#imperial2")
    const imperialLength = imperialInput?.value ? Number(imperialInput.value) : 0
    const metricSelect = document.querySelector<HTMLSelectElement>("#metricType2")
    const metricType = Metric1DUnits[metricSelect?.value as keyof typeof Metric1DUnits]
    const imperialSelect = document.querySelector<HTMLSelectElement>("#imperialType2")
    const imperialType = Imperial1DUnits[imperialSelect?.value as keyof typeof Imperial1DUnits]

    const precision = imperialInput?.value?.split(".")[1]?.length || 2

    const result = imperialToMetric.convert(imperialLength, imperialType, metricType)
    const resultRounded = Math.floor(result * Math.pow(10, precision) + 0.5) / Math.pow(10, precision)

    document.querySelector<HTMLInputElement>("#metric2")!.value = resultRounded.toString()
  }

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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center">
        <div className="flex flex-col items-center justify-top z-[1]">
          <h1 className="mb-4">Unit Converter App</h1>
          <div className="mt-4 p-4 border-2 rounded-md">
            <h2 className="mb-4 text-center">Chose Conversion from</h2>
            <div className="flex flex-row justify-center">
              <form className="flex flex-col">
                <h2 className="text-center mb-4"> Metric to Imperial</h2>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <input title="Imperial length input" type="text" name="metric" id="metric1" className="text-black mt-2 p-1" />
                    <select title="Metric Unit" name="metricType" id="metricType1" className="text-black mt-2 p-1" >
                      <option value="kilometer">Kilometers</option>
                      <option value="meter">Meter</option>
                      <option value="decimeter">Decimeter</option>
                      <option value="centimeter">Centimeter</option>
                    </select>
                  </div>
                  <div className="flex flex-col ml-2">
                    <input title="Imperial length input" type="text" name="imperial" id="imperial1" className="text-black mt-2 p-1" readOnly />
                    <select title="Metric Unit" name="metricType" id="imperialType1" className="text-black mt-2 p-1">
                      <option value="mile">Mile</option>
                      <option value="yard">Yard</option>
                      <option value="foot">Foot</option>
                      <option value="inch">Inch</option>
                      <option value="mil">Mil</option>
                    </select>
                  </div>

                </div>
                <div className=" flex flex-row justify-evenly mt-4">
                  <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Convert" onClick={convertMetricToImperial} />
                </div>
              </form>
              <form className="flex flex-col ml-4">
                <h2 className="text-center mb-4">Imperial To Metric</h2>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <input title="Imperial length input" type="text" name="imperial" id="imperial2" className="text-black mt-2 p-1" />
                    <select title="Metric Unit" name="metricType" id="imperialType2" className="text-black mt-2 p-1">
                      <option value="mile">Mile</option>
                      <option value="yard">Yard</option>
                      <option value="foot">Foot</option>
                      <option value="inch">Inch</option>
                      <option value="mil">Mil</option>
                    </select>
                  </div>
                  <div className="flex flex-col  ml-2">
                    <input title="Imperial length input" type="text" name="metric" id="metric2" className="text-black mt-2 p-1" readOnly />
                    <select title="Metric Unit" name="metricType" id="metricType2" className="text-black mt-2 p-1" >
                      <option value="kilometer">Kilometers</option>
                      <option value="meter">Meter</option>
                      <option value="decimeter">Decimeter</option>
                      <option value="centimeter">Centimeter</option>
                    </select>
                  </div>
                </div>
                <div className=" flex flex-row justify-evenly mt-4">
                  <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Convert" onClick={convertImperialToMetric} />
                </div>
              </form>
              <form className="flex flex-col ml-4">
                <h2 className="text-center mb-4">Temperatures</h2>
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <input title="Imperial length input" type="text" name="tempFrom" id="fromTemperature" className="text-black mt-2 p-1" />
                    <select title="Metric Unit" name="tempFromType" id="fromType" className="text-black mt-2 p-1">
                      <option value="celsius">Celsius</option>
                      <option value="fahrenheit">Fahrenheit</option>
                      <option value="kelvin">Kelvin</option>
                    </select>
                  </div>
                  <div className="flex flex-col  ml-2">
                    <input title="Imperial length input" type="text" name="tempTo" id="toTemperature" className="text-black mt-2 p-1" readOnly />
                    <select title="Metric Unit" name="tempToType" id="toType" defaultValue="fahrenheit" className="text-black mt-2 p-1" >
                      <option value="celsius">Celsius</option>
                      <option value="fahrenheit">Fahrenheit</option>
                      <option value="kelvin">Kelvin</option>
                    </select>
                  </div>
                </div>
                <div className=" flex flex-row justify-evenly mt-4">
                  <input type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Convert" onClick={convertTemperatures} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
