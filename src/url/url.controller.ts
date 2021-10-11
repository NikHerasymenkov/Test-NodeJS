import {Controller, Post, Body, Res, HttpStatus, Get, Param, Render} from '@nestjs/common';
import {Response} from 'express';
import {UrlService} from './url.service';
import {ProcessUrlDto} from './dto/process-url.dto';
import {generate} from 'shortid';
import {isUri} from 'valid-url';


@Controller()
export class UrlController {
    constructor(private readonly urlService: UrlService) {
    }

    @Post('/shortener')
    async shortener(
        @Body() url: ProcessUrlDto,
        @Res() res: Response,
    ): Promise<any> {
        url.urlCode = generate();

        if (isUri(url.longUrl)) {
            try {
                const existingUrl = await this.urlService.findExistingURL(url);
                if (existingUrl) {
                    return res.json(existingUrl);
                } else {
                    url.shortUrl = `${process.env.BASE_URL}/${url.urlCode}`;
                    await this.urlService.associateUrls(url);
                    return res.redirect('/');
                }
            } catch (error) {
                return res.status(HttpStatus.SERVICE_UNAVAILABLE).json(error.message);
            }
        } else {
            return res.status(HttpStatus.BAD_REQUEST).json('The url is not active!');
        }
    }

    @Get('/')
    @Render('index')
    async allUrl(@Res() res): Promise<any> {
        const someUrls = await this.urlService.findAllUrl()
        return {someUrls}
    }

    @Get("/:urlCode")
    async shortUrl(@Param() params, @Res() res: Response): Promise<any> {
        const findUrl = await this.urlService.findUrl(params);
        return res.redirect(findUrl.longUrl)
    }

}
