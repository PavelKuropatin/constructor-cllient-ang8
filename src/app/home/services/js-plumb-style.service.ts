import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsPlumbStyleService {

  private targetEndpointStyle1 = {
    endpoint: 'Rectangle',
    cssClass: 'endpoint-style-left',
    paintStyle: {
      fill: '#BCAAA4',
      width: 10,
      height: 100
    },
    maxConnections: -1,
    isTarget: true
  };

  private targetEndpointStyle2 = {
    endpoint: 'Rectangle',
    paintStyle: {
      fill: '#BCAAA4',
      width: 100,
      height: 10
    },
    maxConnections: -1,
    isTarget: true
  };

  private sourceEndpointStyle1 = {
    endpoint: 'Rectangle',
    paintStyle: {
      stroke: '#BCAAA4',
      fill: 'transparent',
      strokeWidth: 3,
      width: 10,
      height: 100
    },
    cssClass: 'endpoint-style-right',
    isSource: true,
    maxConnections: -1,
    connector: ['Flowchart', {stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true}],
    connectorStyle: {
      strokeWidth: 6,
      stroke: '#61B7CF'
    },
    connectorHoverStyle: {
      stroke: '#216477'
    }
  };

  private sourceEndpointStyle2 = {
    endpoint: 'Rectangle',
    paintStyle: {
      stroke: '#BCAAA4',
      fill: 'transparent',
      strokeWidth: 3,
      width: 100,
      height: 10
    },
    isSource: true,
    maxConnections: -1,
    connector: ['Flowchart', {stub: [30, 30], gap: 20, cornerRadius: 10, alwaysRespectStubs: true}],
    connectorStyle: {
      strokeWidth: 6,
      stroke: '#61B7CF'
    },
    connectorHoverStyle: {
      stroke: '#216477'
    }
  };

  constructor() {
  }

  getTargetEndpointStyle1 = () => this.targetEndpointStyle1;
  getTargetEndpointStyle2 = () => this.targetEndpointStyle2;

  getSourceEndpointStyle1 = () => this.sourceEndpointStyle1;
  getSourceEndpointStyle2 = () => this.sourceEndpointStyle2;
}
