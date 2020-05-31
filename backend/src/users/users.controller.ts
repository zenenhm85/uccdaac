import { Controller, Post, Res, HttpStatus, Body, Get, Param, NotFoundException, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateUserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter, editFileName } from '../utils/file-uploading.utils';
import { diskStorage } from 'multer';


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get('/:username')
    async getUser(@Res() res, @Param('username') username: string) {
        const user = await this.userService.getUser(username);
        if (!user) {
            throw new NotFoundException('Este Usuário não existe');
        }
        return res.status(HttpStatus.OK).json({
            user
        });
    }
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getUsers(@Res() res) {
        const users = await this.userService.getUsers();
        return res.status(HttpStatus.OK).json({
            users
        });
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(
        FileInterceptor('file0', {
            storage: diskStorage({
                destination: './uploads',
                filename: editFileName
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;
    }
    @Get('img/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './uploads' });
    }
}
