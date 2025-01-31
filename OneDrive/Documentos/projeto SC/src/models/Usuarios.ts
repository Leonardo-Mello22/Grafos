import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuarios')
class Usuarios {
  @PrimaryGeneratedColumn()
  idusuarios: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;
}

export default Usuarios;
