import { config } from './src/providers/aws/secret-manager';
(async () => {
    await config.loadCreds();
    try {
        const app = await import('./src/bootstrap/bootstrap');
        new app.Bootstrap();
    } catch (error) {
        console.log(error);
    }
})();
