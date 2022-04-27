import { Component, OnInit } from '@angular/core';
import {ImageUploadService} from "../../services/image-upload.service";

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  shortLink: string = "";
  loading: boolean = false;
  file: File | undefined;

  constructor(private imageUploadService: ImageUploadService) { }

  ngOnInit(): void {
  }

  onChange(event: { target: { files: File[]; }; }) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.imageUploadService.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable
        }
      }
    );
  }
}
