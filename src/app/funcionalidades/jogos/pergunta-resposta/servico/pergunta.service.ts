import { Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  docData,
  collection,
  collectionData,
  addDoc
} from '@angular/fire/firestore';
import { Pergunta, RankingCategoria } from '../modelo/pergunta.model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {
  constructor(private firestore: Firestore) {}

  /**
   * Retorna uma lista de categorias disponíveis.
   */
  obterCategorias(): string[] {
    return ['História', 'Ciência', 'Tecnologia'];
  }

  /**
   * Carrega as perguntas da categoria informada a partir do Firestore.
   * Se não encontrar perguntas na base, retorna um conjunto de perguntas fixas.
   *
   * @param categoria Categoria a ser buscada
   * @returns Lista observável de perguntas
   */
 carregarPerguntasPorCategoria(categoria: string): Observable<Pergunta[]> {
      const colRef = collection(this.firestore, `perguntas/${categoria}/perguntas`);
      console.log(`[Firebase] Buscando perguntas da categoria: ${categoria}`);

      return collectionData(colRef) as Observable<Pergunta[]>;
    }

  /**
   * Adiciona uma nova pergunta à subcoleção "perguntas" da categoria informada.
   *
   * @param categoria Categoria onde a pergunta será adicionada
   * @param pergunta Objeto do tipo Pergunta a ser salvo
   * @returns Promise<void> indicando sucesso ou erro
   */
  adicionarPergunta(categoria: string, pergunta: Pergunta): Promise<void> {
    const colRef = collection(this.firestore, `perguntas/${categoria}/perguntas`);
    console.log(`[Firebase] Adicionando pergunta na categoria ${categoria}:`, pergunta);

    return addDoc(colRef, pergunta)
      .then(() => {
        console.log('[Firebase] Pergunta adicionada com sucesso.');
      })
      .catch((err) => {
        console.error('[Erro Firebase] Falha ao adicionar pergunta:', err);
        throw err;
      });
  }

  /**
   * Retorna o ranking por categoria como Observable.
   */
  obterRankingsPorCategoria(): Observable<RankingCategoria[]> {
    const ref = collection(this.firestore, 'rankings');
    return collectionData(ref, { idField: 'categoria' }) as Observable<RankingCategoria[]>;
  }

  /**
   * Retorna o ranking geral como Observable.
   */
  obterRankingGeral(): Observable<RankingCategoria> {
    const ref = doc(this.firestore, 'rankings_geral/geral');
    return docData(ref) as Observable<RankingCategoria>;
  }

  /**
   * Retorna uma lista fixa de perguntas para cada categoria, usada como fallback.
   */
  private getPerguntasFixas(categoria: string): Pergunta[] {
    console.log(`[Fallback] Gerando perguntas fixas para: ${categoria}`);

    switch (categoria) {
      case 'História':
        return [
          {
            enunciado: 'Quem foi o primeiro imperador do Brasil?',
            respostas: [
              { texto: 'Dom Pedro I', correta: true },
              { texto: 'Tiradentes', correta: false },
              { texto: 'Dom João VI', correta: false },
              { texto: 'Getúlio Vargas', correta: false }
            ],
            respostaCorretaIndex: 0
          },
          {
            enunciado: 'Em que ano ocorreu a Proclamação da República?',
            respostas: [
              { texto: '1889', correta: true },
              { texto: '1822', correta: false },
              { texto: '1500', correta: false },
              { texto: '1922', correta: false }
            ],
            respostaCorretaIndex: 0
          },
          {
            enunciado: 'Quem descobriu o Brasil?',
            respostas: [
              { texto: 'Pedro Álvares Cabral', correta: true },
              { texto: 'Cristóvão Colombo', correta: false },
              { texto: 'Vasco da Gama', correta: false },
              { texto: 'Fernão Dias', correta: false }
            ],
            respostaCorretaIndex: 0
          }
        ];

      case 'Ciência':
        return [
          {
            enunciado: 'Qual é o planeta mais próximo do Sol?',
            respostas: [
              { texto: 'Mercúrio', correta: true },
              { texto: 'Vênus', correta: false },
              { texto: 'Terra', correta: false },
              { texto: 'Marte', correta: false }
            ],
            respostaCorretaIndex: 0
          },
          {
            enunciado: 'O que é H2O?',
            respostas: [
              { texto: 'Água', correta: true },
              { texto: 'Oxigênio', correta: false },
              { texto: 'Hidrogênio', correta: false },
              { texto: 'Ácido', correta: false }
            ],
            respostaCorretaIndex: 0
          },
          {
            enunciado: 'Qual é a unidade de medida da corrente elétrica?',
            respostas: [
              { texto: 'Ampère', correta: true },
              { texto: 'Volts', correta: false },
              { texto: 'Ohm', correta: false },
              { texto: 'Watts', correta: false }
            ],
            respostaCorretaIndex: 0
          }
        ];

      case 'Tecnologia':
        return [
          {
            enunciado: 'O que significa HTML?',
            respostas: [
              { texto: 'HyperText Markup Language', correta: true },
              { texto: 'HighText Machine Language', correta: false },
              { texto: 'Hyper Tool Multi Language', correta: false },
              { texto: 'Home Tool Markup Language', correta: false }
            ],
            respostaCorretaIndex: 0
          },
          {
            enunciado: 'Qual empresa criou o Android?',
            respostas: [
              { texto: 'Google', correta: true },
              { texto: 'Apple', correta: false },
              { texto: 'Microsoft', correta: false },
              { texto: 'IBM', correta: false }
            ],
            respostaCorretaIndex: 0
          },
          {
            enunciado: 'O que é um "bug" na programação?',
            respostas: [
              { texto: 'Erro no código', correta: true },
              { texto: 'Melhoria', correta: false },
              { texto: 'Atualização', correta: false },
              { texto: 'Novo recurso', correta: false }
            ],
            respostaCorretaIndex: 0
          }
        ];

      default:
        return [];
    }
  }
}
