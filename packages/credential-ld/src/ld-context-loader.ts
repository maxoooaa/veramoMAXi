/**
 * The LdContextLoader is initialized with a List of Map<string, ContextDoc>
 * that it unifies into a single Map to provide to the documentLoader within
 * the w3c credential module.
 */
import { OrPromise, RecordLike } from '@veramo/utils'
import { ContextDoc } from './types'

export class LdContextLoader {
  private contexts: Record<string, OrPromise<ContextDoc>>

  constructor(options: { contextsPaths: RecordLike<OrPromise<ContextDoc>>[] }) {
    this.contexts = {}
    // generate-plugin-schema is failing unless we use the cast to `any[]`
    Array.from(options.contextsPaths as any[], (mapItem) => {
      for (const [key, value] of mapItem) {
        this.contexts[key] = value
      }
    })
  }

  has(url: string): boolean {
    return this.contexts[url] !== null && typeof this.contexts[url] !== 'undefined'
  }

  async get(url: string): Promise<ContextDoc> {
    return this.contexts[url]
  }
}