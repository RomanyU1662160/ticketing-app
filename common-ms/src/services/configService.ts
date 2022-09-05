
import { MissingEnvVariableError } from "./ErrorHandling.service"

// class Config {
//     private static instance: Config
//     private constructor() { }

//     getInstance() {
//         if (!Config.instance) {
//             Config.instance = new Config()
//         }
//         return Config.instance

//     }
//     getKey = function (key: string) {
//         if (!process.env.key) {
//             throw new MissingEnvVariableError(key)
//         }
//     }
// }
/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
class ConfigSingleton {
    private static instance: ConfigSingleton;

    /**
     * The ConfigSingleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the Configsingleton instance.
     *
     * This implementation let you subclass the ConfigSingleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): ConfigSingleton {
        if (!ConfigSingleton.instance) {
            ConfigSingleton.instance = new ConfigSingleton();
        }

        return ConfigSingleton.instance;

    }
    getKey = function (key: string) {
        console.log('process.env.key :::>>>', key)
        if (!process.env.key) {
            throw new MissingEnvVariableError(`${key} not found in env file`)
        }
        return process.env.key
    }
}




export default ConfigSingleton