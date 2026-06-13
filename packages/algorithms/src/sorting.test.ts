import { describe, expect, it } from "vitest"
import { bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort } from "./sorting"

const runners = [bubbleSort, selectionSort, insertionSort, mergeSort, quickSort, heapSort]
const cases = [[5, 1, 4, 2, 8], [3, -1, 3, 0, 2], [], [1], [9, 8, 7, 6, 5, 4]]

describe("sorting trace runners", () => {
  for (const runner of runners) {
    it(`${runner.name} sorts values and emits a completion event`, () => {
      for (const input of cases) {
        const run = runner(input)
        expect(run.output).toEqual([...input].sort((left, right) => left - right))
        expect(run.input).toEqual(input)
        expect(run.trace.at(-1)).toMatchObject({
          type: "complete",
          output: run.output,
        })
        expect(run.trace.every((event, index) => event.step === index)).toBe(true)
      }
    })
  }
})
