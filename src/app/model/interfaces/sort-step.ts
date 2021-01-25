export const DEFAULT_IDXS:SortStep = {idx1:-1, idx2:-1, replaceIdx:-1};

export interface SortStep {
    idx1?:number;
    idx2?:number;
    replaceIdx?:number;
    pivotIdx?:number;
};
