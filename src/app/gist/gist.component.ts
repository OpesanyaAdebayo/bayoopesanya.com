import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-gist',
  templateUrl: './gist.component.html',
  styleUrls: ['./gist.component.css']
})
export class GistComponent implements AfterViewInit {

  @ViewChild('iframe', { static: true }) iframe: ElementRef;
  @Input() gistId;
  @Input() file: string;

  ngAfterViewInit() {
    const fileName = (this.file) ? this.file : '';
    this.iframe.nativeElement.id = 'gist-' + this.gistId;
    const doc = this.iframe.nativeElement.contentDocument || this.iframe.nativeElement.contentElement.contentWindow;
    const content = `
        <html>
        <head>
          <base target="_parent">
        </head>
        <body onload="parent.document.getElementById('${this.iframe.nativeElement.id}')">
        <script type="text/javascript" src="https://gist.github.com/${this.gistId}.js?file=${fileName}"></script>
        </body>
      </html>
    `;
    doc.open();
    doc.write(content);
    doc.close();
  }
}
