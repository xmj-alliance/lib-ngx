# Img0Directive
When a given image is for some reason unable to load, a fallback image replaces that one.

## Features
Replace the image with a fallback one if it loads fail.

## Usage Example

``` typescript
// app.module.ts
import { Img0Module } from '@xmj-alliance/lib-ngx';
// ...

@NgModule({
  // ...
  imports: [
    Img0Module
  ],
})

```

``` typescript
// app.component.ts
dynamicImg = "possibly_404_Img"; // Usually dynamic based on incoming data
fallbackImg = `statics/images/avatar0.png`; // A fallback picture
```

``` html
<!-- app.component.html -->
<img [src]="dynamicImg" [src0]="fallbackImg" alt="img0 example">
```