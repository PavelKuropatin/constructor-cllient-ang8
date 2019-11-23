import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelingJsPlumbStyleService {

  private targetEndpointStyle1 = {
    endpoint: 'Rectangle',
    paintStyle: {
      fill: '#BCAAA4',
      width: 10,
      height: 20
    },
    enabled: false,
    maxConnections: -1,
    isTarget: true
  };

  private targetEndpointStyle2 = {
    endpoint: 'Rectangle',
    paintStyle: {
      fill: '#BCAAA4',
      width: 20,
      height: 10
    },
    enabled: false,
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
      height: 20
    },
    isSource: true,
    enabled: false,
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
      width: 20,
      height: 10
    },
    isSource: true,
    enabled: false,
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
