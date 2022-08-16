import { Todo } from "../entity/todo.entity";
// import { OmitType } from '@nestjs/swagger';

export class ReturnSuccessSwagger extends Todo {// OmitType(Todo, ['deletedAt']) {
     // Apenas para exemplificar eu tô dizendo que vou omitir a variável 'deletedAt' no retorno dessa classe,
     // Eu passo OmitType primeiro a entidade que eu vou retornar e depois um array contendo os campos que quero omitir
}