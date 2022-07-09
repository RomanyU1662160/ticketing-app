import mockedEnv, { RestoreFn } from 'mocked-env';

let restore:RestoreFn 

// No need to use the mockedEnv.mock() method,used .env-test.ts instead

export const setTestEnv = () => {
 restore = mockedEnv({
    DB_USE_LOCAL_MONGO: 'true',
})
}

export const restoreEnv = () => {
    restore();
}


