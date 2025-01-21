// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as FileBatchesAPI from './file-batches';
import {
  FileBatchCancelParams,
  FileBatchCreateParams,
  FileBatchListFilesParams,
  FileBatchRetrieveParams,
  FileBatches,
  VectorStoreFileBatch,
} from './file-batches';
import * as FilesAPI from './files';
import {
  FileCreateParams,
  FileDeleteParams,
  FileListParams,
  FileRetrieveParams,
  Files,
  VectorStoreFile,
  VectorStoreFileDeleted,
  VectorStoreFilesPage,
} from './files';
import { APIPromise } from '../../../api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../../pagination';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';

export class VectorStores extends APIResource {
  files: FilesAPI.Files = new FilesAPI.Files(this._client);
  fileBatches: FileBatchesAPI.FileBatches = new FileBatchesAPI.FileBatches(this._client);

  /**
   * Create a vector store.
   */
  create(body: VectorStoreCreateParams, options?: RequestOptions): APIPromise<VectorStore> {
    return this._client.post('/vector_stores', {
      body,
      ...options,
      headers: buildHeaders([{ 'OpenAI-Beta': 'assistants=v2' }, options?.headers]),
    });
  }

  /**
   * Retrieves a vector store.
   */
  retrieve(vectorStoreID: string, options?: RequestOptions): APIPromise<VectorStore> {
    return this._client.get(`/vector_stores/${vectorStoreID}`, {
      ...options,
      headers: buildHeaders([{ 'OpenAI-Beta': 'assistants=v2' }, options?.headers]),
    });
  }

  /**
   * Modifies a vector store.
   */
  update(
    vectorStoreID: string,
    body: VectorStoreUpdateParams,
    options?: RequestOptions,
  ): APIPromise<VectorStore> {
    return this._client.post(`/vector_stores/${vectorStoreID}`, {
      body,
      ...options,
      headers: buildHeaders([{ 'OpenAI-Beta': 'assistants=v2' }, options?.headers]),
    });
  }

  /**
   * Returns a list of vector stores.
   */
  list(
    query: VectorStoreListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<VectorStoresPage, VectorStore> {
    return this._client.getAPIList('/vector_stores', CursorPage<VectorStore>, {
      query,
      ...options,
      headers: buildHeaders([{ 'OpenAI-Beta': 'assistants=v2' }, options?.headers]),
    });
  }

  /**
   * Delete a vector store.
   */
  delete(vectorStoreID: string, options?: RequestOptions): APIPromise<VectorStoreDeleted> {
    return this._client.delete(`/vector_stores/${vectorStoreID}`, {
      ...options,
      headers: buildHeaders([{ 'OpenAI-Beta': 'assistants=v2' }, options?.headers]),
    });
  }
}

export type VectorStoresPage = CursorPage<VectorStore>;

/**
 * The default strategy. This strategy currently uses a `max_chunk_size_tokens` of
 * `800` and `chunk_overlap_tokens` of `400`.
 */
export interface AutoFileChunkingStrategyParam {
  /**
   * Always `auto`.
   */
  type: 'auto';
}

/**
 * The strategy used to chunk the file.
 */
export type FileChunkingStrategy = StaticFileChunkingStrategyObject | OtherFileChunkingStrategyObject;

/**
 * The chunking strategy used to chunk the file(s). If not set, will use the `auto`
 * strategy. Only applicable if `file_ids` is non-empty.
 */
export type FileChunkingStrategyParam = AutoFileChunkingStrategyParam | StaticFileChunkingStrategyObjectParam;

/**
 * This is returned when the chunking strategy is unknown. Typically, this is
 * because the file was indexed before the `chunking_strategy` concept was
 * introduced in the API.
 */
export interface OtherFileChunkingStrategyObject {
  /**
   * Always `other`.
   */
  type: 'other';
}

export interface StaticFileChunkingStrategy {
  /**
   * The number of tokens that overlap between chunks. The default value is `400`.
   *
   * Note that the overlap must not exceed half of `max_chunk_size_tokens`.
   */
  chunk_overlap_tokens: number;

  /**
   * The maximum number of tokens in each chunk. The default value is `800`. The
   * minimum value is `100` and the maximum value is `4096`.
   */
  max_chunk_size_tokens: number;
}

export interface StaticFileChunkingStrategyObject {
  static: StaticFileChunkingStrategy;

  /**
   * Always `static`.
   */
  type: 'static';
}

export interface StaticFileChunkingStrategyObjectParam {
  static: StaticFileChunkingStrategy;

  /**
   * Always `static`.
   */
  type: 'static';
}

/**
 * A vector store is a collection of processed files can be used by the
 * `file_search` tool.
 */
export interface VectorStore {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) for when the vector store was created.
   */
  created_at: number;

  file_counts: VectorStore.FileCounts;

  /**
   * The Unix timestamp (in seconds) for when the vector store was last active.
   */
  last_active_at: number | null;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata: unknown | null;

  /**
   * The name of the vector store.
   */
  name: string;

  /**
   * The object type, which is always `vector_store`.
   */
  object: 'vector_store';

  /**
   * The status of the vector store, which can be either `expired`, `in_progress`, or
   * `completed`. A status of `completed` indicates that the vector store is ready
   * for use.
   */
  status: 'expired' | 'in_progress' | 'completed';

  /**
   * The total number of bytes used by the files in the vector store.
   */
  usage_bytes: number;

  /**
   * The expiration policy for a vector store.
   */
  expires_after?: VectorStore.ExpiresAfter;

  /**
   * The Unix timestamp (in seconds) for when the vector store will expire.
   */
  expires_at?: number | null;
}

export namespace VectorStore {
  export interface FileCounts {
    /**
     * The number of files that were cancelled.
     */
    cancelled: number;

    /**
     * The number of files that have been successfully processed.
     */
    completed: number;

    /**
     * The number of files that have failed to process.
     */
    failed: number;

    /**
     * The number of files that are currently being processed.
     */
    in_progress: number;

    /**
     * The total number of files.
     */
    total: number;
  }

  /**
   * The expiration policy for a vector store.
   */
  export interface ExpiresAfter {
    /**
     * Anchor timestamp after which the expiration policy applies. Supported anchors:
     * `last_active_at`.
     */
    anchor: 'last_active_at';

    /**
     * The number of days after the anchor time that the vector store will expire.
     */
    days: number;
  }
}

export interface VectorStoreDeleted {
  id: string;

  deleted: boolean;

  object: 'vector_store.deleted';
}

export interface VectorStoreCreateParams {
  /**
   * The chunking strategy used to chunk the file(s). If not set, will use the `auto`
   * strategy. Only applicable if `file_ids` is non-empty.
   */
  chunking_strategy?: FileChunkingStrategyParam;

  /**
   * The expiration policy for a vector store.
   */
  expires_after?: VectorStoreCreateParams.ExpiresAfter;

  /**
   * A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that
   * the vector store should use. Useful for tools like `file_search` that can access
   * files.
   */
  file_ids?: Array<string>;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata?: unknown | null;

  /**
   * The name of the vector store.
   */
  name?: string;
}

export namespace VectorStoreCreateParams {
  /**
   * The expiration policy for a vector store.
   */
  export interface ExpiresAfter {
    /**
     * Anchor timestamp after which the expiration policy applies. Supported anchors:
     * `last_active_at`.
     */
    anchor: 'last_active_at';

    /**
     * The number of days after the anchor time that the vector store will expire.
     */
    days: number;
  }
}

export interface VectorStoreUpdateParams {
  /**
   * The expiration policy for a vector store.
   */
  expires_after?: VectorStoreUpdateParams.ExpiresAfter | null;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata?: unknown | null;

  /**
   * The name of the vector store.
   */
  name?: string | null;
}

export namespace VectorStoreUpdateParams {
  /**
   * The expiration policy for a vector store.
   */
  export interface ExpiresAfter {
    /**
     * Anchor timestamp after which the expiration policy applies. Supported anchors:
     * `last_active_at`.
     */
    anchor: 'last_active_at';

    /**
     * The number of days after the anchor time that the vector store will expire.
     */
    days: number;
  }
}

export interface VectorStoreListParams extends CursorPageParams {
  /**
   * A cursor for use in pagination. `before` is an object ID that defines your place
   * in the list. For instance, if you make a list request and receive 100 objects,
   * starting with obj_foo, your subsequent call can include before=obj_foo in order
   * to fetch the previous page of the list.
   */
  before?: string;

  /**
   * Sort order by the `created_at` timestamp of the objects. `asc` for ascending
   * order and `desc` for descending order.
   */
  order?: 'asc' | 'desc';
}

VectorStores.Files = Files;
VectorStores.FileBatches = FileBatches;

export declare namespace VectorStores {
  export {
    type AutoFileChunkingStrategyParam as AutoFileChunkingStrategyParam,
    type FileChunkingStrategy as FileChunkingStrategy,
    type FileChunkingStrategyParam as FileChunkingStrategyParam,
    type OtherFileChunkingStrategyObject as OtherFileChunkingStrategyObject,
    type StaticFileChunkingStrategy as StaticFileChunkingStrategy,
    type StaticFileChunkingStrategyObject as StaticFileChunkingStrategyObject,
    type StaticFileChunkingStrategyObjectParam as StaticFileChunkingStrategyObjectParam,
    type VectorStore as VectorStore,
    type VectorStoreDeleted as VectorStoreDeleted,
    type VectorStoresPage as VectorStoresPage,
    type VectorStoreCreateParams as VectorStoreCreateParams,
    type VectorStoreUpdateParams as VectorStoreUpdateParams,
    type VectorStoreListParams as VectorStoreListParams,
  };

  export {
    Files as Files,
    type VectorStoreFile as VectorStoreFile,
    type VectorStoreFileDeleted as VectorStoreFileDeleted,
    type VectorStoreFilesPage as VectorStoreFilesPage,
    type FileCreateParams as FileCreateParams,
    type FileRetrieveParams as FileRetrieveParams,
    type FileListParams as FileListParams,
    type FileDeleteParams as FileDeleteParams,
  };

  export {
    FileBatches as FileBatches,
    type VectorStoreFileBatch as VectorStoreFileBatch,
    type FileBatchCreateParams as FileBatchCreateParams,
    type FileBatchRetrieveParams as FileBatchRetrieveParams,
    type FileBatchCancelParams as FileBatchCancelParams,
    type FileBatchListFilesParams as FileBatchListFilesParams,
  };
}
