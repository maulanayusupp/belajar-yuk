import type { CodingWorld } from '~/types'
import { sequenceWorld } from './sequence'

// All coding worlds, in order. A "world" groups levels by concept.
//
// To add a world: create data/coding/<world>/index.ts exporting a CodingWorld,
// import it here, and append to the array.
export const codingWorlds: CodingWorld[] = [sequenceWorld]

// Flat list of every level, in play order (used for unlock logic).
export const codingLevels = codingWorlds.flatMap((w) => w.levels)
