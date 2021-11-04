import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Type } from "@angular/core";
import { plainToClass } from "class-transformer";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class BaseWebService {
  constructor(private http: HttpClient) {}

  getRequest<T>(url: string, classType?: Type<T>): Observable<T> {
    const options = this.addOptionsForRequest();
    return this.http.get<T>(url, options).pipe(
      map((res) => {
        return classType ? plainToClass(classType, res as T) : (res as T);
      })
    );
  }

  postRequest<T, K>(
    url: string,
    data?: K,
    headers?: object,
    classType?: Type<T>
  ): Observable<T> {
    const options = this.addOptionsForRequest(headers);
    return this.http.post<T>(url, data, options).pipe(
      map((res) => {
        return classType ? plainToClass(classType, res as T) : res;
      })
    );
  }

  deleteRequest<T>(
    url: string,
    bodyParams?: unknown,
    classType?: Type<T>
  ): Observable<T> {
    // need to add body params to DELETE request because backend is not completely in RESTful standard
    const options = bodyParams
      ? this.addOptionsForRequest({}, "json", bodyParams)
      : this.addOptionsForRequest();
    return this.http.delete<T>(url, options).pipe(
      map((res) => {
        return classType ? plainToClass(classType, res as T) : res;
      })
    );
  }

  putRequest<T, K>(url: string, data: K, classType?: Type<T>): Observable<T> {
    const options = this.addOptionsForRequest();
    return this.http.put<T>(url, data, options).pipe(
      map((res) => {
        return classType ? plainToClass(classType, res as T) : res;
      })
    );
  }

  constructUrlWithParams(
    url: string,
    params: { [key: string]: string | number}
  ): string {
    let paramString = "?";
    for (const [key, value] of Object.entries(params)) {
      paramString += paramString.length > 1 ? "&" : "";
      paramString += key + "=" + value;
    }
    return url + paramString;
  }

  private addOptionsForRequest(
    additionalHeaders?: object,
    responseType: string = "json",
    body?: unknown
  ): object {
    // Create headers
    const headers: HttpHeaders = new HttpHeaders({
      Accept: "application/json",
      ...additionalHeaders,
    });
    const options = {
      headers,
      responseType,
      reportProgress: false,
      observe: "body",
      withCredentials: false,
      body,
    };

    options.withCredentials = true;

    return options;
  }
}
