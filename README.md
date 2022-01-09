# @grzpab/ts-envvar

A library for managing environment variables in TypeScript projects.

## Content
The library contains five functions, one for asserting non-nullability and four 
for extracting values with a specific type.

These are the following:
* `assertNonNullable`,
* `extractStringEnvVar`, 
* `extractNumberEnvVar`, 
* `extractIntegerEnvVar`,
* `extractBooleanEnvVar`.

### assertNonNullable
This function acts as a TypeScript assertion for non-nullable values:
* if the provided value is nullable, it throws an error,
* if the provided value is non-nullable, it asserts its type to be non-nullable.

An exemplary usage:
```typescript
const { A } = process.env;

assertNonNullable('A', A);
```

### extractStringEnvVar
This function extracts the string value of an indicated environment variable or 
throws an error, should the variable be not present.

An example is available below:
```typescript
const A = extractStringEnvVar('A');
```

### extractNumberEnvVar
This function extracts the value of an indicated environment variable and casts
it to a number. If the variable is not present or the function cannot cast the
value into a number, it will throw an error.

Check the usage below:
```typescript
const A = extractNumberEnvVar('A');
```

### extractIntegerEnvVar
This function extracts the value of an indicated environment variable and casts
it to an integer. If the variable is not present or the function cannot cast the
value into an integer, it will throw an error.

Check the usage below:
```typescript
const A = extractIntegerEnvVar('A');
```

### extractBooleanEnvVar
This function extracts the value of an indicated environment variable and casts
it to a boolean. If the variable is not present or the function cannot cast the
value into a boolean, it will throw an error.

Check the usage below:
```typescript
const A = extractBooleanEnvVar('A');
```
