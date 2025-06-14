import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PerguntaService {
  private readonly colecao = 'perguntas';

  constructor(private firestore: Firestore) {}

  /**
   * Salva uma nova pergunta no Firestore.
   * @param pergunta Pergunta a ser adicionada.
   */
  adicionarPergunta(pergunta: Pergunta): Promise<void> {
    const perguntasRef = collection(this.firestore, this.colecao);
    return addDoc(perguntasRef, pergunta).then(() => {});
  }

  /**
   * Retorna um observable com todas as perguntas da coleção.
   */
  listarPerguntas(): Observable<Pergunta[]> {
    const perguntasRef = collection(this.firestore, this.colecao);
    return collectionData(perguntasRef, { idField: 'id' }) as Observable<Pergunta[]>;
  }
}
