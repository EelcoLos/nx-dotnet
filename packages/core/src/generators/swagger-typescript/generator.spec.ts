import { Tree } from '@nx/devkit';
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { libraryGenerator } from '@nx/js';

import generator from './generator';

const MOCK_SWAGGER_JSON = JSON.stringify(
  {
    openapi: '3.0.1',
    info: {
      title:
        'NxDotnet.Test.Webapi, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null',
      version: '1.0',
    },
    paths: {
      '/WeatherForecast': {
        get: {
          tags: ['WeatherForecast'],
          operationId: 'GetWeatherForecast',
          responses: {
            '200': {
              description: 'Success',
              content: {
                'text/plain': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/WeatherForecast',
                    },
                  },
                },
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/WeatherForecast',
                    },
                  },
                },
                'text/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/WeatherForecast',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Company: {
          type: 'object',
          properties: {
            CEO: {
              $ref: '#/components/schemas/Person',
            },
            employees: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Person',
              },
              nullable: true,
            },
          },
          additionalProperties: false,
        },
        Person: {
          type: 'object',
          properties: {
            employer: {
              $ref: '#/components/schemas/Company',
            },
          },
          additionalProperties: false,
        },
        Temperature: {
          type: 'object',
          properties: {
            temperatureC: {
              type: 'integer',
              format: 'int32',
            },
            temperatureF: {
              type: 'integer',
              format: 'int32',
              readOnly: true,
            },
          },
          additionalProperties: false,
        },
        WeatherForecast: {
          type: 'object',
          properties: {
            date: {
              type: 'string',
              format: 'date-time',
            },
            temperature: {
              $ref: '#/components/schemas/Temperature',
            },
            summary: {
              type: 'string',
              nullable: true,
            },
            forecaster: {
              $ref: '#/components/schemas/Person',
            },
          },
          additionalProperties: false,
        },
        MyType: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            children: {
              $ref: '#/components/schemas/MyType',
            },
          },
        },
      },
    },
  },
  null,
  2,
);

describe('swagger-typescript generator', () => {
  let tree: Tree;

  beforeEach(async () => {
    tree = createTreeWithEmptyWorkspace({ layout: 'apps-libs' });
    await libraryGenerator(tree, {
      name: 'generated-ts',
      directory: 'libs/generated-ts',
    });
    tree.write('swagger.json', MOCK_SWAGGER_JSON);
  });

  it('should run successfully for OpenAPI 3.0', async () => {
    await generator(tree, {
      openapiJsonPath: 'swagger.json',
      outputProject: 'generated-ts',
    });

    expectFileToMatchSnapshot(
      'libs/generated-ts/src/interfaces/weather-forecast.ts',
      tree,
    );
    expectFileToMatchSnapshot(
      'libs/generated-ts/src/interfaces/temperature.ts',
      tree,
    );
    expectFileToMatchSnapshot(
      'libs/generated-ts/src/interfaces/person.ts',
      tree,
    );
    expectFileToMatchSnapshot(
      'libs/generated-ts/src/interfaces/company.ts',
      tree,
    );
    expectFileToMatchSnapshot(
      'libs/generated-ts/src/interfaces/my-type.ts',
      tree,
    );

    expectFileToMatchSnapshot('libs/generated-ts/src/index.ts', tree);
  });
});

const expectFileToMatchSnapshot = (file: string, tree: Tree) =>
  expect(tree.read(file)?.toString()).toMatchSnapshot(file);
