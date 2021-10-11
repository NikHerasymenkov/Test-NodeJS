import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ProcessUrlDto} from "./dto/process-url.dto";
import {UrlEntity} from "./entities/url.entity";
import {UrlInterface} from "./interface/url.interface";


@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlService: Repository<UrlEntity>
    ) {
    }

    async associateUrls(url: ProcessUrlDto): Promise<UrlInterface> {
        return await this.urlService.save(url)
    }

    async findExistingURL(url: ProcessUrlDto): Promise<UrlInterface> {
        return await this.urlService.findOne({longUrl: url.longUrl});
    }

    async findAllUrl(): Promise<UrlEntity[]> {
        return await this.urlService.find()
    }

    async findUrl(url: UrlEntity): Promise<UrlEntity> {
        return await this.urlService.findOne({where: {urlCode: url.urlCode}});
    }

}