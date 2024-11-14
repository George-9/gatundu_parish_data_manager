/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(drawer)` | `/(drawer)/` | `/(drawer)/registry` | `/(drawer)/uploads` | `/_sitemap` | `/memberview` | `/registry` | `/searchresultview` | `/uploads`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
