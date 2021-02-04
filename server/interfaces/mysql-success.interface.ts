/**
 * MySQL2 Success response for create, update and deletion
 */
export interface MysqlSuccessInterface{
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
}
