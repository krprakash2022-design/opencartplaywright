import { faker } from '@faker-js/faker';

export class RandomDataGenerator {

    static randomFirstName(): string {
        return faker.person.firstName();
    }

    static randomLastName(): string {
        return faker.person.lastName();
    }

    static randomFullName(): string {
        return faker.person.fullName();
    }

    static randomEmail(): string {
        return faker.internet.email();
    }

    static randomPhoneNumber(): string {
        return faker.phone.number();
    }

    static randomUserName(): string {
        return faker.internet.username();
    }

    static randomPassword(): string {
        return faker.internet.password();
    }

    static randomCity(): string {
        return faker.location.city();
    }

    static randomCountry(): string {
        return faker.location.country();
    }

    static randomState(): string {
        return faker.location.state();
    }

    static randomZipCode(): string {
        return faker.location.zipCode();
    }

    static randomStreetAddress(): string {
        return faker.location.streetAddress();
    }
    static getrandompassword(length: number=10):string{
        return faker.internet.password({length})
    }
    static randomalphanumaric(lenght:number):string{
        return faker.string.alphanumeric(lenght)
    }
    static getrandomnumaric(lenght:number):string{
        return faker.string.numeric(lenght)
    }
    static getramdomUUID():string{
        return faker.string.uuid();
    }




}