import { Injectable } from '@nestjs/common';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Unidade } from './interface/unidade.interface';
import { CreateUnidadeDTO } from './dto/unidade.dto';

@Injectable()
export class UnidadeService {
    constructor(@InjectModel('Unidade')private unidadeModel:Model<Unidade>){

    }
    async getUnidades():Promise <Unidade[]>{
        const unidades = await this.unidadeModel.find();
        
        return unidades;

    }
    async getUnidade(unidadeId:string):Promise<Unidade>{
        const unidade = await this.unidadeModel.findById(unidadeId);
        
        return unidade;
    }
    async createUnidade(createUnidadeDTO:CreateUnidadeDTO):Promise<Unidade>{
        const unidade = new this.unidadeModel(createUnidadeDTO);
        return await unidade.save();
    }
    async updateUnidade(unidadeID:string,createUnidadeDTO:CreateUnidadeDTO):Promise<Unidade>{
        const updatedUnidade = this.unidadeModel.findByIdAndUpdate(unidadeID,createUnidadeDTO,{new:true});
        return updatedUnidade;        
    }
    async deleteUnidade(unidadeID:string):Promise<Unidade>{
        const unidade = await this.unidadeModel.findByIdAndDelete(unidadeID);
        return unidade;        
    }
}
