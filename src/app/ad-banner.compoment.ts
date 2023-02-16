import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem } from './ad.item';
impport { AdComponent } from './ad.component';

@Component({
  selector: 'app-ad-banner',
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <ng-template adHost></ng-template>
    </div>
  `
})

export class AdbannerComponent implements OnInit, OnDestroy {
  @Input () ads: AdItem[] = [];

  currentAdIndex = -1;

  @ViewChild(AdDirective, {static: true}) 
  adHost!: AdDirective;
  interval: number|undefined;

  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const aditem = this.ads[this.currentAdIndex];

    const viewContainerRef = this.adHost.viewContainerRef;
    ViewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<AdComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent
    }, 2000)
  }
}