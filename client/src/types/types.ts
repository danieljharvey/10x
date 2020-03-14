export interface ConversionFunction {
  from: VersionedType;
  to: VersionedType;
  functionBody: string;
}

export interface VersionedType {
  name: string;
  typeInfo: string;
}
