import { Request } from "express";
import Page from "../interfaces/Page";

interface PagingParams {
    page?: number;
    pageLimit?: number;
}

export function getPagination(request: Request): Page {
    const { paging }: { paging?: PagingParams} = request.body;

    const pageNumber = paging?.page ?? 0;
    const limit = paging?.pageLimit ?? 10;
    const offset = pageNumber > 0 ? (pageNumber - 1 ) * limit : 0;

    return { offset, limit };
}
