import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandle } from './_model/file-handel.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandle> = new EventEmitter();
  @HostBinding("style.background") private background = "#eee";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";

    let fileHandle: FileHandle = {
      file: null,
      url: null
    };
    if (evt.dataTransfer) {
      const files = evt.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
        fileHandle = { file, url };
      }
    }
    this.files.emit(fileHandle);
  }
}
