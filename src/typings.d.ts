declare module '*.css'
declare module '*.less'

declare module '*.png'
declare module '*.svg'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

declare module '*.mp4'
declare module '*.webm'
declare module '*.ogg'
declare module '*.mp3'
declare module '*.wav'
declare module '*.flac'
declare module '*.aac'

declare namespace React {
}

declare module 'react' {
  export = React
}

declare type FC<T> = React.FC<T>
declare type ReactNode = React.ReactNode
declare type CSSProperties = React.CSSProperties
declare const useState: typeof React.useState
declare const useRef: typeof React.useRef
declare const useReducer: typeof React.useReducer
declare const useMemo: typeof React.useMemo
declare const useEffect: typeof React.useEffect
declare const useContext: typeof React.useContext
declare const useCallback: typeof React.useCallback

declare const initStore: any
declare const BASE_API_PATH: string
declare const TARGET_ENV: string

// getState
declare interface GetState<T, U> {
  (key?: T): U
  (key: string): any
}

// ajax-response
declare interface AjaxResponse<T = any> {
  status: number
  message: string
  data: T
}

// ajax返回获取的正常数据，否则返回false
declare type AjaxReturn<T> = Promise<false | T>
