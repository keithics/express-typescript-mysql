/**
 * Person model interface
 */
export interface PersonInterface {
    id?: number;
    name: string;
    surname: string;
    age?: number;
    gender?: string;
    birthday?: string | Date;
    phone?: string;
    email: string;
    contacts?: [string];
    create?: Date;
    modified?: Date;
}
