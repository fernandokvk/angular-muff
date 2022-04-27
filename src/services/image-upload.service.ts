import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  baseApiUrl = "https://localhost:3000/"
  constructor(private httpClient:HttpClient) { }

  upload(file: File | undefined):Observable<any> {

    const formData = new FormData();


    // @ts-ignore
    formData.append("file", file, file.name);

    return this.httpClient.post(this.baseApiUrl, formData)
  }
}
