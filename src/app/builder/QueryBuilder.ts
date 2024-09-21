import { FilterQuery, Query } from "mongoose";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public totalQuery: number = 0;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    // this.totalQuery = 0;
    this.query = query;
  }
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.search;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (element) =>
            ({
              [element]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
   
    return this;
  }
  filter() {
    const queryObj = { ...this.query };
    const excludeFelid = ["search", "sort", "page", "limit", "fields"];
    excludeFelid.forEach((element) => delete queryObj[element]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }
  sort() {
    const sort = this.query?.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  async totalPages() {
    const limit = Number(this?.query?.limit) || 5;
    const total = await this.modelQuery.model.countDocuments(
      this.modelQuery.getQuery()
    );
    this.totalQuery = Math.ceil(total / limit);
    return this;
  }
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 5;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
  fields() {
    const fields =
      (this.query.fields as string)?.split(",").join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}
