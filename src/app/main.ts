import {
  UnitConverter,
  Metric1DUnits,
  Imperial1DUnits,
  TemperatureUnits,
} from "d4m-unit-converter"

/**
 * Custom error class for invalid toUnit type
 */
class ToUnitError extends TypeError {
  #message: string = "\nInvalid toUnit type"

  constructor(message: string) {
    super(message)
  }

  public get message(): string {
    return this.#message
  }
}

/**
 * Custom error class for invalid fromUnit type
 */
class FromUnitError extends TypeError {
  #message: string = "\nInvalid fromUnit type"

  constructor(message: string) {
    super(message)
  }

  public get message(): string {
    return this.#message
  }
}

/**
 * The interface between the UI and the d4m-unit-converter module.
 */
class Converters {
  #converter: UnitConverter = new UnitConverter()
  constructor() {}

  public calculate(value: number, fromUnit: HTMLSelectElement, toUnit: HTMLSelectElement): number {
    // console.log("calculate: " + value + " " + fromUnit + " " + toUnit)

    try {
      const type = this.#checkType(fromUnit.value.toString())
      if (!this.#checkType(toUnit.value.toString())) {
        throw new ToUnitError("\nCalculate: " + toUnit.toString() + " Invalid unit type");
      }

      // console.log("\ncalculate: type " + type)
      if (type === "temperature") {
        return this.#temperatureConversion(value, fromUnit, toUnit)
      } else if (type === "metric") {
        return this.#lengthMetricToImperialConversion(value, fromUnit, toUnit)
      } else if (type === "imperial") {
        return this.#lengthImperialToMetricConversion(value, fromUnit, toUnit)
      }
      else {
        throw new FromUnitError("\nMain.Converters: " + type || "no type" + " Invalid unit type")
      }
    } catch (e: any) {
      throw new Error(e.message + "\nMain.Converters: Calculation failed.")
    }
  }

  #temperatureConversion(temperature: number, fromUnit: HTMLSelectElement, toUnit: HTMLSelectElement): number {
    try {
      if (fromUnit.value === toUnit.value) {
        return temperature
      }
      const converter = this.#converter.TemperatureConverter
      return converter.convert(temperature, TemperatureUnits[fromUnit.value.toString() as keyof typeof TemperatureUnits],
        TemperatureUnits[toUnit.value as keyof typeof TemperatureUnits])
    } catch (e: any) {
      throw new Error(e.message + "\nMain.#temperatureConversion\nTemperature conversion failed.")
    }
  }

  #lengthMetricToImperialConversion(length: number, fromUnit: HTMLSelectElement, toUnit: HTMLSelectElement): number {
    try {
      const converter = this.#converter.MetricToImperial
      return converter.convert(length,
        Metric1DUnits[fromUnit.value as keyof typeof Metric1DUnits],
        Imperial1DUnits[toUnit.value as keyof typeof Imperial1DUnits])
    } catch (e: any) {
      throw new Error(e.message + "\nMain.#lengthMetricToImperialConversion\nMetric to Imperial conversion failed.")
    }
  }

  #lengthImperialToMetricConversion(length: number, fromUnit: HTMLSelectElement, toUnit: HTMLSelectElement): number {
    // console.log("\nlengthImperialToMetricConversion: " + length + " " + fromUnit + " " + toUnit)
    try {
      const converter = this.#converter.ImperialToMetric
      return converter.convert(length,
        Imperial1DUnits[fromUnit.value as keyof typeof Imperial1DUnits],
        Metric1DUnits[toUnit.value as keyof typeof Metric1DUnits])
    } catch (e: any) {
      throw new Error(e.message + "\nMain.#lengthImperialToMetricConversion\nImperial to Metric conversion failed.")
    }
  }

  #checkType(value: string): string {
    // console.log("\checkType: " + value)
    if (value in Metric1DUnits) {
      return "metric";
    } else if (value in Imperial1DUnits) {
      return "imperial";
    } else if (value in TemperatureUnits) {
      return "temperature";
    } else {
      throw new TypeError("\nMain.#checkType\ncheckType: Invalid unit type");
    }
  }
}

export { Converters, Metric1DUnits, Imperial1DUnits, TemperatureUnits }