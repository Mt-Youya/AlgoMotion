import { AlgoVideo, AlgoVideoConfig } from "../../template/algo-video"

const config: AlgoVideoConfig = {
  title: "DFT / FFT",
  subtitle: "Computes the Discrete Fourier Transform in O(n log n) using the Cooley-Tukey radix-2 FFT algorithm.",
  category: "math",
  difficulty: "expert",

  chapters: {
    problem: {
      heading: "What is the Discrete Fourier Transform?",
      body: [
        "Given N complex (or real) samples x[0], x[1], …, x[N-1], compute N frequency-domain values X[0], X[1], …, X[N-1].",
        "Each output X[k] represents the amplitude and phase of the k-th frequency component present in the signal.",
        "The naive DFT evaluates a double sum — O(N²) multiplications — which becomes prohibitive for large N.",
        "The Fast Fourier Transform (FFT) exploits symmetry and periodicity of the complex exponentials to reduce work to O(N log N).",
        "FFT is the single most important numerical algorithm in engineering: used in audio, image compression, communications, and scientific computing.",
      ],
      callout:
        "FFT turns a 1-second computation on N=1,000,000 samples into milliseconds — a 1,000,000× speedup over naive DFT.",
    },

    intuition: {
      heading: "Core Intuition: Divide and Conquer",
      body: [
        "Split the N-point DFT into two N/2-point DFTs: one over the even-indexed samples, one over the odd-indexed samples.",
        "The twiddle factor W_N^k = e^{-j2πk/N} links the two half-size results via a simple butterfly operation.",
        "Because W_N^{k+N/2} = -W_N^k, each butterfly computes two output bins with a single complex multiply.",
        "Applying the split recursively yields log₂(N) levels, each requiring N/2 butterfly operations → O(N log N) total.",
        "The input must be reordered by bit-reversal permutation before the butterflies are applied (or equivalently, the recursion naturally produces this order).",
      ],
      analogy:
        "Think of FFT like a perfectly balanced tournament bracket. Instead of having every team play every other team (O(N²)), you split into two halves, run sub-tournaments, then combine results at each round. Each round is O(N) work and there are only log₂(N) rounds.",
    },

    walkthrough: {
      steps: [
        {
          label: "Step 1 — Input signal in time domain",
          description: "Start with 8 real-valued samples: x = [1, 2, 3, 4, 4, 3, 2, 1]. This is a symmetric pulse.",
          array: [
            { value: 1, color: "blue" },
            { value: 2, color: "blue" },
            { value: 3, color: "blue" },
            { value: 4, color: "blue" },
            { value: 4, color: "blue" },
            { value: 3, color: "blue" },
            { value: 2, color: "blue" },
            { value: 1, color: "blue" },
          ],
        },
        {
          label: "Step 2 — Bit-reversal permutation",
          description:
            "Reorder indices by reversing their 3-bit binary representations: 000→000, 001→100, 010→010, … giving order [0,4,2,6,1,5,3,7].",
          array: [
            { value: 1, color: "yellow" },
            { value: 4, color: "yellow" },
            { value: 3, color: "yellow" },
            { value: 3, color: "yellow" },
            { value: 2, color: "yellow" },
            { value: 2, color: "yellow" },
            { value: 4, color: "yellow" },
            { value: 1, color: "yellow" },
          ],
        },
        {
          label: "Step 3 — Level 1 butterflies (stride 2)",
          description:
            "Process adjacent pairs. Each butterfly: top = a + W·b, bottom = a - W·b. At level 1, W = 1 for all pairs (twiddle factor e^0 = 1).",
          array: [
            { value: 5, color: "orange" },
            { value: 7, color: "orange" },
            { value: 6, color: "orange" },
            { value: 6, color: "orange" },
            { value: 4, color: "orange" },
            { value: 2, color: "orange" },
            { value: 6, color: "orange" },
            { value: 2, color: "orange" },
          ],
        },
        {
          label: "Step 4 — Level 2 butterflies (stride 4)",
          description:
            "Combine pairs of 2-point DFTs into 4-point DFTs. Twiddle factors are now W_8^0 = 1 and W_8^1 = e^{-jπ/4}.",
          array: [
            { value: 11, color: "purple" },
            { value: 9, color: "purple" },
            { value: 3, color: "purple" },
            { value: 1, color: "purple" },
            { value: 10, color: "purple" },
            { value: 8, color: "purple" },
            { value: 2, color: "purple" },
            { value: 4, color: "purple" },
          ],
        },
        {
          label: "Step 5 — Level 3 butterflies (stride 8)",
          description:
            "Final level combines two 4-point DFTs into the full 8-point DFT. Twiddle factors W_8^0 through W_8^3 are applied.",
          array: [
            { value: 20, color: "green" },
            { value: 0, color: "green" },
            { value: 0, color: "green" },
            { value: 0, color: "green" },
            { value: 4, color: "green" },
            { value: 0, color: "green" },
            { value: 0, color: "green" },
            { value: 0, color: "green" },
          ],
        },
        {
          label: "Step 6 — Frequency spectrum output",
          description:
            "X[0] = 20 is the DC component (sum of all samples). X[4] = 4 reflects the symmetric structure. All odd bins are zero because the input is symmetric.",
          array: [
            { value: 20, color: "green" },
            { value: 0, color: "gray" },
            { value: 0, color: "gray" },
            { value: 0, color: "gray" },
            { value: 4, color: "green" },
            { value: 0, color: "gray" },
            { value: 0, color: "gray" },
            { value: 0, color: "gray" },
          ],
        },
        {
          label: "Step 7 — Inverse FFT (IFFT)",
          description:
            "IFFT reconstructs the original signal from frequency bins. It is identical to FFT except twiddle factors use +j instead of -j, and the result is divided by N.",
          array: [
            { value: 1, color: "blue" },
            { value: 2, color: "blue" },
            { value: 3, color: "blue" },
            { value: 4, color: "blue" },
            { value: 4, color: "blue" },
            { value: 3, color: "blue" },
            { value: 2, color: "blue" },
            { value: 1, color: "blue" },
          ],
        },
        {
          label: "Step 8 — Verify reconstruction",
          description:
            "IFFT(FFT(x)) = x. The original time-domain signal is perfectly recovered, confirming the transform is unitary (up to the 1/N normalization factor).",
          array: [
            { value: 1, color: "green" },
            { value: 2, color: "green" },
            { value: 3, color: "green" },
            { value: 4, color: "green" },
            { value: 4, color: "green" },
            { value: 3, color: "green" },
            { value: 2, color: "green" },
            { value: 1, color: "green" },
          ],
        },
      ],
    },

    code: {
      language: "python",
      snippet: `import cmath
import math

def fft(x: list[complex]) -> list[complex]:
    """
    Cooley-Tukey radix-2 decimation-in-time FFT.
    Requires len(x) to be a power of 2.
    Returns the DFT of x in O(n log n).
    """
    n = len(x)
    if n == 1:
        return list(x)

    # Split into even and odd indexed sub-sequences
    even = fft(x[0::2])
    odd  = fft(x[1::2])

    # Combine using butterfly operations
    result = [0+0j] * n
    for k in range(n // 2):
        # Twiddle factor: W_n^k = e^{-j * 2*pi*k / n}
        twiddle = cmath.exp(-2j * math.pi * k / n) * odd[k]
        result[k]           = even[k] + twiddle
        result[k + n // 2]  = even[k] - twiddle

    return result


def ifft(X: list[complex]) -> list[complex]:
    """Inverse FFT via conjugate trick: IFFT(X) = conj(FFT(conj(X))) / N."""
    n = len(X)
    conjugated = [x.conjugate() for x in X]
    transformed = fft(conjugated)
    return [v.conjugate() / n for v in transformed]


# Example usage
if __name__ == "__main__":
    signal = [1, 2, 3, 4, 4, 3, 2, 1]
    x = [complex(s) for s in signal]
    X = fft(x)
    print("FFT magnitudes:", [round(abs(v), 4) for v in X])
    recovered = ifft(X)
    print("Recovered:", [round(v.real, 4) for v in recovered])
`,
      annotations: [
        {
          lines: [4, 5, 6, 7, 8, 9],
          note: "Function signature: input must be a power-of-2 length list of complex numbers. Returns the frequency-domain representation.",
        },
        {
          lines: [10, 11, 12],
          note: "Base case: a single-element sequence is its own DFT (trivially X[0] = x[0]).",
        },
        {
          lines: [14, 15, 16],
          note: "Recursive split using Python slice notation: x[0::2] picks even indices, x[1::2] picks odd indices. Each recursive call halves the problem.",
        },
        {
          lines: [18, 19, 20, 21, 22, 23],
          note: "Butterfly combine: compute the twiddle factor once per bin k, then use it for both the upper half (k) and lower half (k + N/2) of the output.",
        },
        {
          lines: [28, 29, 30],
          note: "IFFT via the conjugate trick: conjugate inputs, run forward FFT, conjugate outputs, divide by N. No separate implementation needed.",
        },
        {
          lines: [34, 35, 36, 37, 38],
          note: "Example: the symmetric pulse [1,2,3,4,4,3,2,1] has a real-valued DFT. Magnitudes confirm energy concentrated at DC (k=0) and k=4.",
        },
      ],
    },

    complexity: {
      timeRows: [
        {
          label: "Best",
          value: "O(n log n)",
          color: "#CEEB5A",
        },
        {
          label: "Average",
          value: "O(n log n)",
          color: "#2255CC",
        },
        {
          label: "Worst",
          value: "O(n log n)",
          color: "#E05A3A",
        },
      ],
      spaceRows: [
        {
          label: "Recursive stack",
          value: "O(n log n)",
          color: "#2255CC",
        },
        {
          label: "Iterative (in-place)",
          value: "O(n)",
          color: "#CEEB5A",
        },
      ],
      notes: [
        "The O(n log n) complexity holds for all inputs when N is a power of 2 — there is no best/worst case distinction.",
        "The recursive implementation uses O(n log n) total memory for sub-arrays; an iterative Cooley-Tukey variant operates in-place with O(n) space.",
        "For non-power-of-2 sizes, Bluestein's algorithm or zero-padding to the next power of 2 preserves the O(n log n) bound.",
      ],
    },

    variations: {
      items: [
        "Radix-2 DIT (Decimation-in-Time): the classic Cooley-Tukey split shown here — reorder input by bit-reversal, then apply log₂(N) butterfly stages bottom-up.",
        "Radix-2 DIF (Decimation-in-Frequency): dual formulation — process in natural order, bit-reverse the output. Useful when output order doesn't matter.",
        "Radix-4 FFT: splits into 4 sub-problems per level, reducing the number of twiddle factor multiplications by ~25% compared to radix-2.",
        "Mixed-radix FFT (e.g. FFTW): factorises N into arbitrary prime factors; handles any N efficiently, not just powers of 2.",
        "Number-Theoretic Transform (NTT): FFT over a finite field (modular arithmetic) — used in cryptography and polynomial multiplication for exact integer results.",
      ],
      tips: [
        "Always zero-pad your input to the next power of 2 for maximum efficiency, even if it wastes a few bins.",
        "For real-valued inputs, use the real FFT (rfft) which exploits conjugate symmetry to halve computation and memory.",
        "Apply a window function (Hanning, Hamming, Blackman) before FFT to reduce spectral leakage when the signal is not periodic in the window.",
        "Use numpy.fft or scipy.fft in production — they are highly optimized C/FORTRAN implementations, orders of magnitude faster than pure Python.",
      ],
    },

    summary: {
      keyPoints: [
        "The DFT maps N time-domain samples to N frequency-domain coefficients, revealing which frequencies are present in a signal.",
        "The Cooley-Tukey radix-2 FFT reduces the naive O(N²) DFT to O(N log N) by recursively splitting the problem into even and odd sub-sequences.",
        "Each level of the recursion tree applies N/2 butterfly operations; with log₂(N) levels the total work is O(N log N).",
        "The bit-reversal permutation reorders inputs so that the iterative butterfly passes can proceed in-place without additional memory.",
        "FFT is the foundation of audio processing, image compression (JPEG uses DCT, a variant), wireless communications (OFDM), and numerical PDE solvers.",
        "For real inputs, rfft halves the computation; for arbitrary N, mixed-radix algorithms (FFTW) maintain O(N log N) performance.",
      ],
    },
  },
}

export default function DftVideo() {
  return <AlgoVideo config={config} />
}
