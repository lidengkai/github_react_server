// store
export interface StateInterface {
  testText: string
}

// view
export namespace View {
  export interface Props extends StateInterface {
  }
}

// ajax
export namespace Ajax {
}
