import mockedEnv, { RestoreFn } from 'mocked-env';

let restore:RestoreFn 

export const setTestEnv = () => {
 restore = mockedEnv({
    DB_USE_LOCAL_MONGO: 'true',
})
}

export const restoreEnv = () => {
    restore();
}


