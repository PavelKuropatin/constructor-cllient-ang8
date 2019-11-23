export default {
  PARTIALS: {
    ACTION: 'action'
  },
  CUSTOM_PARTIALS: {
    ACTION: 'custom_action'
  },
  ANCHOR: {
    LEFT_MIDDLE: 'LeftMiddle',
    RIGHT_MIDDLE: 'RightMiddle',
    TOP_CENTER: 'TopCenter',
    BOTTOM_CENTER: 'BottomCenter'
  },
  TYPE_ACTION: {
    MAIN: {
      color: '#CC1A55',
      abbr: 'red'
    },
    SOME_ONE: {
      color: '#292ccc',
      abbr: 'dark blue'
    },
    SOME_TWO: {
      color: '#2bbfcc',
      abbr: 'blue'
    }
  },
  ENDPOINT_STYLE: {
    ACTION: {
      RIGHT: 'endpoint-style-right',
      LEFT: 'endpoint-style-left',
      TOP: 'endpoint-style-top',
      BOTTOM: 'endpoint-style-bottom'
    }
  },
  CONTAINER_TYPE: {
    INPUT: 'INPUT',
    OUTPUT: 'OUTPUT'
  },
  EVENT_CONSTANTS: {
    SUCCESS_DIAGRAM_DELETE: 'SUCCESS_DIAGRAM_DELETE'
  },
  SOCKET: {
    BROKER: '/app/socket',
    URL: '/socket',
    TOPIC: '/topic',
    CAR: 'car'
  },
  MODEL: {
    GENERATOR: 'Generator',
    SOCKET: 'Socket'
  },

  ENDPOINT_LAYOUTS: {
    border_left: {
      a: 'LeftMiddle',
      e: 'endpoint-style-left'
    },
    border_top: {
      a: 'TopCenter',
      e: 'endpoint-style-top'
    },
    border_right: {
      a: 'RightMiddle',
      e: 'endpoint-style-right'
    },
    border_bottom: {
      a: 'BottomCenter',
      e: 'endpoint-style-bottom'
    }
  }
};
