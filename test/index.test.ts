import { assert } from 'chai';
import {
    IsExact,
    assert as ctcAssert,
} from 'conditional-type-checks';
import {
    assertNonNullable,
    extractBooleanEnvVar,
    extractIntegerEnvVar,
    extractStringEnvVar,
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
        const A = extractStringEnvVar('A');

        assert.equal(A, 'a');
    });

    it('should not should extract a non-defined variable', () => {
        assert.throw(
            () => extractStringEnvVar('B'),
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

describe('extractIntegerEnvVar', () => {
    beforeEach(() => {
        process.env.INTEGER = '2';
        process.env.STRING = 'a';
    });

    afterEach(() => {
        delete process.env.INTEGER;
        delete process.env.STRING;
    });

    it('should extract a predefined variable holding a integer', () => {
        const INTEGER = extractIntegerEnvVar('INTEGER');

        assert.equal(INTEGER, 2);
    });

    it('should not should extract a predefined variable holding a string', () => {
        assert.throw(
            () => extractIntegerEnvVar('STRING'),
        );
    });

    it('should not should extract a non-defined variable', () => {
        assert.throw(
            () => extractIntegerEnvVar('NON_DEFINED'),
        );
    });
});

describe('extractBooleanEnvVar', () => {
    beforeEach(() => {
        process.env.TRUE = '1';
        process.env.FALSE = '0';
        process.env.STRING = 'a';
    });

    afterEach(() => {
        delete process.env.TRUE;
        delete process.env.FALSE;
        delete process.env.STRING;
    });

    it('should extract a predefined variable holding 1', () => {
        const TRUE = extractBooleanEnvVar('TRUE');

        assert.isTrue(TRUE);
    });

    it('should extract a predefined variable holding 0', () => {
        const FALSE = extractBooleanEnvVar('FALSE');

        assert.isFalse(FALSE);
    });

    it('should not should extract a predefined variable holding a string', () => {
        assert.throw(
            () => extractBooleanEnvVar('STRING'),
        );
    });

    it('should not should extract a non-defined variable', () => {
        assert.throw(
            () => extractBooleanEnvVar('NON_DEFINED'),
        );
    });
});
