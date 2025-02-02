import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    tableName: "database_personalite",
    timestamps: false
})

class Message extends Model {    

    @Column({type: DataType.STRING(100)})
    declare email: string

    @Column({ type: DataType.STRING(100) })
    declare nombre: string;

    @Column({ type: DataType.STRING(100) })
    declare url: string;
}

export default Message