import {
  recalculateMandataireMesuresCount,
  recalculateServiceMesuresCount
} from "./mutation";
import { enqueteIndividuelReponse } from "./query/enquetes";
import {
  availableMesureNumber,
  closedMesureNumber,
  departmentAvailabilities,
  mesureTypeCategoryEvolution,
  mesureTypeCategoryStatistics,
  newMesureNumber,
  openMesureNumber
} from "./query/mesure-stat";

export const resolvers = {
  Mutation: {
    recalculateMandataireMesuresCount,
    recalculateServiceMesuresCount
  },
  Query: {
    availableMesureNumber,
    closedMesureNumber,
    departmentAvailabilities,
    enqueteIndividuelReponse,
    mesureTypeCategoryEvolution,
    mesureTypeCategoryStatistics,
    newMesureNumber,
    openMesureNumber
  }
};

export default resolvers;
