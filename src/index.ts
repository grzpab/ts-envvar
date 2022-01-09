export function assertNonNullable<T>(
    name: string,
    value: T | null | undefined,
): asserts value is NonNullable<T> {
    if (value === null || value === undefined) {
        const message = `Variable "${name}" cannot be "${String(value)}".`;

        throw new Error(message);
    }
}

export function extractStringEnvVar(
    key: keyof NodeJS.ProcessEnv,
): string {
    const value = process.env[key];

    if (value === undefined) {
        const message = `The environment variable "${key}" cannot be "undefined".`;

        throw new Error(message);
    }

    return value;
}

export function extractNumberEnvVar(
    key: keyof NodeJS.ProcessEnv,
): number {
    const stringValue = extractStringEnvVar(key);

    const numberValue = parseFloat(stringValue);

    if (Number.isNaN(numberValue)) {
        const message = `The environment variable "${key}" has to hold a stringified number value - not ${stringValue}`;

        throw new Error(message);
    }

    return numberValue;
}

export function extractIntegerEnvVar(
    key: keyof NodeJS.ProcessEnv,
): number {
    const stringValue = extractStringEnvVar(key);

    const numberValue = parseInt(stringValue, 10);

    if (Number.isNaN(numberValue)) {
        const message = `The environment variable "${key}" has to hold a stringified integer value - not ${stringValue}`;

        throw new Error(message);
    }

    return numberValue;
}

export function extractBooleanEnvVar(
    key: keyof NodeJS.ProcessEnv,
): boolean {
    const value = extractIntegerEnvVar(key);

    return Boolean(value);
}
