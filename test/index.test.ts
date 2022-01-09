import { assert } from 'chai';
import {
    IsExact,
    assert as ctcAssert,
} from 'conditional-type-checks';
import {
    assertNonNullable,
    extractNonNullableEnvVar,
    extractNumberEnvVar,
} from '../src';

describe('assertNonNullable', () => {
    beforeEach(() => {
        process.env.A = 'a';
    });

    afterEach(() => {
        delete process.env.A;
    });

    it('should assert existence of a predefined variable', () => {
        const { A } = process.env;

        assertNonNullable('A', A);

        ctcAssert<IsExact<typeof A, string>>(true);
    });

    it('should not assert existence of a non-defined variable', () => {
        const { B } = process.env;

        assert.throw(
            () => assertNonNullable('B', B),
        );
    });
});

describe('extractNonNullableEnvVar', () => {
    beforeEach(() => {
        process.env.A = 'a';
    });

    afterEach(() => {
        delete process.env.A;
    });

    it('should extract a predefined variable', () => {
        const A = extractNonNullableEnvVar('A');

        assert.equal(A, 'a');
    });

    it('should not should extract a non-defined variable', () => {
        assert.throw(
            () => extractNonNullableEnvVar('B'),
        );
    });
});

describe('extractNumberEnvVar', () => {
    beforeEach(() => {
        process.env.NUMBER = '2.1';
        process.env.STRING = 'a';
    });

    afterEach(() => {
        delete process.env.NUMBER;
        delete process.env.STRING;
    });

    it('should extract a predefined variable holding a number', () => {
        const NUMBER = extractNumberEnvVar('NUMBER');

        assert.equal(NUMBER, 2.1);
    });

    it('should not should extract a predefined variable holding a string', () => {
        assert.throw(
            () => extractNumberEnvVar('STRING'),
        );
    });

    it('should not should extract a non-defined variable', () => {
        assert.throw(
            () => extractNumberEnvVar('NON_DEFINED'),
        );
    });
});
