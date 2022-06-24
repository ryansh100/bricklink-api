import test from 'ava';
import {Client, Color, BrickLinkApiError} from '../src/';
import {config} from './test.config';

/** @type {Client} */
let BL;
test.before(() => {
    BL = new Client(config);
});

test('Will reject if the Bricklink servers return an error code', (t) => {
    const request = Color.get(400000000000000000);
    return t.throwsAsync(() => BL.send(request));
});

test('Will throw BrickLinkApiError exception if the Bricklink servers return an error code', (t) => {
    const request = Color.get(400000000000000000);
    return t.throwsAsync(() => BL.send(request), {
        instanceOf: BrickLinkApiError,
        message: 'PARAMETER_MISSING_OR_INVALID'
    }).then(
        /**
         * @param {BrickLinkApiError} error The object containing error data.
         */
        error => {
            t.is(error.meta.code, 400);
            t.is(error.meta.description, 'Unparseable data [400000000000000000] for [color_id].');
            t.is(error.meta.message, 'PARAMETER_MISSING_OR_INVALID');
        });
});
