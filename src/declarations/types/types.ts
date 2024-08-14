import { Layer, LayersList } from "@deck.gl/core";
import { LineLayer, ScatterplotLayerProps } from '@deck.gl/layers';
import { HeatmapLayer } from '@deck.gl/aggregation-layers';

/* CODE STANDARDS & CONVENTION
  TYPES :
  - Refer to the types/interfaces required for our client/frontend app to work
  - It describes the objects within our client/frontend app
  - It's highly recommended to use types whenever, wherever possible to document our code better
  - Types should be well-documented and maintained to avoid misunderstandings

  NAMING STANDARD :
  - Types prefixed with "T" means our own custom type
  - All types from 3rd party libraries should be imported here prefixed with "T"
  - This is to ease refactoring of Types and imports
*/

// LAYER TYPES

// Deck.GL Layer Types
export type TLayer = Layer | undefined | false | null | LayersList
export type TLayersList = LayersList
export class TLineLayer extends LineLayer { }
export class THeatmapLayer extends HeatmapLayer { }
export type TScatterplotLayerProps = ScatterplotLayerProps

// Others
export type TShipTypeColorMapping = { [key: number]: string; };