import { Injectable } from '@angular/core';
import { collection, collectionData, doc, Firestore, addDoc, query, where } from '@angular/fire/firestore';
import { Pergunta } from '../modelo/pergunta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {
  private readonly colecao = 'perguntas';

  constructor(private firestore: Firestore) {}

  adicionarPergunta(pergunta: Pergunta): Promise<void> {
    const perguntasRef = collection(this.firestore, this.colecao);
    return addDoc(perguntasRef, pergunta).then(() => {});
  }

  listarPerguntasPorCategoria(categoria: string): Observable<Pergunta[]> {
    const perguntasRef = collection(this.firestore, this.colecao);
    const q = query(perguntasRef, where('categoria', '==', categoria));
    return collectionData(q, { idField: 'id' }) as Observable<Pergunta[]>;
  }

  listarTodas(): Observable<Pergunta[]> {
    const perguntasRef = collection(this.firestore, this.colecao);
    return collectionData(perguntasRef, { idField: 'id' }) as Observable<Pergunta[]>;
  }
}
