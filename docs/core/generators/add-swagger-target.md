---
title: '@nx-dotnet/core:add-swagger-target'
---

# @nx-dotnet/core:add-swagger-target

## Swagger Target Generator

Add a swagger target to a webapi based project to extract swagger.json into a newly generated library project. Optionally, also creates a project for code generation of the extracted swagger specification.

## Options

### swaggerDoc

- (string): Which version of the swagger spec should be used?

Default: `"v1"`

### startupAssembly

- (string): Path from workspace root to the built api&#39;s startup dll file. If null, will be auto-discovered.

### <span class="required">project</span>

- (string): Which project should the target be added to?

### projectRoot

- (string): Path from workspace root to the project&#39;s root directory. Used in case the given project is not on the generator tree to create a new project.json.

### target

- (string): What should the swagger target be called?

Default: `"swagger"`

### swaggerProject

- (string): What should the swagger project be called?

### codegenProject

- (string): What should the codegen project be called? If null, the project will not be created.

### useOpenApiGenerator

- (boolean): If the codegen project is to be created, should the codegen target use openapi-generator-cli?

Default: `"true"`