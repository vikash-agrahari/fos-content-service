import * as i18n from 'i18n';
import { Request, Response, NextFunction } from 'express';
import { DATABASE } from '../../common/constants';

class I18n {
    constructor() {
        this.loadLocaleConfig();
    }

    // Configuring locale files and language using header settings
    private loadLocaleConfig() {
        i18n.configure({
            updateFiles: false,
            locales: [DATABASE.LANGUAGE.EN, DATABASE.LANGUAGE.SP],
            directory: './locales',
            header: 'lang',
        });
    }

    public initLocale = async function (req: Request, res: Response, next: NextFunction) {
        const language = <string>req.headers['lang'] || DATABASE.LANGUAGE.EN;
        console.log(language);
        i18n.setLocale(language);
        i18n.init(req, res);
        return next();
    };
}

export const i18nLocale = new I18n().initLocale;
