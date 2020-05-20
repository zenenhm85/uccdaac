import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Put } from '@nestjs/common';

import { CreateUnidadeDTO } from './dto/unidade.dto';
import { UnidadeService } from './unidade.service';

@Controller('unidade')
export class UnidadeController {

    constructor(private unidadeService: UnidadeService) { }

    @Post('/create')
    async unidadeCreate(@Res() res, @Body() createUnidadeDTO: CreateUnidadeDTO) {
        const now = new Date();        
        createUnidadeDTO.created_at = now;
        createUnidadeDTO.updated_at = now;
        const unidade = await this.unidadeService.createUnidade(createUnidadeDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Unidade orgânica criada com sucesso',
            unidade
        });

    }
    @Get('/')
    async getUnidades(@Res() res) {
        const unidades = await this.unidadeService.getUnidades();
        return res.status(HttpStatus.OK).json({
            unidades
        });
    }
    @Get('/:unidadeID')
    async getUnidade(@Res() res, @Param('unidadeID') unidadeID: string) {
        const unidade = await this.unidadeService.getUnidade(unidadeID);
        if (!unidade) {
            throw new NotFoundException('Esta unidade orgânica não existe');
        }
        return res.status(HttpStatus.OK).json({
            unidade
        });
    }
    @Delete('/delete/:unidadeID')
    async deleteUnidade(@Res() res, @Param('unidadeID') unidadeID: string) {
        const unidade = await this.unidadeService.deleteUnidade(unidadeID);
        if (!unidade) {
            throw new NotFoundException('Esta unidade orgânica não existe');
        }
        return res.status(HttpStatus.OK).json({
            unidade
        });
    }
    @Put('/update/:unidadeID')
    async updateUnidade(@Res() res, @Param('unidadeID') unidadeID: string, @Body() updateUnidadeDTO: CreateUnidadeDTO) {
        const now = new Date();        
        updateUnidadeDTO.updated_at = now;
        const unidade = await this.unidadeService.updateUnidade(unidadeID, updateUnidadeDTO);
        if (!unidade) {
            throw new NotFoundException('Esta unidade orgânica não existe');
        }
        return res.status(HttpStatus.OK).json({
            unidade
        });
    }


}
