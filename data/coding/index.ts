import type { CodingWorld } from '~/types'
import { orderWorld } from './order'
import { sequenceWorld } from './sequence'
import { gemsWorld } from './gems'
import { predictWorld } from './predict'
import { bugWorld } from './bug'
import { loopsWorld } from './loops'
import { loopsGemsWorld } from './loops-gems'

// All coding worlds, in order (easiest first). A "world" groups levels by
// concept. The array order also drives the level unlock chain.
//
// To add a world: create data/coding/<world>/index.ts exporting a CodingWorld,
// import it here, and insert it at the right difficulty position.
export const codingWorlds: CodingWorld[] = [
  orderWorld,
  sequenceWorld,
  gemsWorld,
  predictWorld,
  bugWorld,
  loopsWorld,
  loopsGemsWorld,
]

// Flat list of every level, in play order (used for unlock logic).
export const codingLevels = codingWorlds.flatMap((w) => w.levels)
