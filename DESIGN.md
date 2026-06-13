# Design System

## Overview

AlgoMotion uses a full-palette visual system inspired by graph paper, educational manipulatives, and precision instruments. The interface should feel physical enough to invite experimentation and rigorous enough to support technical learning.

## Theme

Light-first. The primary scene is a learner exploring algorithms on a laptop in a bright study space, where strong color and crisp structure feel energizing without requiring a dark-room developer aesthetic.

## Color

- Paper: `oklch(96% 0.012 95)`
- Ink: `oklch(19% 0.025 260)`
- Cobalt: `oklch(48% 0.22 265)`
- Signal: `oklch(87% 0.2 118)`
- Coral: `oklch(67% 0.22 30)`
- Mist: `oklch(91% 0.025 245)`

Use cobalt as the committed brand field, signal green for active algorithm state, coral for comparisons and interruptions, and ink for typography. Avoid pure black and white.

## Typography

Geist is the primary family. Display copy uses tight tracking and heavy weight; body copy stays open and readable. Headlines are broad, generally no more than two or three lines. Technical event names use the same family with tabular numerals instead of introducing a decorative monospace.

## Layout

Use a 12-column desktop grid with deliberate asymmetric spans. Major sections have cinematic spacing between them. Product demonstrations may break the content grid but should align to an obvious underlying rhythm. Avoid repeated equal cards.

## Components

- Navigation: compact solid capsule with a high-contrast launch action.
- Buttons: tactile, bordered, and slightly squared; never glassy.
- Interactive stages: large colored fields containing real algorithm state.
- Feature compositions: dense, gapless bento layouts with varied scale.
- Story chapters: pinned explanatory copy paired with scrolling visual demonstrations.

## Motion

Use GSAP for entrance choreography, scroll pinning, and scrubbed text reveals. Use exponential easing and transform/opacity only. Algorithm playback motion should be deterministic and interruptible. Respect `prefers-reduced-motion` by disabling scroll scrubbing and shortening state changes.
