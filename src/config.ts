console.log(process.env["NODE_ENV"]);

export type ProcessNodeEnv = "production" | "uat" | "development";
const env: ProcessNodeEnv = process.env["NODE_ENV"] as ProcessNodeEnv;

// login request proxy fieId
export const _LoginRequestBaseURL: string = env === "production"
    ? '/DLSP-PROD'
    : (env === "uat"
        ? "/DLSP-TEST"
        : "/DLSP-DEV"
    );

// professional request proxy fieId
export const _IMPFRequestBaseURL: string = env === "production"
    ? '/DSSP-PROD'
    : (env === "uat"
        ? "/DSSP-TEST"
        : "/DSSP-DEV"
    );

// websocket target
export const _WSLocation: string = env === "production"
    ? 'wss://sdk-websocket.sammbo.com:8326'
    : (env === "uat"
        ? "wss://sdktest-websocket.sammbo.com:18326"
        : "wss://sdkdev-websocket.sammbo.com:8326"
    );

// sim login use fieId
export const _IMAppId: string = '1000000217';

// login terminal
export const _IMTerminal: string = '1';

// commutation meta params
export const _IMAppVersion: string = '0.0.1';

// commutation meta params
export const _IMBundleId: string = 'developer.sammbo.com';

// save to memory message length (single chat)
export const _DEMOSaveToMemoryMsgLength: number = 30;


