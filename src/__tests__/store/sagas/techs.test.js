import { runSaga } from 'redux-saga';
import MockAdapter from 'axios-mock-adapter';
import api from '~/services/api';

import { getTechsSucess, getTechsFailure } from '~/store/modules/techs/actions';
import { getTechs } from '~/store/modules/techs/sagas';

const apiMock = new MockAdapter(api);

describe('Techs saga', () => {
    it('shoul be able to fetch techs', async () => {
        const dispatch = jest.fn();

        apiMock.onGet('techs').reply(200, ['Node.js']);

        await runSaga({dispatch}, getTechs).toPromise();

        expect(dispatch).toHaveBeenCalledWith(getTechsSucess(['Node.js']))

    });

    it('shoul fail when api returns error', async () => {
        const dispatch = jest.fn();

        apiMock.onGet('techs').reply(500);

        await runSaga({dispatch}, getTechs).toPromise();

        expect(dispatch).toHaveBeenCalledWith(getTechsFailure())

    });
})