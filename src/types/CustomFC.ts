import { FC } from "react";

export interface BasePropsProperties {
  className?: string;
}

export interface CustomFC<P = {}> extends FC<P & BasePropsProperties> {}
