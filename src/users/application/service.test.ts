
import { CreatedResponse, NotFoundResponse, SuccessResponse } from "../../utils/responses"
import { UserEntity } from "../domain/entities/user"
import { UserService } from "./services"

describe("UserService", () => {
    let repository:any;
    let service:any;

    beforeEach(() => {
        repository = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn()
        };
        service = UserService(repository);
    });

    test("findAll should return a list of users", async () => {
        const mockUsers = [{ id: "1", name: "John Doe" }];
        repository.findAll.mockResolvedValue(mockUsers);
        jest.spyOn(UserEntity, 'fromItem').mockImplementation(user => user as UserEntity);

        const response = await service.findAll();
        
        expect(repository.findAll).toHaveBeenCalled();
        expect(response).toEqual(SuccessResponse(mockUsers.map(UserEntity.fromItem as any)));
    });

    test("findAll should return an empty list if no users exist", async () => {
        repository.findAll.mockResolvedValue([]);

        const response = await service.findAll();
        
        expect(repository.findAll).toHaveBeenCalled();
        expect(response).toEqual(SuccessResponse([]));
    });

    test("findOne should return a user if found", async () => {
        const mockUser = { id: "1", name: "John Doe" };
        repository.findOne.mockResolvedValue(mockUser);
        jest.spyOn(UserEntity, 'fromItem').mockImplementation(user => user as UserEntity);

        const response = await service.findOne("1");
        
        expect(repository.findOne).toHaveBeenCalledWith({ id: "1" });
        expect(response).toEqual(SuccessResponse(UserEntity.fromItem(mockUser as any)));
    });

    test("findOne should return NotFoundResponse if user is not found", async () => {
        repository.findOne.mockResolvedValue(null);

        const response = await service.findOne("1");
        
        expect(repository.findOne).toHaveBeenCalledWith({ id: "1" });
        expect(response).toEqual(NotFoundResponse("User not found"));
    });

    test("create should return CreatedResponse with created user", async () => {
        const newUser = { name: "John Doe" };
        const createdUser = { id: "1", name: "John Doe" };
        repository.create.mockResolvedValue(createdUser);
        jest.spyOn(UserEntity, 'fromItem').mockImplementation(user => user as UserEntity);

        const response = await service.create(newUser);
        
        expect(repository.create).toHaveBeenCalledWith(newUser);
        expect(response).toEqual(CreatedResponse(UserEntity.fromItem(createdUser as any)));
    });

    test("create should throw an error if repository.create fails", async () => {
        const newUser = { name: "John Doe" };
        repository.create.mockRejectedValue(new Error("Database error"));

        await expect(service.create(newUser)).rejects.toThrow("Database error");
        expect(repository.create).toHaveBeenCalledWith(newUser);
    });
});
