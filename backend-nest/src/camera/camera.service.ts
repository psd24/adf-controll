import {Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository, SelectQueryBuilder} from 'typeorm';
import {Camera} from '../entities/camera.entity';
import {CameraType} from '../entities/camera-type.entity';
import {Organization} from '../entities/organization.entity';
import {CameraDto} from './dtos/camera.dto';
import {CameraCreateDto} from './dtos/cameraCreate.dto';
import {CameraTypeDto} from './dtos/camera-type.dto';
import {FilterDto} from './dtos/filter.dto';
import {FilterWebDto} from './dtos/filter-web.dto';
import {AssignCameraDto} from "./dtos/assignCamera.dto";
import {UsersService} from "../users/users.service";
import {User} from "../entities/user.entity";
import {CameraUser} from "../entities/cameraUser.entity";


@Injectable()
export class CameraService {
    constructor(
        @InjectRepository(Camera)
        private readonly cameraRepository: Repository<Camera>,
        @InjectRepository(CameraType)
        private readonly cameraTypeRepository: Repository<CameraType>,
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(CameraUser)
        private readonly cameraUserRepository: Repository<CameraUser>,
    ) {
    }

    async getCamera() {
        return this.cameraRepository.find({
                relations: ["organization", "cameraType"],
                where: [{state: 1}],
            },
        );
    }


     getFilterQuery = async (filter: FilterDto, userId: number) => {
        if(filter.name && (filter.state>=0 || filter.state <=2)){
            return  await this.cameraUserRepository.createQueryBuilder('cameraUser')
                .innerJoinAndSelect('cameraUser.camera', 'camera')
                .innerJoinAndSelect('cameraUser.organization', 'organization')
                .innerJoinAndSelect('cameraUser.cameraType', 'cameraType')
                .innerJoin('cameraUser.user', 'user')
                .where('camera.state = :state and camera.name = :name and user.id = :userId',
                    { state: filter.state, name:filter.name,userId:userId })
                .getManyAndCount();
        }else if(filter.name){
            return  await this.cameraUserRepository.createQueryBuilder('cameraUser')
                .innerJoinAndSelect('cameraUser.camera', 'camera')
                .innerJoinAndSelect('cameraUser.organization', 'organization')
                .innerJoinAndSelect('cameraUser.cameraType', 'cameraType')
                .innerJoin('cameraUser.user', 'user')
                .where('camera.name = :name and user.id = :userId',
                    { name:filter.name,userId:userId })
                .getManyAndCount();
        }else if(filter.state>=0 || filter.state <=2 ){
            return  await this.cameraUserRepository.createQueryBuilder('cameraUser')
                .innerJoinAndSelect('cameraUser.camera', 'camera')
                .innerJoinAndSelect('cameraUser.organization', 'organization')
                .innerJoinAndSelect('cameraUser.cameraType', 'cameraType')
                .innerJoin('cameraUser.user', 'user')
                .where('camera.state = :state and user.id = :userId',
                    { state: filter.state,userId:userId })
                .getManyAndCount();
        }else {
            return  await this.cameraUserRepository.createQueryBuilder('cameraUser')
                .innerJoinAndSelect('cameraUser.camera', 'camera')
                .innerJoinAndSelect('cameraUser.organization', 'organization')
                .innerJoinAndSelect('cameraUser.cameraType', 'cameraType')
                .innerJoin('cameraUser.user', 'user')
                .where('user.id = :userId',
                    { userId:userId })
                .getManyAndCount();
        }

}


    async getCameraUserWeb(filter: FilterDto, userId: number) {

        return await this.getFilterQuery(filter,userId)
    }

    async getCameraUserWebId(userId: number) {
        return  this.cameraUserRepository.createQueryBuilder('cameraUser')
                .innerJoinAndSelect('cameraUser.camera', 'camera')
                .innerJoinAndSelect('cameraUser.organization', 'organization')
                .innerJoinAndSelect('cameraUser.cameraType', 'cameraType')
                .innerJoin('cameraUser.user', 'user')
                .where('user.id = :userId',
                    { userId:userId }).getManyAndCount()
    }

    async getCameraWeb(filterWeb: FilterWebDto) {
        return this.cameraRepository.find(filterWeb.query);  
    }

    async createCamera(cameraCreateDto: CameraCreateDto): Promise<Camera> {
        let url;
        const newCamera = new Camera();
        newCamera.ip = cameraCreateDto.ip;
        newCamera.name = cameraCreateDto.name
        newCamera.port = cameraCreateDto.port;
        newCamera.user = cameraCreateDto.user;
        newCamera.lat = cameraCreateDto.lat;
        newCamera.lon = cameraCreateDto.lon;
        newCamera.state = cameraCreateDto.state;
        newCamera.password = cameraCreateDto.password;
        newCamera.organization = await this.organizationRepository.findOne({id: cameraCreateDto.organizationId});
        newCamera.cameraType = await this.cameraTypeRepository.findOne({id: cameraCreateDto.cameraTypeId});

        if (cameraCreateDto.cameraTypeId === 1) {
            url = `http://${cameraCreateDto.ip}:${cameraCreateDto.port}/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=${cameraCreateDto.user}&pwd=${cameraCreateDto.password}`;
            newCamera.url = url;
        }
        if (cameraCreateDto.cameraTypeId === 2) {
            url = `http://${cameraCreateDto.ip}:${cameraCreateDto.port}/onvifsnapshot/media_service/snapshot?channel=1&subtype=0`;
            // http://pvidiba:incendis19@185.73.168.32/cgi-bin/snapshot.cgi?chn=0&u=pvidiba&p=incendis19
            newCamera.url = url
        } else {
            cameraCreateDto;
        }
        console.log(newCamera);
        return this.cameraRepository.save(newCamera);
    }

    async getCameraId(_id: number): Promise<Camera> {
        return await this.cameraRepository.findOne({
            where: [{id: _id}],
            relations: ["organization", "cameraType"]
        });
    }

    async updateCamera(cameraDto: CameraDto): Promise<Camera> {
        let url;
        const newCamera = new Camera();
        newCamera.id = cameraDto.id;
        newCamera.ip = cameraDto.ip;
        newCamera.name = cameraDto.name
        newCamera.port = cameraDto.port;
        newCamera.user = cameraDto.user;
        newCamera.password = cameraDto.password;
        newCamera.lat = cameraDto.lat;
        newCamera.lon = cameraDto.lon;
        newCamera.state = cameraDto.state;
        newCamera.organization = await this.organizationRepository.findOne({id: cameraDto.organizationId});
        newCamera.cameraType = await this.cameraTypeRepository.findOne({id: cameraDto.cameraTypeId});

        if (cameraDto.cameraTypeId === 1) {
            url = `http://${cameraDto.ip}:${cameraDto.port}/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=${cameraDto.user}&pwd=${cameraDto.password}`;
            newCamera.url = url;
        }
        if (cameraDto.cameraTypeId === 2) {
            url = `http://${cameraDto.ip}:${cameraDto.port}/onvifsnapshot/media_service/snapshot?channel=1&subtype=0`;
            newCamera.url = url
        } else {
            cameraDto;
        }
        return this.cameraRepository.save(newCamera);
    }

    async deleteCamera(camera: Camera) {
        return this.cameraRepository.delete(camera);
    }

    // CAMERA TYPE

    async getCameraType() {
        return this.cameraTypeRepository.find();
    }

    async createCameraType(cameraTypeDto: CameraTypeDto): Promise<CameraType> {
        return this.cameraTypeRepository.save(cameraTypeDto);
    }

    async getCameraTypeId(_id: number): Promise<CameraType> {
        return await this.cameraTypeRepository.findOne({
            where: [{id: _id}],
        });
    }

    async updateCameraType(cameraType: CameraType): Promise<CameraType> {
        return this.cameraTypeRepository.save(cameraType);
    }

    async deleteCameraType(cameraType: CameraType) {
        return this.cameraTypeRepository.delete(cameraType);
    }


    getRandomNumber = (totalResult: number) => {
        return Math.floor(Math.random() * (totalResult) + 1);
    }

    async getRandomActiveCamera(): Promise<Camera> {

        const totalResult = await this.cameraRepository.count()
        let camera
        while (true) {
            camera = await this.cameraRepository.findOne({
                where: [{id: this.getRandomNumber(totalResult), state: 1}]
            })
            if (camera) {
                break;
            }
        }
        return camera
    }



    getCameraById = async (cameraId:number) => {
        return await this.cameraRepository.findOne({where:[{id:cameraId}]})
    }

    getUserById = async (userId:number) => {
        return this.userRepository.findOne({where:[{id:userId}]})
    }

    getCameraUser = async (user:User,camera:Camera) => {
        return this.cameraUserRepository.findOne({where:[
                {
                    camera:camera,
                    user:user
                }
            ]})
    }

    assignCameraToUser = async (assignCameraDto: AssignCameraDto) => {

        const user: User = await this.getUserById(assignCameraDto.userId)
        for (const cameraId of assignCameraDto.assignCameraIdList) {
            const camera: Camera = await this.getCameraId(cameraId)
            if (camera) {
                const cameraType:CameraType = await this.cameraTypeRepository.findOne({where:[{id:camera.cameraType.id}]})
                const organization:Organization = await this.organizationRepository.findOne({where:[{id:camera.organization.id}]})
                let cameraUser = await this.getCameraUser(user,camera)
                if (!cameraUser) {
                    cameraUser = new CameraUser()
                }
                cameraUser.camera = camera
                cameraUser.user = user
                cameraUser.organization = organization
                cameraUser.cameraType = cameraType
              await this.cameraUserRepository.save(cameraUser)
            }
        }

        for(let cameraId of assignCameraDto.unAssignCameraIdList){
            const camera: Camera = await this.getCameraId(cameraId)
            if (camera) {
                let cameraUser = await this.getCameraUser(user,camera)
                if(cameraUser) await this.cameraUserRepository.delete(cameraUser)
            }
        }



        return {message: "Successfully assigned camera to user", status: 201}

    }

    async countStateCamera() {
        const inactive = await this.cameraRepository.count({
            where: [{state: 0}],
        });
        const active = await this.cameraRepository.count({
            where: [{state: 1}],
        });
        const pending = await this.cameraRepository.count({
            where: [{state: 2}],
        });
        return {'inactive': inactive, 'active': active, 'pending': pending}
    }
}
