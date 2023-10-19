import {
  UnitConverter,
  Metric1DUnits,
  Imperial1DUnits,
  TemperatureUnits,
} from "d4m-unit-converter"

class Converters {

  constructor() {
  }

  public calculate(value: number, from: Metric1DUnits | Imperial1DUnits | TemperatureUnits, toUnit: Metric1DUnits | Imperial1DUnits | TemperatureUnits): number {
    return 123456
  }

  private temperatureConversion(temperature: number, from: TemperatureUnits, to: TemperatureUnits): number {
    return 0
  }

  private lengthConversion(length: number, from: Metric1DUnits | Imperial1DUnits, to: Metric1DUnits | Imperial1DUnits): number {
    return 0;
  }

  public checkType(value: string): string {

    if (value in Metric1DUnits) {
      return "metric";
    } else if (value in Imperial1DUnits) {
      return "imperial";
    } else if (value in TemperatureUnits) {
      return "temperature";
    } else {
      throw new Error("Invalid type");
    }
  }

  private metersToImperial() {
  }

  private imperialToMeters() {

  }




  // const convertMetricToImperial = (e: React.MouseEvent<HTMLInputElement>) => {
  //   e.preventDefault()
  //   const metricInput = document.querySelector<HTMLInputElement>("#metric1")
  //   const metricLength = metricInput?.value ? Number(metricInput.value) : 0
  //   const metricSelect = document.querySelector<HTMLSelectElement>("#metricType1")
  //   const metricType = Metric1DUnits[metricSelect?.value as keyof typeof Metric1DUnits]
  //   const imperialSelect = document.querySelector<HTMLSelectElement>("#imperialType1")
  //   const imperialType = Imperial1DUnits[imperialSelect?.value as keyof typeof Imperial1DUnits]

  //   const precision = metricInput?.value?.split(".")[1]?.length || 2

  //   const result = metricToImperial.convert(metricLength, metricType, imperialType)
  //   const resultRounded = Math.floor(result * Math.pow(10, precision) + 0.5) / Math.pow(10, precision)

  //   document.querySelector<HTMLInputElement>("#imperial1")!.value = resultRounded.toString()
  // }

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

  // const convertTemperatures = (e: React.MouseEvent<HTMLInputElement>) => {
  //   e.preventDefault()
  //   const fromTempInput = document.querySelector<HTMLInputElement>("#fromTemperature")
  //   const fromTemp = fromTempInput?.value ? Number(fromTempInput.value) : 0
  //   const fromSelect = document.querySelector<HTMLSelectElement>("#fromType")
  //   const fromType = TemperatureUnits[fromSelect?.value as keyof typeof TemperatureUnits]
  //   const toSelect = document.querySelector<HTMLSelectElement>("#toType")
  //   const toType = TemperatureUnits[toSelect?.value as keyof typeof TemperatureUnits]

  //   const precision = fromTempInput?.value?.split(".")[1]?.length || 2

  //   const result = temperature.convert(fromTemp, fromType, toType)
  //   const resultRounded = Math.floor(result * Math.pow(10, precision) + 0.5) / Math.pow(10, precision)

  //   document.querySelector<HTMLInputElement>("#toTemperature")!.value = resultRounded.toString()
  // }
}

export { Converters, Metric1DUnits, Imperial1DUnits, TemperatureUnits }