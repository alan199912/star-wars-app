type SchemaResponse = 'Personajes' | 'Planetas' | 'Películas' | 'Naves' | undefined;

const schemaMapping: Record<string, SchemaResponse> = {
  people: 'Personajes',
  planets: 'Planetas',
  films: 'Películas',
  starships: 'Naves',
};

export const getSchemaName = (schema: string): SchemaResponse => {
  return schemaMapping[schema];
};
