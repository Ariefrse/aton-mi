/* CODE STANDARDS & CONVENTION
  TYPES :
  - Refer to the types/interfaces required for our client/frontend app to work
  - It describes the objects within our client/frontend app
  - It's highly recommended to use types whenever, wherever possible to document our code better
  - Types should be well-documented and maintained to avoid misunderstandings
*/

// Deck.GL Layer Types
export type { Layer, LayersList } from "@deck.gl/core";
export type { LineLayer, ScatterplotLayerProps } from '@deck.gl/layers';
export { HeatmapLayer } from '@deck.gl/aggregation-layers';

// Others
export type ShipTypeColorMap = { [key: number]: string; };