import { Component, OnInit,ElementRef, AfterViewInit, Input } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import * as Proj from 'ol/proj';
import {defaults as defaultControls} from 'ol/control'
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
export const DEFAULT_HEIGHT = '500px'
export const DEFAULT_WIDTH = '500px'
import * as olProj from 'ol/proj';
@Component({
  selector: 'ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.css']
})
export class OlMapComponent implements OnInit,AfterViewInit {

  @Input() lat: number;
  @Input() lon: number;
  @Input() zoom: number;
  @Input() width: string | number = DEFAULT_WIDTH;
  @Input() height: string | number = DEFAULT_HEIGHT;

  map: Map;

  private mapEl: HTMLElement

  constructor(private elementRef: ElementRef) { }
  ngAfterViewInit(): void {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: Proj.fromLonLat([this.lon, this.lat]),
        zoom: this.zoom
      }),
      controls: defaultControls().extend([])
    });
  }

  ngOnInit(): void {
    this.mapEl = this.elementRef.nativeElement.querySelector('#map');
    this.setSize();
  }

  private setSize():void{

    if(this.mapEl){
      const styles = this.mapEl.style;
      styles.height = coerceCssPixelValue(this.height) || DEFAULT_HEIGHT
      styles.width = coerceCssPixelValue(this.width) || DEFAULT_WIDTH
    }

  }

  getCoord(event: any){
    var coordinate = this.map.getEventCoordinate(event);
    // console.log(ol.Proj.transform(event.coordinate, 'EPSG:3857', 'EPSG:4326'))
  }


}

const cssUnitPattern = /([A-Za-z%]+)$/;

function coerceCssPixelValue(value: any): string {
  if (value == null){
    return '';
  }

  return cssUnitPattern.test(value) ? value : `${value}px`
}
